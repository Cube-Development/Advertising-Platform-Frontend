// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// createTracker: wiring of the core modules (specs/004-tracker, contracts/tracker-api.md,
// data-model «Состояния трекера»). States: pending (config not yet known, ≤ 200 events in memory),
// on, paused (enabled=false until the next check), off (switched off, no config and no cache,
// destroyed).
import { listenClicks } from "./clicks";
import { loadConfig } from "./config";
import { debug } from "./debug";
import { resolveEnv } from "./env";
import {
  LIMITS,
  type App,
  type Env,
  type Event,
  type EventType,
  type Lang,
  type Role,
  type TrackerConfig,
} from "./generated/contract-lite";
import { clearUid, readUid, visitorId, writeUid } from "./identity";
import { createImpressions } from "./impressions";
import { createEngagement } from "./page";
import { createQueue, type QueueEntry } from "./queue";
import {
  markSourced,
  touchSession,
  visitFraction,
  type Visit,
} from "./session";
import { landingSource } from "./source";
import { createStore, safe, type Store } from "./storage";
import { clip, pathOnly } from "./url";
import { uuidv7 } from "./uuid";

export interface TrackerContext {
  lang: Lang;
  role: Role;
  tg: boolean;
}

export interface TrackerOptions {
  app: App;
  base?: string;
  release: string;
  envByHost?: Record<string, Env>;
  getContext: () => TrackerContext;
  getGuestId?: () => string | null;
  ignorePath?: (path: string) => boolean;
}

type Generated =
  | "page_view"
  | "page_leave"
  | "identify"
  | "logout"
  | "impressions";
type Auto = "eid" | "ts" | "p" | "rt" | "pv";
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

/** The 15 explicit event types without the fields the tracker sets (FR-029). */
export type TrackInput = DistributiveOmit<
  Exclude<Event, { t: Generated }>,
  Auto
>;

export interface PageViewInput {
  path: string;
  route: string;
}

export interface Tracker {
  page(view: PageViewInput): void;
  track(event: TrackInput): void;
  identify(userId: string): void;
  logout(): void;
  flush(): void;
  destroy(): void;
}

const PENDING_MAX = 200;
const REPEAT_MS = 500;
const MAX_EVENTS = 60;

export function createTracker(options: TrackerOptions): Tracker {
  const noop = () => undefined;
  const off: Tracker = {
    page: noop,
    track: noop,
    identify: noop,
    logout: noop,
    flush: noop,
    destroy: noop,
  };
  if (typeof window === "undefined" || typeof document === "undefined")
    return off;
  // A throwing host function (ignorePath) at start switches the tracker off (FR-026a).
  return safe(() => setup(options, createStore(), off), off);
}

