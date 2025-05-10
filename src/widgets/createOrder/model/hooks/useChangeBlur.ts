import { useState } from "react";
import { ICreateOrderBlur } from "../config";
import { scroller } from "react-scroll";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

export const useChangeBlur = () => {
  const screen = useWindowWidth();
  const [blur, setBlur] = useState<ICreateOrderBlur>({
    post: true,
    datetime: true,
    payment: true,
  });
  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    setBlur(newBlur);
    switch (key) {
      case "post":
        scroller.scrollTo("post", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? 0 : -60,
        });
        break;
      case "datetime":
        scroller.scrollTo("datetime", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? -30 : -80,
        });
        break;
      case "payment":
        scroller.scrollTo("payment", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? 0 : -60,
        });
        break;
      default:
        break;
    }
  };

  return {
    blur,
    handleOnChangeBlur,
  };
};
