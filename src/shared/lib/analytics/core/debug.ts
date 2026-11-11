// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Debug output with localStorage.bx_debug = '1' (FR-024, plan 10.9): every accepted event and every
// received config go to the browser console. Off without the flag.
import type { Store } from "./storage";

export function debug(store: Store, label: string, value: unknown): void {
  // eslint-disable-next-line no-console -- FR-024: console output is the feature (plan 004 Complexity Tracking)
  if (store.get("bx_debug") === "1") console.info("[bx]", label, value);
}
