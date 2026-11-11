// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Tracker config (FR-009): a fresh bx_cfg of the same request URL (app, env — Q17) without a request,
// otherwise GET with a 15 s limit; a failure, a timeout or a reply of a wrong shape fall back to the
// last cache of this URL of any age.
import type { TrackerConfig } from "./generated/contract-lite";
import { readJson, writeJson, type Store } from "./storage";

export const CONFIG_TIMEOUT_MS = 15_000;

const CFG = "bx_cfg";

export interface ConfigCache {
  url: string;
  config: TrackerConfig;
  fetchedAt: number;
}

const positive = (value: unknown) => typeof value === "number" && value > 0;

/** Shape of plan 5.5: no zod in the tracker, so a hand check of the fields it uses. */
export function isTrackerConfig(value: unknown): value is TrackerConfig {
  const config = value as Partial<TrackerConfig> | null;
  return (
    typeof config === "object" &&
    config !== null &&
    typeof config.enabled === "boolean" &&
    positive(config.flushMs) &&
    positive(config.maxBatch) &&
    typeof config.ttlSec === "number" &&
    config.ttlSec >= 0 &&
    typeof config.sample === "object" &&
    config.sample !== null &&
    Array.isArray(config.disabled)
  );
}

/** Fresh cache, else GET `url`; failure, timeout or a wrong shape → last cache; none → null. */
export function loadConfig(
  store: Store,
  url: string,
): Promise<TrackerConfig | null> {
  const cached = readJson<ConfigCache>(store, CFG);
  const last =
    cached &&
    cached.url === url &&
    isTrackerConfig(cached.config) &&
    typeof cached.fetchedAt === "number"
      ? cached
      : null;
  // A cache from the future (clock went back) is stale (Q17); ttlSec 0 is never fresh (Q16).
  const age = last ? Date.now() - last.fetchedAt : -1;
  if (last && age >= 0 && age < last.config.ttlSec * 1000)
    return Promise.resolve(last.config);
  const fallback = last ? last.config : null;
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), CONFIG_TIMEOUT_MS);
    const done = (config: TrackerConfig | null) => {
      clearTimeout(timer);
      resolve(config);
    };
    Promise.resolve()
      .then(() => fetch(url, { credentials: "same-origin" }))
      .then((response) => response.json() as Promise<unknown>)
      .then((body) => {
        if (!isTrackerConfig(body)) return done(fallback);
        writeJson(store, CFG, { url, config: body, fetchedAt: Date.now() });
        done(body);
      })
      .catch(() => done(fallback));
  });
}
