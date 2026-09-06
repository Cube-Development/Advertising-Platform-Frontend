import { useChatStage } from "@shared/lib/chat-stage";
import { useState, useEffect } from "react";

/**
 * Width the current subtree actually has to lay out in.
 *
 * Normally that is the viewport. Inside an open AI chat action panel it is the
 * measured panel width instead — the panel is a ~320-900px fixed box on a
 * viewport that may be far wider, so `window.innerWidth` would make every
 * `BREAKPOINT` comparison pick a desktop layout for a phone-sized box.
 *
 * `useChatStage()` is `null` everywhere outside a panel, so behaviour on
 * regular pages is unchanged.
 */
export const useWindowWidth = (): number => {
  const stage = useChatStage();
  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return stage ? stage.width : screen;
};
