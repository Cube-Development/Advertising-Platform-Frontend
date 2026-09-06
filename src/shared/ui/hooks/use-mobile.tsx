import { useChatStage } from "@shared/lib/chat-stage";
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Whether the current subtree should use the compact layout.
 *
 * Inside an open AI chat action panel this answers for the panel box rather
 * than the viewport (see `useChatStage`), so `useResponsiveOverlay` picks a
 * Drawer in a narrow panel even on a wide screen. Outside a panel the stage is
 * `null` and the original matchMedia behaviour applies unchanged.
 */
export function useIsMobile() {
  const stage = useChatStage();
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (stage) return stage.width < MOBILE_BREAKPOINT;

  return !!isMobile;
}
