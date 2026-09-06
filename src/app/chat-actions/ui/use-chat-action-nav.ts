import { useChatStage } from "@shared/lib/chat-stage";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Window events the adras.ai plugin listens for. Dispatching these is the
 * supported way for the host page to drive the widget.
 */
const ADRAS_EVENTS = {
  ACTION_HIDE: "adras-action:hide",
  ACTION_SHOW: "adras-action:show",
  PLUGIN_CLOSE: "adras-plugin:close",
  PLUGIN_OPEN: "adras-plugin:open",
  PLUGIN_SEND: "adras-plugin:send",
} as const;

interface IGoOptions {
  state?: unknown;
  replace?: boolean;
  /** Keep the chat window itself open after navigating. */
  keepChatOpen?: boolean;
}

export interface IChatActionNav {
  /** Navigate the app underneath and close the panel. */
  go: (to: string, options?: IGoOptions) => void;
  /** Close this panel, leave the chat window open. */
  closePanel: () => void;
  /** Close the chat widget entirely. */
  closeChat: () => void;
  /** Push text into the chat as if the user had typed it. */
  send: (text: string) => void;
}

/**
 * The only way a chat action component is allowed to move the user.
 *
 * Route changes from a panel must be user-driven: a page component that calls
 * `navigate()` from a mount effect would silently rewrite the URL of the page
 * the user is actually looking at, which is exactly the bug this whole
 * rewrite exists to remove.
 *
 * `go` hides the popover *before* navigating so React unmounts panel content
 * while the router transition is in flight rather than after it.
 */
export const useChatActionNav = (): IChatActionNav => {
  const navigate = useNavigate();
  const stage = useChatStage();
  const actionName = stage?.actionName;

  const closePanel = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(ADRAS_EVENTS.ACTION_HIDE, {
        detail: { name: actionName },
      }),
    );
  }, [actionName]);

  const closeChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent(ADRAS_EVENTS.PLUGIN_CLOSE));
  }, []);

  const send = useCallback((text: string) => {
    window.dispatchEvent(
      new CustomEvent(ADRAS_EVENTS.PLUGIN_SEND, { detail: { text } }),
    );
  }, []);

  const go = useCallback<IChatActionNav["go"]>(
    (to, options) => {
      closePanel();
      if (!options?.keepChatOpen) closeChat();
      navigate(to, { state: options?.state, replace: options?.replace });
    },
    [closePanel, closeChat, navigate],
  );

  return { go, closePanel, closeChat, send };
};

/** Ask the plugin to open a given action. Used by the dev harness. */
export const showChatAction = (name: string) => {
  window.dispatchEvent(
    new CustomEvent(ADRAS_EVENTS.ACTION_SHOW, { detail: { name } }),
  );
};

/** Hide whichever action panel is currently open. */
export const hideChatAction = () => {
  window.dispatchEvent(new CustomEvent(ADRAS_EVENTS.ACTION_HIDE));
};
