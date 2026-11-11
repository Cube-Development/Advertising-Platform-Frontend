import { useCallback, useEffect } from "react";
import { getAnalytics, type TrackInput } from "@shared/lib/analytics";

type TGateName = Extract<TrackInput, { t: "gate_shown" }>["n"];

interface IGateEventsOptions {
  name: TGateName;
  /** Канал, о котором окно; окно не о канале — пусто */
  channelId?: string;
  isShown: boolean;
}

/**
 * Окна доступа (спека 005 Q14): gate_shown — при каждом показе окна; возвращает обработчик gate_click
 * для кнопки действия. API — как у useGateEvents в blogix
 */
export const useGateEvents = ({
  name,
  channelId = "",
  isShown,
}: IGateEventsOptions) => {
  useEffect(() => {
    if (isShown) {
      getAnalytics().track({
        t: "gate_shown",
        n: name,
        e: "channel",
        id: channelId,
      });
    }
  }, [isShown, name, channelId]);

  return useCallback(() => {
    getAnalytics().track({
      t: "gate_click",
      n: name,
      e: "channel",
      id: channelId,
    });
  }, [name, channelId]);
};
