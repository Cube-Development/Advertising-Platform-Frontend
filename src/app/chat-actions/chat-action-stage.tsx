import * as Sentry from "@sentry/react";
import {
  CHAT_STAGE_SIDE_MIN_WIDTH,
  ChatStageContext,
  IChatStageValue,
} from "@shared/lib/chat-stage";
import {
  FC,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./chat-action-stage.module.scss";
import { ActionError, ActionSkeleton } from "./ui/action-states";

interface ChatActionStageProps {
  /** Name of the `<adras-action>` this stage lives in. */
  actionName: string;
  children: ReactNode;
}

/**
 * Root of an open chat action panel.
 *
 * Two jobs:
 *
 * 1. **Measure.** The plugin sizes the `<adras-action>` host to a fixed pixel
 *    box (~320-900px) while the viewport stays whatever it was. We measure the
 *    box we actually got and publish it on `ChatStageContext`, which is what
 *    makes `useWindowWidth()` / `useIsMobile()` answer for the panel instead of
 *    the screen. We observe our own root rather than the host: the host is
 *    already observed by the plugin (a second observer risks a resize loop),
 *    and during the plugin's measurement pass the host height is `auto`, so
 *    reading it would be meaningless.
 *
 *    Children do not render until a non-zero width is known, so nothing ever
 *    lays itself out against a bogus width. There is no flash: the host is
 *    `visibility: hidden` during that first frame anyway.
 *
 * 2. **Contain failures.** `ChatActions` is a sibling of `RootLayout` inside a
 *    single route element, so an uncaught throw in here would unmount the whole
 *    page underneath. The boundary keeps a broken panel to itself.
 */
export const ChatActionStage: FC<ChatActionStageProps> = ({
  actionName,
  children,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox((prev) =>
        prev && Math.abs(prev.w - width) < 1 && Math.abs(prev.h - height) < 1
          ? prev
          : { w: width, h: height },
      );
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const value = useMemo<IChatStageValue | null>(() => {
    if (!box || box.w < 1) return null;
    return {
      width: Math.round(box.w),
      height: Math.round(box.h),
      actionName,
      placement: box.w >= CHAT_STAGE_SIDE_MIN_WIDTH ? "side" : "inline",
      portalContainer,
    };
  }, [box, actionName, portalContainer]);

  return (
    <div ref={rootRef} className={styles.stage} data-chat-stage={actionName}>
      {value ? (
        <ChatStageContext.Provider value={value}>
          <Sentry.ErrorBoundary
            fallback={<ActionError />}
            beforeCapture={(scope) => scope.setTag("chat_action", actionName)}
          >
            {children}
          </Sentry.ErrorBoundary>
        </ChatStageContext.Provider>
      ) : (
        <ActionSkeleton />
      )}
      <div ref={setPortalContainer} className={styles.portalHost} />
    </div>
  );
};
