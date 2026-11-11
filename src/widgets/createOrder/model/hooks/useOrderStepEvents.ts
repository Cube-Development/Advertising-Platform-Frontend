import { useEffect, useRef } from "react";
import { getAnalytics } from "@shared/lib/analytics";
import type { ICreateOrderBlur } from "../config";

/**
 * order_step (спека 005 Q17): первое открытие секции в pv — шаг по её месту в мастере (post 1 …
 * payment 4); по якорю открыты все
 */
export const useOrderStepEvents = (
  blur: ICreateOrderBlur,
  sections: readonly (keyof ICreateOrderBlur)[],
): void => {
  const reported = useRef(new Set<keyof ICreateOrderBlur>());

  useEffect(() => {
    sections.forEach((id, index) => {
      if (blur[id] || reported.current.has(id)) return;
      reported.current.add(id);
      getAnalytics().track({ t: "order_step", n: id, num: index + 1 });
    });
  }, [blur, sections]);
};
