import { channelAPI } from "@entities/channel";
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
import { advProjectsAPI, managerProjectsAPI } from "@entities/project";
import { cookiesTypes, INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { Centrifuge, PublicationContext } from "centrifuge";
import Cookies from "js-cookie";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import {
  ADV_PROJECTS,
  ADV_TARIFF_PROJECTS,
  BLOGGER_CHANNELS,
  BLOGGER_OFFERS,
  MANAGER_PROJECTS,
  TRANSACTION_HISTORY,
  VIEWS_ADVERTISER,
  VIEWS_BLOGGER_CHANNELS,
  VIEWS_BLOGGER_OFFERS,
  VIEWS_MANAGER,
  VIEWS_TRANSACTIONS,
} from "./tags";
import { bloggerOffersAPI } from "@entities/offer";
import { walletAPI } from "@entities/wallet";

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
  const { isAuth, role } = useAppSelector((state) => state.user);
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
          handleRevalidateCash(method);

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
    const newNotification: INotificationCard = {
      id: message.id || uuidv4(),
      text: message.text || "222",
      method: message.method,
      created_date:
        message?.created_date || new Date().toLocaleDateString("ru-RU"),
      created_time:
        message?.created_time || new Date().toLocaleTimeString("ru-RU"),
      is_read: false,
      data: message,
    };
    dispatch(
      notificationsAPI.util.updateQueryData(
        "getNotifications",
        {
          page: 1,
          elements_on_page: INTERSECTION_ELEMENTS.notifications,
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

  const handleRevalidateCash = (method: notificationsTypes) => {
    if (method === notificationsTypes.notification_create_deposit) {
      dispatch(
        walletAPI.util.invalidateTags([
          TRANSACTION_HISTORY,
          VIEWS_TRANSACTIONS,
        ]),
      );
    } else if (method === notificationsTypes.new_manager_project) {
      dispatch(
        managerProjectsAPI.util.invalidateTags([
          MANAGER_PROJECTS,
          VIEWS_MANAGER,
        ]),
      );
    } else if (method === notificationsTypes.notification_request_approve) {
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (method === notificationsTypes.notification_create_desire) {
      dispatch(managerProjectsAPI.util.resetApiState());
    } else if (
      method === notificationsTypes.notification_launch_manager_project
    ) {
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (method === notificationsTypes.notification_unban_channel) {
      dispatch(
        channelAPI.util.invalidateTags([
          BLOGGER_CHANNELS,
          VIEWS_BLOGGER_CHANNELS,
        ]),
      );
    } else if (method === notificationsTypes.notification_limited_ban_channel) {
      dispatch(
        channelAPI.util.invalidateTags([
          BLOGGER_CHANNELS,
          VIEWS_BLOGGER_CHANNELS,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_unlimited_ban_channel
    ) {
      dispatch(
        channelAPI.util.invalidateTags([
          BLOGGER_CHANNELS,
          VIEWS_BLOGGER_CHANNELS,
        ]),
      );
    } else if (method === notificationsTypes.notification_new_order_blogger) {
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_accept_order_blogger
    ) {
      dispatch(
        advProjectsAPI.util.invalidateTags([ADV_PROJECTS, VIEWS_ADVERTISER]),
      );
    }
    //
    else if (method === notificationsTypes.notification_publish_post) {
      dispatch(
        advProjectsAPI.util.invalidateTags([ADV_PROJECTS, VIEWS_ADVERTISER]),
      );
    } else if (
      method === notificationsTypes.notification_advertiser_accept_order
    ) {
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_advertiser_reject_order
    ) {
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    }
    // else if (
    //   method ===
    //   notificationsTypes.notification_advertiser_reject_order_moderator
    // ) {
    //   dispatch(bloggerOffersAPI.util.resetApiState());
    // }
    //
    else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_positive
    ) {
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_negative
    ) {
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_advertiser_negative
    ) {
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_advertiser_positive
    ) {
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_refund_manager_project
    ) {
      dispatch(
        walletAPI.util.invalidateTags([
          TRANSACTION_HISTORY,
          VIEWS_TRANSACTIONS,
        ]),
      );
    }
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
