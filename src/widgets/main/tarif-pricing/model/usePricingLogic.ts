import { useState, useRef, useCallback } from "react";
import { STEPS, FEATURES } from "./constants";
import type { RectMap } from "./types";

const THROTTLE_MS = 80;

export function usePricingLogic() {
  const [stepIdx, setStepIdx] = useState(0);
  const budget = STEPS[stepIdx];

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rectsBefore = useRef<RectMap>({});
  const pendingFlip = useRef(false);

  // Throttle state
  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingIdx = useRef<number | null>(null);
  const committedIdx = useRef(0);

  const leftColumn = FEATURES.filter((f) => f.min <= budget);
  const rightColumn = FEATURES.filter((f) => f.min > budget);

  const snapshotRects = useCallback((): RectMap => {
    const snapshot: RectMap = {};
    for (const [id, el] of Object.entries(cardRefs.current)) {
      if (el) snapshot[id] = el.getBoundingClientRect();
    }
    return snapshot;
  }, []);

  const commitIdx = useCallback(
    (idx: number) => {
      if (idx === committedIdx.current || idx < 0 || idx >= STEPS.length)
        return;

      rectsBefore.current = snapshotRects();
      pendingFlip.current = true;
      committedIdx.current = idx;
      setStepIdx(idx);
    },
    [snapshotRects],
  );

  const handleBudgetChange = useCallback(
    (newIdx: number) => {
      pendingIdx.current = newIdx;

      // Если throttle не активен — коммитим сразу (leading edge)
      if (!throttleTimer.current) {
        commitIdx(newIdx);
        throttleTimer.current = setTimeout(() => {
          throttleTimer.current = null;
          // Trailing edge: коммитим последний накопленный idx
          if (
            pendingIdx.current !== null &&
            pendingIdx.current !== committedIdx.current
          ) {
            commitIdx(pendingIdx.current);
          }
          pendingIdx.current = null;
        }, THROTTLE_MS);
      }
    },
    [commitIdx],
  );

  return {
    stepIdx,
    budget,
    leftColumn,
    rightColumn,
    cardRefs,
    rectsBefore,
    pendingFlip,
    handleBudgetChange,
  };
}
