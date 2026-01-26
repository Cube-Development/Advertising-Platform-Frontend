import { ICreateOrderBlur } from "../config";
import { scroller } from "react-scroll";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { setBlur } from "../slice/createOrderSlice";

export const useChangeBlur = () => {
  const screen = useWindowWidth();
  const dispatch = useAppDispatch();
  const { blur } = useAppSelector((state) => state.createOrder);

  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    dispatch(setBlur(key));

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
      case "prices":
        scroller.scrollTo("prices", {
          smooth: true,
          offset: screen > BREAKPOINT.MD ? 0 : -60,
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