function setup(options: TrackerOptions, store: Store, off: Tracker): Tracker {
  const env = resolveEnv(location.hostname, options.envByHost);
  const ignore = options.ignorePath;
  if (
    !env ||
    navigator.webdriver ||
    store.get("bx_optout") !== null ||
    (ignore && ignore(location.pathname))
  )
    return off;

  const base = options.base === undefined ? "/stats-api" : options.base;
  const vid = visitorId(store, location.protocol === "https:");
  let uid = readUid(store)?.uid;
  let config: TrackerConfig | null = null;
  let state: "pending" | "on" | "paused" | "off" = "pending";
  let pending: QueueEntry[] = [];
  let flushTimer: ReturnType<typeof setTimeout> | undefined;
  let checkTimer: ReturnType<typeof setTimeout> | undefined;
  let current = { p: pathOnly(location.pathname), rt: "", pv: "" };
  let landing = true;
  let ignored = false;
  let last = { p: "", at: -REPEAT_MS };
  const queue = createQueue({
    store,
    url: `${base}/collect`,
    maxBatch: () => (config ? config.maxBatch : MAX_EVENTS),
  });
  // Marks of an event (bx_uid, src of the visit) are written when it is accepted (Q18).
  const marks = new WeakMap<QueueEntry, () => void>();

  function send(beacon: boolean): void {
    clearTimeout(flushTimer);
    flushTimer = undefined;
    if (state === "on") queue.flush(beacon);
  }

  function accept(entry: QueueEntry, cfg: TrackerConfig): void {
    const type = entry.ev.t;
    const share = cfg.sample[type];
    if (
      cfg.disabled.indexOf(type) >= 0 ||
      (share !== undefined && !(visitFraction(entry.env.sid) < share))
    )
      return;
    debug(store, type, entry.ev);
    const mark = marks.get(entry);
    if (mark) mark();
    queue.push(entry);
    if (queue.size() >= Math.min(cfg.maxBatch, MAX_EVENTS)) send(false);
    else if (!flushTimer)
      flushTimer = setTimeout(() => send(false), cfg.flushMs);
  }

  /**
   * One event; `when` decides after the visit is known (identify once per visit), `after` runs when the
   * event is accepted. A throwing host function drops the event and never reaches the page (FR-026a).
   */
  function emit(
    t: EventType,
    fields: object,
    when?: (visit: Visit) => boolean,
    after?: (visit: Visit) => void,
  ): void {
    safe(() => record(t, fields, when, after), undefined);
  }

  function record(
    t: EventType,
    fields: object,
    when?: (visit: Visit) => boolean,
    after?: (visit: Visit) => void,
  ): void {
    if (state === "off" || state === "paused" || ignored) return;
    const now = Date.now();
    const { visit, isNew } = touchSession(store, now);
    if (when && !when(visit)) return;
    // A new visit: the events of the old one go first (FR-013).
    if (isNew && queue.size()) send(false);
    let source = {};
    let mark = after && (() => after(visit));
    if (t === "page_view" && !visit.src) {
      source = landing
        ? landingSource(location.href, document.referrer)
        : { ret: true };
      mark = () => markSourced(store, visit);
    }
    const ev = {
      t,
      eid: uuidv7(),
      ts: now,
      p: current.p,
      rt: current.rt,
      pv: current.pv,
      ...fields,
      ...source,
    } as Event;
    const context = options.getContext();
    const gid = safe(
      () => (options.getGuestId ? options.getGuestId() : null),
      null,
    );
    const entry: QueueEntry = {
      env: {
        vid,
        sid: visit.id,
        sst: visit.start,
        ...(uid ? { uid } : {}),
        ...(gid ? { gid } : {}),
        ctx: {
          app: options.app,
          env: env as Env,
          rel: clip(options.release, LIMITS.REL_MAX),
          lang: context.lang,
          role: context.role,
          tg: context.tg,
          vw: Math.min(65535, Math.max(0, Math.round(innerWidth))),
        },
      },
      ev,
    };
    if (mark) marks.set(entry, mark);
    if (config && state === "on") accept(entry, config);
    else if (pending.length < PENDING_MAX) pending.push(entry);
  }

  const engagement = createEngagement((num, num2) =>
    emit("page_leave", { num, num2 }),
  );
  const impressions = createImpressions((src, ids, ps) =>
    emit("impressions", { ids, ps, src }),
  );
  const unlisten = listenClicks(
    (id, pos, src) => emit("channel_open", { e: "channel", id, pos, src }),
    () => send(false),
  );

  function closePage(): void {
    engagement.leave();
    impressions.reset();
  }

  function onVisibility(): void {
    if (document.visibilityState === "hidden") {
      engagement.hide();
      impressions.hide();
      send(true);
    } else {
      engagement.show();
      impressions.show();
    }
  }

  /** pagehide without visibilitychange (old WebViews, bfcache) stops counting like a hidden tab (Q25). */
  function onPageHide(): void {
    engagement.hide();
    impressions.hide();
    send(true);
  }

  function stop(): void {
    state = "off";
    pending = [];
    clearTimeout(flushTimer);
    clearTimeout(checkTimer);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
    unlisten();
    engagement.stop();
    impressions.stop();
  }

  const configUrl = `${base}/config?app=${options.app}&env=${env}`;
  /** Re-check of the config: every ttlSec, but not more often than every 60 s (Q16). */
  const recheck = (ttlSec: number) => {
    checkTimer = setTimeout(check, Math.max(ttlSec, 60) * 1000);
  };
  function check(): void {
    void loadConfig(store, configUrl).then((loaded) => {
      if (state === "off") return;
      if (!loaded) {
        // No config and no cache: off until the next page load (FR-009).
        if (state === "pending") stop();
        else recheck(config ? config.ttlSec : 300);
        return;
      }
      config = loaded;
      debug(store, "config", loaded);
      const waiting = pending;
      pending = [];
      if (loaded.enabled) {
        state = "on";
        for (const entry of waiting) accept(entry, loaded);
      } else {
        state = "paused";
        queue.clear();
        clearTimeout(flushTimer);
        flushTimer = undefined;
      }
      recheck(loaded.ttlSec);
    });
  }

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);
  check();

  /** Public methods never throw into the page and do nothing once the tracker is off. */
  const guard =
    <A extends unknown[]>(fn: (...args: A) => void) =>
    (...args: A): void => {
      if (state !== "off") safe(() => fn(...args), undefined);
    };

  return {
    page: guard((view: PageViewInput) => {
      const p = pathOnly(view.path);
      const now = Date.now();
      // StrictMode calls effects twice: the same path within 500 ms is one view.
      if (p === last.p && now - last.at < REPEAT_MS) return;
      last = { p, at: now };
      closePage();
      ignored = !!ignore && ignore(p);
      current = {
        p,
        rt: clip(view.route, LIMITS.RT_MAX),
        pv: ignored ? "" : uuidv7(),
      };
      if (!ignored) {
        emit("page_view", {});
        engagement.start();
      }
      landing = false;
    }),
    track: guard((event: TrackInput) => emit(event.t, event)),
    identify: guard((userId: string) => {
      uid = userId;
      emit(
        "identify",
        {},
        (visit) => {
          const mark = readUid(store);
          if (mark && mark.uid === userId && mark.sid === visit.id)
            return false;
          // The same identify still waits for the config: no repeat (it is marked when accepted).
          return !pending.some(
            (entry) =>
              entry.ev.t === "identify" &&
              entry.env.uid === userId &&
              entry.env.sid === visit.id,
          );
        },
        (visit) => writeUid(store, { uid: userId, sid: visit.id }),
      );
    }),
    logout: guard(() => {
      emit("logout", {});
      uid = undefined;
      clearUid(store);
    }),
    flush: guard(() => send(false)),
    destroy: guard(() => {
      closePage();
      send(false);
      stop();
    }),
  };
}
