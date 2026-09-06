import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ChatActionStage } from "./chat-action-stage";
import styles from "./chat-action-stage.module.scss";

interface ChatActionProps {
  /** Unique id the AI references to trigger this action (e.g. "cart"). */
  name: string;
  /** Short description of what this action shows — sent to the AI. */
  description: string;
  children: ReactNode;
}

/** Frames to keep polling for the plugin's final placement before giving up. */
const SIZING_POLL_FRAMES = 180;

/**
 * Wrapper around the adras.ai `<adras-action>` web component.
 *
 * The plugin keeps every `<adras-action>` `display: none` and only reveals it
 * (via the Popover API) when the AI triggers the action. We rely on that: the
 * content inside is mounted ONLY while the panel is open, so nothing here runs
 * mount-time side effects on initial page load — they run when the user
 * actually opens the action, and are torn down again on close.
 *
 * `content="off"` stops the plugin from serializing the inner markup and
 * sending it to the AI — only `name` + `description` are shared.
 *
 * The sizer keeps the plugin's INLINE height measurement deterministic; see the
 * comment on `.sizer` in chat-action-stage.module.scss.
 */
export const ChatAction: FC<ChatActionProps> = ({
  name,
  description,
  children,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Popover API dispatches `toggle` with newState "open" | "closed".
    const handleToggle = (event: Event) => {
      const newState = (event as Event & { newState?: string }).newState;
      if (newState === "open") {
        // Commit synchronously: the plugin measures and places the panel on the
        // animation frames right after showPopover(), and a batched update
        // could land after it has already latched the panel height.
        flushSync(() => setOpen(true));
      } else {
        setOpen(false);
      }
    };

    el.addEventListener("toggle", handleToggle);
    return () => el.removeEventListener("toggle", handleToggle);
  }, []);

  // The plugin writes an explicit pixel height onto the host once it has
  // finished measuring and placed the panel. That is the moment the sizer stops
  // being useful and would only leave the host scrollable into empty space.
  useEffect(() => {
    if (!open) {
      setPlaced(false);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let frames = 0;
    const check = () => {
      if (/\d+px$/.test(el.style.height)) {
        setPlaced(true);
        return;
      }
      if (frames++ > SIZING_POLL_FRAMES) return;
      frame = requestAnimationFrame(check);
    };
    frame = requestAnimationFrame(check);
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <adras-action ref={ref} name={name} description={description} content="off">
      <div
        aria-hidden
        className={styles.sizer}
        style={{ height: placed ? 0 : "100vh" }}
      />
      {open && <ChatActionStage actionName={name}>{children}</ChatActionStage>}
    </adras-action>
  );
};
