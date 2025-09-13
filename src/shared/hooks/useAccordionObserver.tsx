import { ENUM_ACCORDION_TYPES } from "@shared/config";
import { useEffect } from "react";

export const useAccordionObserver = (
  refs: React.MutableRefObject<Array<HTMLDivElement | null>>,
  deps: any[] = [],
  className: string = "",
  iconSelector: string = "trigger-chevron",
) => {
  useEffect(() => {
    refs.current.forEach((ref) => {
      if (!ref) return;

      const observer = new MutationObserver(() => {
        const state = ref.getAttribute("data-state");
        const icon = ref.querySelector("." + iconSelector);

        if (state === ENUM_ACCORDION_TYPES.OPEN) {
          if (className) ref.classList.add(className);

          icon?.classList.add(
            "rotate-180",
            "transition-transform",
            "duration-350",
          );
        } else {
          if (className) ref.classList.remove(className);
          icon?.classList.remove("rotate-180");
        }
      });

      observer.observe(ref, {
        attributes: true,
        attributeFilter: ["data-state"],
      });

      return () => observer.disconnect();
    });
  }, deps);
};
