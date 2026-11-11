// Сгенерировано из blogix-analytics@bb495bc, не редактировать
// Delegated clicks (FR-020, FR-021): a link inside a card [data-bx-ch] (or a card inside a link) →
// channel_open; a link to another host → the queue goes at once. Capture phase: the page's own
// handlers cannot hide the click. click and external_click events are stage 11 (Q1). A card id longer
// than 64 makes the event invalid in the contract, so the card is ignored; a list name is clipped (Q21).
import { LIMITS } from "./generated/contract-lite";
import { clip } from "./url";

const isPosition = (pos: number) =>
  Number.isInteger(pos) && pos >= 1 && pos <= 10_000;

export interface Card {
  id: string;
  pos: number;
  src: string;
}

/** Card and list attributes shared with impressions: id, position, src of the nearest list. */
export function cardOf(element: Element): Card | null {
  const id = element.getAttribute("data-bx-ch");
  const pos = Number(element.getAttribute("data-bx-pos"));
  const list = element.closest("[data-bx-list]");
  return id && id.length <= LIMITS.ID_MAX && isPosition(pos)
    ? {
        id,
        pos,
        src: clip(
          (list && list.getAttribute("data-bx-list")) || "",
          LIMITS.SRC_MAX,
        ),
      }
    : null;
}

/** Subscribes to click and auxclick on document; returns the unsubscribe function. */
export function listenClicks(
  onOpen: (id: string, pos: number, src: string) => void,
  onExternal: () => void,
): () => void {
  function onClick(event: Event): void {
    if (event.type === "auxclick" && (event as MouseEvent).button !== 1) return;
    const target = event.target as Element | null;
    const link =
      target && target.closest
        ? target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (!link || !target) return;
    // The link inside a card, or a card inside the link (the click may miss the card itself).
    const element =
      target.closest("[data-bx-ch]") || link.querySelector("[data-bx-ch]");
    const card = element && cardOf(element);
    if (card) onOpen(card.id, card.pos, card.src);
    if (/^https?:$/.test(link.protocol) && link.host !== location.host)
      onExternal();
  }
  document.addEventListener("click", onClick, true);
  document.addEventListener("auxclick", onClick, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("auxclick", onClick, true);
  };
}
