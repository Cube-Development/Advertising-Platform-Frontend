import { BREAKPOINT } from "@shared/config";
import { useState, useEffect, useMemo } from "react";

export const useWindowWidth = (): number => {
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

  return screen;
};
