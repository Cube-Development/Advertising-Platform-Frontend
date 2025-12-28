import { IChatProps } from "@entities/communication";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
import { useTranslation } from "react-i18next";
import { useChatDrag } from "./useChatDrag";
import { useChatList } from "./useChatList";
import { useChatSelection } from "./useChatSelection";
import { useChatSockets } from "./useChatSockets";

export const useChat = ({ orderId, projectId, isProject }: IChatProps) => {
  const screen = useWindowWidth();
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);

  // 1. Get Chat Lists
  const {
    deserializedChatsOrder,
    deserializedChatsProject,
    haveNewMessage,
    badge,
    tab_list,
  } = useChatList(role);

  // 2. Manage Selection State
  const {
    isOpen,
    setIsOpen,
    currentChat,
    chatFilter,
    setChatFilter,
    handleChangeChat,
    handleCloseChat,
    resetValues,
    checkOrderExist,
    checkProjectExist,
  } = useChatSelection({
    role,
    orderId,
    projectId,
    deserializedChatsOrder,
    deserializedChatsProject,
  });

  // 3. Handle Sockets
  useChatSockets({
    role,
    deserializedChatsOrder,
    deserializedChatsProject,
    currentChat,
    checkOrderExist,
    checkProjectExist,
  });

  // 4. Handle Drag
  const { isDraggable, chatRef, handleTouchStart } = useChatDrag();

  // Determine which list to show based on props
  const chats = isProject ? deserializedChatsProject : deserializedChatsOrder;

  return {
    screen,
    role,
    t,
    isOpen,
    setIsOpen,
    currentChat,
    chatFilter,
    setChatFilter,
    chats,
    haveNewMessage,
    badge,
    tab_list,
    handleChangeChat,
    resetValues,
    handleCloseChat,
    handleTouchStart,
    isDraggable,
    chatRef,
  };
};
