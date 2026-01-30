import {
  CHAT_FILTER,
  CHAT_TYPE,
  chatAPI,
  IChatData,
  useGetOrderChatByIdQuery,
  useGetProjectChatByIdQuery,
} from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { useEffect, useMemo, useState } from "react";

interface IUseChatSelectionProps {
  role: ENUM_ROLES;
  orderId?: string | null;
  projectId?: string | null;
  deserializedChatsOrder?: IChatData[];
  deserializedChatsProject?: IChatData[];
}

export const useChatSelection = ({
  role,
  orderId,
  projectId,
  deserializedChatsOrder,
  deserializedChatsProject,
}: IUseChatSelectionProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<IChatData | null>(null);
  const [chatFilter, setChatFilter] = useState<CHAT_FILTER>(
    CHAT_FILTER.BLOGGER,
  );
  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const [newProjectId, setNewProjectId] = useState<string | null>(null);

  // Checking existing current chat in all chats
  const currentChatOrder = useMemo(() => {
    if (!orderId) return null;
    return (
      deserializedChatsOrder?.find((item) => item?.order_id === orderId) || null
    );
  }, [deserializedChatsOrder, orderId]);

  const currentChatProject = useMemo(() => {
    if (!projectId) return null;
    return (
      deserializedChatsProject?.find(
        (item) => item?.project_id === projectId,
      ) || null
    );
  }, [deserializedChatsProject, projectId]);

  // if not found current chat in all chats then new request if chat is open
  const { data: chatOrderById, isLoading: isLoadingOrder } =
    useGetOrderChatByIdQuery(
      { order_id: orderId! },
      { skip: !isOpen || !orderId || !!currentChatOrder },
    );

  const { data: chatProjectById, isLoading: isLoadingProject } =
    useGetProjectChatByIdQuery(
      { project_id: projectId! },
      {
        skip: !isOpen || !projectId || !!currentChatProject,
      },
    );

  const { data: newChatOrderById, isLoading: isLoadingNewOrder } =
    useGetOrderChatByIdQuery({ order_id: newOrderId! }, { skip: !newOrderId });

  const { data: newChatProjectById, isLoading: isLoadingNewProject } =
    useGetProjectChatByIdQuery(
      { project_id: newProjectId! },
      { skip: !newProjectId },
    );

  const handleChangeChat = (card: IChatData) => {
    setCurrentChat(
      card?.type === CHAT_TYPE.ORDER
        ? deserializedChatsOrder?.find(
            (item) => item?.order_id === card?.order_id,
          ) || null
        : deserializedChatsProject?.find(
            (item) => item?.project_id === card?.project_id,
          ) || null,
    );
  };

  const resetValues = () => {
    setCurrentChat(null);
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
    setIsOpen(false);
  };

  // Helper functions exposed for sockets hook if needed, or used internally
  const checkOrderExist = (messageOrderId: string) => {
    const condition = !deserializedChatsOrder?.find(
      (item) => item?.order_id === messageOrderId,
    );
    if (condition) {
      setNewOrderId(messageOrderId);
    }
  };
  const checkProjectExist = (messageProjectId: string) => {
    const condition = !deserializedChatsProject?.find(
      (item) => item?.project_id === messageProjectId,
    );
    if (condition) {
      setNewProjectId(messageProjectId);
    }
  };

  useEffect(() => {
    if (orderId && isOpen) {
      setChatFilter(CHAT_FILTER.BLOGGER);
      if (chatOrderById && !currentChatOrder) {
        setCurrentChat(chatOrderById);
        dispatch(
          chatAPI.util.updateQueryData(
            "getOrderChats",
            { role: role },
            (draft) => {
              const newChatOrder = [
                chatOrderById,
                ...draft.filter((chat) => chat?.order_id !== orderId),
              ];
              draft.splice(0, draft.length, ...newChatOrder);
            },
          ),
        );
      } else if (currentChatOrder) {
        setCurrentChat(currentChatOrder);
      }
    } else if (projectId && isOpen) {
      setChatFilter(
        role === ENUM_ROLES.ADVERTISER
          ? CHAT_FILTER.MANAGER
          : CHAT_FILTER.ADVERTISER,
      );
      if (chatProjectById && !currentChatProject) {
        setCurrentChat(chatProjectById);
        dispatch(
          chatAPI.util.updateQueryData(
            "getProjectChats",
            { role: role },
            (draft) => {
              const newChatProject = [
                chatProjectById,
                ...draft.filter((chat) => chat?.project_id !== projectId),
              ];
              draft.splice(0, draft.length, ...newChatProject);
            },
          ),
        );
      } else if (currentChatProject) {
        setCurrentChat(currentChatProject);
      }
    }
  }, [
    isOpen,
    isLoadingOrder,
    isLoadingProject,
    orderId,
    projectId,
    chatOrderById,
    chatProjectById,
    currentChatOrder,
    currentChatProject,
    role,
    dispatch,
  ]);

  useEffect(() => {
    if (newChatOrderById) {
      dispatch(
        chatAPI.util.updateQueryData(
          "getOrderChats",
          { role: role },
          (draft) => {
            const newChatOrder = [
              newChatOrderById,
              ...draft.filter((chat) => chat?.order_id !== newOrderId),
            ];
            draft.splice(0, draft.length, ...newChatOrder);
          },
        ),
      );
    }
  }, [isLoadingNewOrder, newChatOrderById, newOrderId, role, dispatch]);

  useEffect(() => {
    if (newChatProjectById) {
      dispatch(
        chatAPI.util.updateQueryData(
          "getProjectChats",
          { role: role },
          (draft) => {
            const newChatProject = [
              newChatProjectById,
              ...draft.filter((chat) => chat?.project_id !== newProjectId),
            ];
            draft.splice(0, draft.length, ...newChatProject);
          },
        ),
      );
    }
  }, [isLoadingNewProject, newChatProjectById, newProjectId, role, dispatch]);

  return {
    isOpen,
    setIsOpen,
    currentChat,
    setCurrentChat,
    chatFilter,
    setChatFilter,
    handleChangeChat,
    handleCloseChat,
    resetValues,
    checkOrderExist,
    checkProjectExist,
  };
};
