// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Queue, batches and the bx_q reserve (FR-012, FR-015). A batch holds events of one envelope, at most
// min(maxBatch, 60), body ≤ 64 KB; failed batches wait in bx_q (≤ 200 entries, ≤ 24 h) and go first
// on the next flush with the same eid.
import {
  SCHEMA_VERSION,
  type Ctx,
  type Event,
} from "./generated/contract-lite";
import { readJson, writeJson, type Store } from "./storage";
import { sendBody } from "./transport";

export const MAX_BODY_BYTES = 65_536;
export const RESERVE_MAX = 200;
export const RESERVE_TTL_MS = 86_400_000;

const RESERVE = "bx_q";
const MAX_EVENTS = 60;

/** Batch envelope at the moment of the event. */
export interface Envelope {
  vid: string;
  sid: string;
  sst: number;
  uid?: string;
  gid?: string;
  ctx: Ctx;
}

export interface QueueEntry {
  env: Envelope;
  ev: Event;
}

export interface Queue {
  push(entry: QueueEntry): void;
  size(): number;
  /** Sends the reserve and the queue; `beacon` — tab hidden or page unloading. */
  flush(beacon: boolean): void;
  /** Drops the queued events (config enabled=false, FR-009); the reserve stays. */
  clear(): void;
}

export interface QueueOptions {
  store: Store;
  /** `{base}/collect`. */
  url: string;
  /** Current `maxBatch` of the config. */
  maxBatch: () => number;
}

const bytes = (text: string) => new TextEncoder().encode(text).length;

export function createQueue({ store, url, maxBatch }: QueueOptions): Queue {
  let items: QueueEntry[] = [];

  const fresh = (entries: unknown, now: number): QueueEntry[] =>
    Array.isArray(entries)
      ? (entries as QueueEntry[]).filter(
          (entry) => entry && entry.ev && now - entry.ev.ts <= RESERVE_TTL_MS,
        )
      : [];

  function toReserve(entries: QueueEntry[]): void {
    const now = Date.now();
    writeJson(
      store,
      RESERVE,
      fresh(readJson(store, RESERVE), now).concat(entries).slice(-RESERVE_MAX),
    );
  }

  function send(entries: QueueEntry[], beacon: boolean): void {
    const env = entries[0]?.env;
    if (!env) return;
    const body = JSON.stringify({
      v: SCHEMA_VERSION,
      sent: Date.now(),
      vid: env.vid,
      sid: env.sid,
      sst: env.sst,
      uid: env.uid,
      gid: env.gid,
      ctx: env.ctx,
      events: entries.map((entry) => entry.ev),
    });
    if (bytes(body) > MAX_BODY_BYTES) {
      // Halves until a body fits; a single event over the limit is dropped.
      const half = Math.ceil(entries.length / 2);
      if (entries.length > 1) {
        send(entries.slice(0, half), beacon);
        send(entries.slice(half), beacon);
      }
      return;
    }
    void sendBody(url, body, beacon).then((done) => {
      if (!done) toReserve(entries);
    });
  }

  return {
    push(entry) {
      items.push(entry);
    },
    size: () => items.length,
    clear() {
      items = [];
    },
    flush(beacon) {
      const reserved = fresh(readJson(store, RESERVE), Date.now());
      store.del(RESERVE);
      const all = reserved.concat(items);
      items = [];
      const groups: Record<string, QueueEntry[]> = {};
      const keys: string[] = [];
      for (const entry of all) {
        const key = JSON.stringify(entry.env);
        let group = groups[key];
        if (!group) {
          group = groups[key] = [];
          keys.push(key);
        }
        group.push(entry);
      }
      const max = Math.min(maxBatch(), MAX_EVENTS);
      for (const key of keys) {
        const group = groups[key] ?? [];
        for (let i = 0; i < group.length; i += max)
          send(group.slice(i, i + max), beacon);
      }
    },
  };
}
