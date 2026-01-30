import {
  CHAT_ADVERTISER_FILTER_TABS_LIST,
  CHAT_FILTER,
  CHAT_MANAGER_FILTER_TABS_LIST,
  RECIPIENT_TYPE,
  useGetOrderChatsQuery,
  useGetProjectChatsQuery,
} from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { deserializeMessage } from "@shared/utils";
import { useMemo } from "react";

export const useChatList = (role: ENUM_ROLES) => {
  // All chats
  const { data: chatsOrder } = useGetOrderChatsQuery({ role: role });

  const { data: chatsProject } = useGetProjectChatsQuery(
    { role: role },
    { skip: role === ENUM_ROLES.BLOGGER },
  );

  // Десериализация last_message в списках чатов
  const deserializedChatsOrder = useMemo(() => {
    if (!chatsOrder) return chatsOrder;
    return chatsOrder.map((chat) => ({
      ...chat,
      last_message: deserializeMessage(chat.last_message),
    }));
  }, [chatsOrder]);

  const deserializedChatsProject = useMemo(() => {
    if (!chatsProject) return chatsProject;
    return chatsProject.map((chat) => ({
      ...chat,
      last_message: deserializeMessage(chat.last_message),
    }));
  }, [chatsProject]);

  const countOrderMessage =
    deserializedChatsOrder?.reduce(
      (total, item) =>
        total +
        (item.recipient === RECIPIENT_TYPE.RECEIVER ? item.unread_count : 0),
      0,
    ) || 0;

  const countProjectMessage =
    deserializedChatsProject?.reduce(
      (total, item) =>
        total +
        (item.recipient === RECIPIENT_TYPE.RECEIVER ? item.unread_count : 0),
      0,
    ) || 0;

  const haveNewMessage = !!(countOrderMessage + countProjectMessage);

  const badge =
    role === ENUM_ROLES.ADVERTISER
      ? [
          { status: CHAT_FILTER.BLOGGER, count: countOrderMessage },
          { status: CHAT_FILTER.MANAGER, count: countProjectMessage },
        ]
      : role === ENUM_ROLES.MANAGER
        ? [
            { status: CHAT_FILTER.BLOGGER, count: countOrderMessage },
            { status: CHAT_FILTER.ADVERTISER, count: countProjectMessage },
          ]
        : [];

  const tab_list =
    role === ENUM_ROLES.ADVERTISER
      ? CHAT_ADVERTISER_FILTER_TABS_LIST
      : role === ENUM_ROLES.MANAGER
        ? CHAT_MANAGER_FILTER_TABS_LIST
        : [];

  return {
    chatsOrder,
    chatsProject,
    deserializedChatsOrder,
    deserializedChatsProject,
    haveNewMessage,
    badge,
    tab_list,
  };
};
