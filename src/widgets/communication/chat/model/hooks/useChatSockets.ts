import {
  chatAPI,
  IChatData,
  IMessageNewSocket,
  MESSAGE_STATUS,
  RECIPIENT_TYPE,
} from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { useCentrifuge } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import { useToast } from "@shared/ui";
import {
  checkDatetime,
  convertUTCToLocalDateTime,
  deserializeMessage,
} from "@shared/utils";
import { useTranslation } from "react-i18next";

interface IUseChatSocketsProps {
  role: ENUM_ROLES;
  deserializedChatsOrder?: IChatData[];
  deserializedChatsProject?: IChatData[];
  currentChat: IChatData | null;
  checkOrderExist: (id: string) => void;
  checkProjectExist: (id: string) => void;
}

export const useChatSockets = ({
  role,
  deserializedChatsOrder,
  deserializedChatsProject,
  currentChat,
  checkOrderExist,
  checkProjectExist,
}: IUseChatSocketsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { OrderMessageNewChat, OrderReadMessage } = useCentrifuge();

  const handleNewMessage = (message: IMessageNewSocket) => {
    const datetime = convertUTCToLocalDateTime(
      message.created_date,
      message.created_time,
    );
    const messageObj = deserializeMessage(message.message);
    const newMessage = {
      formatted_date: datetime.localDate,
      formatted_time: datetime.localTime,
      unread_count: 0,
      last_message: messageObj,
      message_datetime: message.created_date + " " + message.created_time,
    };
    if (message?.order_id && deserializedChatsOrder) {
      checkOrderExist(message?.order_id);
      const updatedChat = deserializedChatsOrder?.find(
        (chat) => chat?.order_id === message?.order_id,
      );

      if (updatedChat) {
        const updatedChatWithNewData = {
          ...updatedChat,
          ...newMessage,
          unread_count:
            message?.recipient === RECIPIENT_TYPE.RECEIVER
              ? updatedChat.unread_count + 1
              : updatedChat.unread_count,
        };
        dispatch(
          chatAPI.util.updateQueryData(
            "getOrderChats",
            { role: role },
            (draft) => {
              const newChatOrder = [
                updatedChatWithNewData,
                ...draft.filter((chat) => chat?.order_id !== message?.order_id),
              ];
              draft.splice(0, draft.length, ...newChatOrder);
            },
          ),
        );

        if (
          message?.recipient === RECIPIENT_TYPE.RECEIVER &&
          currentChat?.order_id !== message?.order_id
        ) {
          toast({
            variant: "default",
            title: t("toasts.websocket.new_message"),
          });
        }
      }
    } else if (message?.project_id && deserializedChatsProject) {
      checkProjectExist(message?.project_id);
      const updatedChat = deserializedChatsProject?.find(
        (chat) => chat?.project_id === message?.project_id,
      );

      if (updatedChat) {
        const updatedChatWithNewData = {
          ...updatedChat,
          ...newMessage,
          unread_count:
            message?.recipient === RECIPIENT_TYPE.RECEIVER
              ? updatedChat.unread_count + 1
              : updatedChat.unread_count,
        };
        dispatch(
          chatAPI.util.updateQueryData(
            "getProjectChats",
            { role: role },
            (draft) => {
              const newChatOrder = [
                updatedChatWithNewData,
                ...draft.filter(
                  (chat) => chat?.project_id !== message?.project_id,
                ),
              ];
              draft.splice(0, draft.length, ...newChatOrder);
            },
          ),
        );

        if (
          message?.recipient === RECIPIENT_TYPE.RECEIVER &&
          currentChat?.project_id !== message?.project_id
        ) {
          toast({
            variant: "default",
            title: t("toasts.websocket.new_message"),
          });
        }
      }
    }
  };

  const handleReadMessage = (message: IMessageNewSocket) => {
    const datetime = message?.created_date + " " + message?.created_time;
    if (message?.order_id) {
      dispatch(
        chatAPI.util.updateQueryData(
          "getOrderHistory",
          { order_id: message?.order_id, batch: INTERSECTION_ELEMENTS.CHAT },
          (draft) => {
            draft.history = draft.history.map((item) => {
              if (checkDatetime(item?.message_datetime, datetime)) {
                return {
                  ...item,
                  status: MESSAGE_STATUS.READ,
                };
              }
              return item;
            });
          },
        ),
      );
    } else if (message?.project_id) {
      dispatch(
        chatAPI.util.updateQueryData(
          "getProjectHistory",
          {
            project_id: message?.project_id,
            batch: INTERSECTION_ELEMENTS.CHAT,
          },
          (draft) => {
            draft.history = draft.history.map((item) => {
              if (checkDatetime(item?.message_datetime, datetime)) {
                return {
                  ...item,
                  status: MESSAGE_STATUS.READ,
                };
              }
              return item;
            });
          },
        ),
      );
    }
  };

  OrderMessageNewChat(handleNewMessage);
  OrderReadMessage(handleReadMessage);
};
