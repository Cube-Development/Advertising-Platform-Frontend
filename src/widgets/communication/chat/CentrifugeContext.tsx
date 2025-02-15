import {
  IMessageNewSocket,
  IMessageSendSocket,
  notificationsTypes,
  useGetAuthTokenMutation,
  useGetWebsocketTokenMutation,
} from "@entities/communication";
import { cookiesTypes } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { Centrifuge, PublicationContext } from "centrifuge";
import Cookies from "js-cookie";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

interface CentrifugeContextType {
  centrifuge: Centrifuge | null;
  OrderMessageSend: (message: IMessageSendSocket) => Promise<void>;
  OrderMessageNewChat: (
    handleNewMessageChat: (message: IMessageNewSocket) => void,
  ) => void;
  OrderMessageNew: (
    handleNewMessage: (message: IMessageNewSocket) => void,
  ) => void;
  OrderReadMessage: (
    handleReadMessage: (message: IMessageNewSocket) => void,
  ) => void;
}

const CentrifugeContext = createContext<CentrifugeContextType | undefined>(
  undefined,
);

export const CentrifugeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const centrifugeRef = useRef<Centrifuge | null>(null);
  const handleNewMessageRef = useRef<(message: IMessageNewSocket) => void>(
    () => {},
  );
  const handleNewMessageChatRef = useRef<(message: IMessageNewSocket) => void>(
    () => {},
  );
  const handleReadMessageRef = useRef<(message: IMessageNewSocket) => void>(
    () => {},
  );
  const { isAuth } = useAppSelector((state) => state.user);
  const [getWebsocketToken] = useGetWebsocketTokenMutation();
  const [getAuthToken] = useGetAuthTokenMutation();
  const userId = Cookies.get(cookiesTypes.userId)!;
  const channelName = "common";
  const personalChannel = "common:user#" + userId;

  useEffect(() => {
    const initializeCentrifuge = async () => {
      try {
        const authData = await getAuthToken().unwrap();
        const authToken = authData.token;
        const centrifugeInstance = new Centrifuge(
          import.meta.env.VITE_BASE_WS_URL,
          {
            getToken: () => Promise.resolve(authToken),
            debug: true,
          },
        );
        centrifugeInstance.connect();
        centrifugeRef.current = centrifugeInstance;
        const data = await getWebsocketToken({ channel: channelName }).unwrap();
        const token = data.token;
        const sub = centrifugeInstance.newSubscription(personalChannel, {
          getToken: () => Promise.resolve(token),
        });
        sub.on("publication", (ctx: PublicationContext) => {
          // console.log("Message", ctx);
          const newMessage = ctx.data as IMessageNewSocket;
          // console.log("handleNewMessage", handleNewMessageRef.current);
          // console.log("handleNewMessageChat", handleNewMessageChatRef.current);
          // console.log("new", newMessage);

          if (newMessage.recipient) {
            handleNewMessageChatRef.current(newMessage);
            handleNewMessageRef.current(newMessage);
          } else if (
            newMessage?.method === notificationsTypes.order_message_read ||
            newMessage?.method === notificationsTypes.project_message_read
          ) {
            handleReadMessageRef.current(newMessage);
          }
        });

        sub.subscribe();

        return () => {
          sub.unsubscribe();
          centrifugeInstance.disconnect();
        };
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (isAuth) {
      initializeCentrifuge();
    }
  }, [isAuth]);

  const OrderMessageSend = async (message: IMessageSendSocket) => {
    if (!centrifugeRef.current)
      throw new Error("Centrifuge instance is not initialized");
    try {
      const result = await centrifugeRef.current.publish(
        personalChannel,
        message,
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const OrderMessageNew = (callback: (message: IMessageNewSocket) => void) => {
    handleNewMessageRef.current = callback;
  };

  const OrderMessageNewChat = (
    callback: (message: IMessageNewSocket) => void,
  ) => {
    handleNewMessageChatRef.current = callback;
  };

  const OrderReadMessage = (callback: (message: IMessageNewSocket) => void) => {
    handleReadMessageRef.current = callback;
  };

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

export const useCentrifuge = (): CentrifugeContextType => {
  const context = useContext(CentrifugeContext);
  if (!context) {
    throw new Error("useCentrifuge must be used within a CentrifugeProvider");
  }
  return context;
};
