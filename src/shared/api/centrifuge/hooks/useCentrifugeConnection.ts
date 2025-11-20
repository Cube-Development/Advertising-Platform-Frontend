import { useAppSelector } from "@shared/hooks";
import { Centrifuge } from "centrifuge";
import { useEffect, useRef } from "react";
import { CENTRIFUGE_CHANNELS, PERSONAL_CHANNEL_PREFIX } from "../model";
import { useCentrifugePublication } from "./useCentrifugePublication";

export function useCentrifugeConnection(
  userId: string,
  getTokens: (channel: string) => Promise<{ authToken: string; token: string }>,
  revalidateCash: (data: any) => void,
  revalidateNotifications: (data: any) => void,
  handleNewMessageRef: React.MutableRefObject<(msg: any) => void>,
  handleNewMessageChatRef: React.MutableRefObject<(msg: any) => void>,
  handleReadMessageRef: React.MutableRefObject<(msg: any) => void>,
) {
  const { isAuth } = useAppSelector((state) => state.user);

  const centrifugeRef = useRef<Centrifuge | null>(null);

  const onPublication = useCentrifugePublication(
    revalidateCash,
    revalidateNotifications,
    handleNewMessageRef,
    handleNewMessageChatRef,
    handleReadMessageRef,
  );

  useEffect(() => {
    if (!isAuth) return;

    let sub: ReturnType<Centrifuge["newSubscription"]>;
    let sub2: ReturnType<Centrifuge["newSubscription"]>;

    async function init() {
      try {
        const { authToken, token } = await getTokens(
          CENTRIFUGE_CHANNELS.COMMON,
        );
        const { token: aiSampleToken } = await getTokens(
          CENTRIFUGE_CHANNELS.AI_SAMPLE,
        );

        const centrifuge = new Centrifuge(import.meta.env.VITE_BASE_WS_URL, {
          getToken: () => Promise.resolve(authToken),
          debug: true,
        });
        centrifuge.connect();
        centrifugeRef.current = centrifuge;

        sub = centrifuge.newSubscription(
          PERSONAL_CHANNEL_PREFIX.COMMON + userId,
          {
            getToken: () => Promise.resolve(token),
          },
        );

        sub.on("publication", onPublication);
        sub.subscribe();

        sub2 = centrifuge.newSubscription(
          PERSONAL_CHANNEL_PREFIX.AI_SAMPLE + userId,
          {
            getToken: () => Promise.resolve(aiSampleToken),
          },
        );

        sub2.on("publication", onPublication);
        sub2.subscribe();
      } catch (error) {
        console.error("Error initializing centrifuge:", error);
      }
    }

    init();

    // return () => {
    //   if (sub) sub.off("publication", onPublication).unsubscribe();
    //   centrifugeRef.current?.disconnect();
    //   centrifugeRef.current = null;
    // };
  }, [isAuth, userId]);

  return { centrifugeRef };
}
