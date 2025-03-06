import {
  IMessageNewSocket,
  IMessageSendSocket,
  INotificationCard,
  INotificationData,
  INotifications,
  notificationsAPI,
  notificationsTypes,
  useGetAuthTokenMutation,
  useGetWebsocketTokenMutation,
  websocketMessages,
  websocketNotifications,
} from "@entities/communication";
import { cookiesTypes, INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { Centrifuge, PublicationContext } from "centrifuge";
import Cookies from "js-cookie";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

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
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
          const newPush = ctx.data;
          const method = newPush?.method;

          if (websocketMessages.includes(method)) {
            const newMessage = ctx.data as IMessageNewSocket;
            if (
              newMessage?.method === notificationsTypes.order_message_read ||
              newMessage?.method === notificationsTypes.project_message_read
            ) {
              handleReadMessageRef.current(newMessage);
            } else if (newMessage.recipient) {
              handleNewMessageChatRef.current(newMessage);
              handleNewMessageRef.current(newMessage);
            }
          } else if (websocketNotifications.includes(method)) {
            const newNotification = ctx.data as INotificationData;
            console.log("newNotification", newNotification);
            handleNewNotification(newNotification);
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

  const handleNewNotification = (message: INotificationData) => {
    dispatch(
      notificationsAPI.util.updateQueryData(
        "getNotifications",
        {
          page: 1,
          elements_on_page: INTERSECTION_ELEMENTS.notifications,
        },
        (draft) => {
          const newNotification: INotificationCard = {
            id: message.id || uuidv4(),
            text: message.text,
            method: message.method,
            created_date:
              message?.created_date || new Date().toLocaleDateString("ru-RU"),
            created_time:
              message?.created_time || new Date().toLocaleTimeString("ru-RU"),
            is_read: false,
            data: message,
          };
          const notifications = [newNotification, ...draft?.notifications];
          draft.notifications.splice(
            0,
            draft.notifications.length,
            ...notifications,
          );
        },
      ),
    );
    toast({
      variant: "default",
      title: t("toasts.websocket.new_notification"),
    });
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
