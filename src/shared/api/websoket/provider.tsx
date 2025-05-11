import {
  IMessageNewSocket,
  IMessageSendSocket,
  INotificationCard,
  INotificationData,
  notificationsAPI,
  notificationsTypes,
  useGetAuthTokenMutation,
  useGetWebsocketTokenMutation,
  websocketMessages,
  websocketNotifications,
} from "@entities/communication";
import { ENUM_COOKIES_TYPES, INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { convertUTCToLocalDateTime } from "@shared/utils";
import { Centrifuge, PublicationContext } from "centrifuge";
import Cookies from "js-cookie";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { CentrifugeContext } from "./context";
import { useRevalidateCash } from "./hooks";
import { CHANNEL_NAME, PERSONAL_CHANNEL_PREFIX } from "./model";

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
  const { isAuth, role } = useAppSelector((state) => state.user);
  const [getWebsocketToken] = useGetWebsocketTokenMutation();
  const [getAuthToken] = useGetAuthTokenMutation();
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID)!;
  const { revalidateCash } = useRevalidateCash();

  const PERSONAL_CHANNEL = PERSONAL_CHANNEL_PREFIX + userId;

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
        const data = await getWebsocketToken({
          channel: CHANNEL_NAME,
        }).unwrap();
        const token = data.token;
        const sub = centrifugeInstance.newSubscription(PERSONAL_CHANNEL, {
          getToken: () => Promise.resolve(token),
        });
        sub.on("publication", (ctx: PublicationContext) => {
          const newData = ctx.data;
          const method = newData?.method;
          revalidateCash(newData);

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
        PERSONAL_CHANNEL,
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
    const datetime = convertUTCToLocalDateTime(
      message?.created_date!,
      message?.created_time!,
    );

    const newNotification: INotificationCard = {
      id: message.id || uuidv4(),
      text: message.text || "new notification",
      method: message.method,
      created_date: message?.created_date,
      created_time: message?.created_time,
      formatted_date: message?.created_date
        ? datetime.localDate
        : new Date().toLocaleDateString("ru-RU"),
      formatted_time: message?.created_time
        ? datetime.localTime
        : new Date().toLocaleTimeString("ru-RU"),
      is_read: false,
      data: message,
    };
    dispatch(
      notificationsAPI.util.updateQueryData(
        "getNotifications",
        {
          page: 1,
          elements_on_page: INTERSECTION_ELEMENTS.NOTIFICATIONS,
        },
        (draft) => {
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
