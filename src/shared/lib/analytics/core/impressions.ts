// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Card impressions (FR-022): IntersectionObserver with threshold 0.5 over [data-bx-ch]; a card
// visible ≥ 600 ms while the tab is visible counts once per pv; MutationObserver picks up new cards;
// every 3 s one impressions event per list (≤ 100 cards each).
import { cardOf } from "./clicks";

export interface Impressions {
  /** Sends the pending impressions now (the 3 s tick). */
  flush(): void;
  /** Tab hidden or page unloading: sends what is pending, 600 ms timers start over (Q22). */
  hide(): void;
  /** Tab visible again: cards are observed anew, the visible ones count from zero. */
  show(): void;
  /** New pv: sends what is pending with the old pv, then counts from zero. */
  reset(): void;
  stop(): void;
}

const CARD = "[data-bx-ch]";
const VISIBLE_MS = 600;
const TICK_MS = 3000;
const MAX_IDS = 100;

export function createImpressions(
  emit: (src: string, ids: string[], ps: number[]) => void,
): Impressions {
  const Observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : IntersectionObserver;
  if (!Observer)
    return { flush() {}, hide() {}, show() {}, reset() {}, stop() {} };
  let seen: Record<string, boolean> = {};
  let pending: Record<string, { ids: string[]; ps: number[] }> = {};
  const timers = new Map<Element, ReturnType<typeof setTimeout>>();

  function record(element: Element): void {
    const card = cardOf(element);
    if (!card || seen[card.id] || document.visibilityState !== "visible")
      return;
    seen[card.id] = true;
    const group =
      pending[card.src] || (pending[card.src] = { ids: [], ps: [] });
    group.ids.push(card.id);
    group.ps.push(card.pos);
  }

  const observer = new Observer(
    (entries) => {
      for (const entry of entries) {
        const element = entry.target;
        clearTimeout(timers.get(element));
        timers.delete(element);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          timers.set(
            element,
            setTimeout(() => record(element), VISIBLE_MS),
          );
        }
      }
    },
    { threshold: 0.5 },
  );

  const observeAll = (root: Element | Document) =>
    root.querySelectorAll(CARD).forEach((card) => observer.observe(card));

  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const element = node as Element;
        if (element.matches(CARD)) observer.observe(element);
        observeAll(element);
      });
    }
  });

  function flush(): void {
    const groups = pending;
    pending = {};
    for (const src of Object.keys(groups)) {
      const { ids, ps } = groups[src] ?? { ids: [], ps: [] };
      for (let i = 0; i < ids.length; i += MAX_IDS)
        emit(src, ids.slice(i, i + MAX_IDS), ps.slice(i, i + MAX_IDS));
    }
  }

  function clearTimers(): void {
    timers.forEach((timer) => clearTimeout(timer));
    timers.clear();
  }

  mutations.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  observeAll(document);
  const tick = setInterval(flush, TICK_MS);

  function observeAgain(): void {
    observer.disconnect();
    observeAll(document);
  }

  return {
    flush,
    hide() {
      flush();
      clearTimers();
    },
    show: observeAgain,
    reset() {
      flush();
      seen = {};
      clearTimers();
      // Re-observing replays the current visibility of every card for the new pv.
      observeAgain();
    },
    stop() {
      clearInterval(tick);
      clearTimers();
      mutations.disconnect();
      observer.disconnect();
    },
  };
}
