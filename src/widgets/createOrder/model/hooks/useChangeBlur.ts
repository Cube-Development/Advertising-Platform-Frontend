import { useCallback, useState } from "react";
import { ICreateOrderBlur } from "../config";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { useLocation } from "react-router-dom";

const BLUR_ALL: ICreateOrderBlur = {
  post: true,
  datetime: true,
  prices: true,
  payment: true,
};

const OPEN_ALL: ICreateOrderBlur = {
  post: false,
  datetime: false,
  prices: false,
  payment: false,
};

const SECTION_IDS: Array<keyof ICreateOrderBlur> = [
  "post",
  "datetime",
  "prices",
  "payment",
];

const SCROLL_OFFSET: Record<
  keyof ICreateOrderBlur,
  { md: number; mobile: number }
> = {
  post: { md: 0, mobile: -60 },
  datetime: { md: -30, mobile: -80 },
  prices: { md: 0, mobile: -60 },
  payment: { md: 0, mobile: -60 },
};

const parseSectionId = (hash: string): keyof ICreateOrderBlur | "" => {
  const id = hash.replace("#", "");
  return SECTION_IDS.includes(id as keyof ICreateOrderBlur)
    ? (id as keyof ICreateOrderBlur)
    : "";
};

export const useChangeBlur = () => {
  const screen = useWindowWidth();
  const { hash } = useLocation();
  const sectionId = parseSectionId(hash);
  const [blur, setBlur] = useState<ICreateOrderBlur>(
    parseSectionId(window.location.hash) ? OPEN_ALL : BLUR_ALL,
  );

  const scrollToSection = useCallback(
    (id: keyof ICreateOrderBlur) => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset =
        screen > BREAKPOINT.MD
          ? SCROLL_OFFSET[id].md
          : SCROLL_OFFSET[id].mobile;
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [screen],
  );

  const handleOnChangeBlur = (key: keyof ICreateOrderBlur) => {
    const newBlur = { ...blur };
    newBlur[key] = false;
    setBlur(newBlur);
    scrollToSection(key);
  };

  return {
    blur,
    handleOnChangeBlur,
    sectionId,
    scrollToSection,
  };
};
