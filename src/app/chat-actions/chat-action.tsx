import { SuspenseLoader } from "@shared/ui";
import { FC, ReactNode, Suspense, useEffect, useRef, useState } from "react";

interface ChatActionProps {
  /** Unique id the AI references to trigger this action (e.g. "cart"). */
  name: string;
  /** Short description of what this action shows — sent to the AI. */
  description: string;
  children: ReactNode;
}

/**
 * Wrapper around the aidirekt `<chat-action>` web component.
 *
 * The plugin keeps every `<chat-action>` `display:none` and only reveals it
 * (via the Popover API) when the AI triggers the action. We rely on that: the
 * heavy page-flow inside is mounted ONLY while the popover is open. That way
 * none of these flows run their mount-time side effects (redirects, API
 * requests) on initial page load — they run only when the user actually opens
 * the action, and are torn down again on close.
 *
 * `content="off"` stops the plugin from serializing the inner markup and
 * sending it to the AI — only `name` + `description` are shared.
 */
export const ChatAction: FC<ChatActionProps> = ({
  name,
  description,
  children,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Popover API dispatches `toggle` with newState "open" | "closed".
    const handleToggle = (event: Event) => {
      const newState = (event as Event & { newState?: string }).newState;
      setOpen(newState === "open");
    };

    el.addEventListener("toggle", handleToggle);
    return () => el.removeEventListener("toggle", handleToggle);
  }, []);

  return (
    <chat-action ref={ref} name={name} description={description} content="off">
      {open && <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>}
    </chat-action>
  );
};
