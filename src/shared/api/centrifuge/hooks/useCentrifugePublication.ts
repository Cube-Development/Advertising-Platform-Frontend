import {
  IMessageNewSocket,
  INotificationData,
  notificationsTypes,
  websocketMessages,
  websocketNotifications,
} from "@entities/communication";
import { useCallback } from "react";

export function useCentrifugePublication(
  revalidateCash: (data: any) => void,
  revalidateNotifications: (data: INotificationData) => void,
  handleNewMessageRef: React.MutableRefObject<(msg: IMessageNewSocket) => void>,
  handleNewMessageChatRef: React.MutableRefObject<
    (msg: IMessageNewSocket) => void
  >,
  handleReadMessageRef: React.MutableRefObject<
    (msg: IMessageNewSocket) => void
  >,
) {
  return useCallback(
    (ctx: { data: any }) => {
      const data = ctx.data;
      const method = data?.method;
      revalidateCash(data);

      if (websocketMessages.includes(method)) {
        const message = data as IMessageNewSocket;
        if (
          message.method === notificationsTypes.order_message_read ||
          message.method === notificationsTypes.project_message_read
        ) {
          handleReadMessageRef.current(message);
        } else if (message.recipient) {
          handleNewMessageChatRef.current(message);
          handleNewMessageRef.current(message);
        }
      } else if (websocketNotifications.includes(method)) {
        const notification = data as INotificationData;
        revalidateNotifications(notification);
      }
    },
    [
      revalidateCash,
      revalidateNotifications,
      handleNewMessageRef,
      handleNewMessageChatRef,
      handleReadMessageRef,
    ],
  );
}
