import { createContext, useContext } from "react";

/**
 * The adras.ai chat plugin renders an `<adras-action>` as a `position: fixed`
 * panel whose width it computes itself:
 *
 *   - SIDE   (viewport >= 640px and there is room beside the chat window):
 *            `min(chatWidth * 2, chat.left - 8)` -> roughly 450-900px
 *   - INLINE (mobile / tight desktop): `chat.width - 18` -> roughly 320-430px,
 *            with the height capped at 50% of the chat window.
 *
 * The viewport stays whatever it was, so `window.innerWidth`, `@media` queries
 * and `matchMedia` all keep reporting "desktop" while the content actually has
 * ~400px to live in. That mismatch is what breaks the layout inside a panel.
 *
 * This context carries the *measured* stage box so width-aware code can branch
 * on the space it really has. `ChatActionStage` is the only provider; the
 * default is `null`, so every consumer outside a chat panel behaves exactly as
 * it did before this context existed.
 */
export interface IChatStageValue {
  /** Measured inline size of the stage root, px. Always >= 1. */
  width: number;
  /** Measured block size of the stage root, px. */
  height: number;
  /** Name of the `<adras-action>` this stage belongs to. */
  actionName: string;
  /** Which of the plugin's two placements we are rendering in. */
  placement: "side" | "inline";
  /**
   * Element inside the panel's top-layer subtree to portal overlays into.
   * Anything portalled to `document.body` paints *behind* a popover.
   */
  portalContainer: HTMLElement | null;
}

/** Width below which the plugin can only have used its INLINE placement. */
export const CHAT_STAGE_SIDE_MIN_WIDTH = 450;

export const ChatStageContext = createContext<IChatStageValue | null>(null);

/** Measured chat panel box, or `null` when not rendered inside one. */
export const useChatStage = (): IChatStageValue | null =>
  useContext(ChatStageContext);

/** True only while rendered inside an open chat action panel. */
export const useIsInChatStage = (): boolean =>
  useContext(ChatStageContext) !== null;
