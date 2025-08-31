import { useAppSelector } from "@shared/hooks";
import { Centrifuge } from "centrifuge";
import { useEffect, useRef } from "react";
import { CHANNEL_NAME } from "../model";
import { useCentrifugePublication } from "./useCentrifugePublication";

export function useCentrifugeConnection(
  personalChannel: string,
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

    async function init() {
      try {
        const { authToken, token } = await getTokens(CHANNEL_NAME);

        const centrifuge = new Centrifuge(import.meta.env.VITE_BASE_WS_URL, {
          getToken: () => Promise.resolve(authToken),
          debug: true,
        });
        centrifuge.connect();
        centrifugeRef.current = centrifuge;

        sub = centrifuge.newSubscription(personalChannel, {
          getToken: () => Promise.resolve(token),
        });

        sub.on("publication", onPublication);
        sub.subscribe();
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
  }, [isAuth, personalChannel]);

  return { centrifugeRef };
}
