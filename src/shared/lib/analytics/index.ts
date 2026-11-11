import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";
import { createTracker, type Tracker, type TrackerContext } from "./core";

export { marks } from "./core";
export type { TrackInput, TrackerContext } from "./core";
export { normalizeError } from "./core/generated/contract-lite";
export { toRouteTemplate } from "./route-template";

/** Время сборки из vite.config.ts (define); в тестах define нет — пусто */
const RELEASE = typeof __BX_RELEASE__ === "string" ? __BX_RELEASE__ : "";

let context: TrackerContext = { lang: "ru", role: "guest", tg: false };
let tracker: Tracker | undefined;

/** Язык, роль и Telegram следующих событий — AnalyticsRouteTracker (спека 005 FR-003) */
export const setAnalyticsContext = (next: TrackerContext) => {
  context = next;
};

/**
 * Один трекер на вкладку. /admin/* не отслеживается (план 5.4); guest_id трекер
 * только читает, не создаёт (план 10.3)
 */
export const getAnalytics = (): Tracker => {
  if (!tracker) {
    tracker = createTracker({
      app: "marketplace",
      release: RELEASE,
      getContext: () => context,
      getGuestId: () => Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID) ?? null,
      ignorePath: (path) => path.startsWith("/admin"),
    });
  }
  return tracker;
};
