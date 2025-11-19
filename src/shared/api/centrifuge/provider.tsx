import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";
import React, { ReactNode } from "react";
import { CentrifugeContext } from "./context";
import {
  useCentrifugeCallbacks,
  useCentrifugeFunctions,
  useCentrifugeConnection,
  useRevalidateCash,
  useRevalidateNotification,
  useWebsocketTokens,
} from "./hooks";
// import { PERSONAL_CHANNEL_PREFIX } from "./model";

export const CentrifugeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID)!;
  // const PERSONAL_CHANNEL = PERSONAL_CHANNEL_PREFIX.COMMON + userId;

  const { getTokens } = useWebsocketTokens();
  const { revalidateCash } = useRevalidateCash();
  const { revalidateNotifications } = useRevalidateNotification();

  const {
    handleNewMessageRef,
    handleNewMessageChatRef,
    handleReadMessageRef,
    OrderMessageNew,
    OrderMessageNewChat,
    OrderReadMessage,
  } = useCentrifugeCallbacks();

  const { centrifugeRef } = useCentrifugeConnection(
    userId,
    getTokens,
    revalidateCash,
    revalidateNotifications,
    handleNewMessageRef,
    handleNewMessageChatRef,
    handleReadMessageRef,
  );

  const { OrderMessageSend } = useCentrifugeFunctions(userId, centrifugeRef);

  return (
    <CentrifugeContext.Provider
      value={{
        centrifuge: centrifugeRef.current,
        OrderMessageSend,
        OrderMessageNew,
        OrderMessageNewChat,
        OrderReadMessage,
      }}
    >
      {children}
    </CentrifugeContext.Provider>
  );
};
