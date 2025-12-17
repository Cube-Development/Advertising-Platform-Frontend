import {
  CHAT_ADVERTISER_FILTER_TABS_LIST,
  CHAT_FILTER,
  CHAT_MANAGER_FILTER_TABS_LIST,
  CHAT_TYPE,
  chatAPI,
  IChatData,
  IChatProps,
  IMessageNewSocket,
  MESSAGE_STATUS,
  RECIPIENT_TYPE,
  useGetOrderChatByIdQuery,
  useGetOrderChatsQuery,
  useGetProjectChatByIdQuery,
  useGetProjectChatsQuery,
} from "@entities/communication";
import { ENUM_ROLES } from "@entities/user";
import { ChatCard, ChatMessages } from "@features/communication";
import { BarSubFilter } from "@features/other";
import { useCentrifuge } from "@shared/api";
import {
  ArrowLongHorizontalIcon,
  ChatChooseIcon,
  ChatIcon,
  ChatIcon2,
  ChatMainIcon,
  CubeDevelopmentIcon,
} from "@shared/assets";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
import { deserializeMessage } from "@shared/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  CustomCloseButton,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  ScrollArea,
  useToast,
} from "@shared/ui";
import { checkDatetime, convertUTCToLocalDateTime } from "@shared/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const Chat: FC<IChatProps> = ({
  orderId,
  projectId,
  toRole,
  isMain,
  isProject,
  isFull,
}) => {
  const screen = useWindowWidth();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { OrderMessageNewChat, OrderReadMessage } = useCentrifuge();
  const { role } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<IChatData | null>(null);
  const [chatFilter, setChatFilter] = useState<CHAT_FILTER>(
    CHAT_FILTER.BLOGGER,
  );

  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const [newProjectId, setNewProjectId] = useState<string | null>(null);

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

  const chats = isProject ? deserializedChatsProject : deserializedChatsOrder;

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
  }, [isOpen, isLoadingOrder, isLoadingProject]);

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
  }, [isLoadingNewOrder]);

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
  }, [isLoadingNewProject]);

  OrderMessageNewChat(handleNewMessage);
  OrderReadMessage(handleReadMessage);

  // drag & drop new feat
  const [isDraggable, setIsDraggable] = useState(false); // Состояние для активации drag
  const chatRef = useRef<HTMLDivElement | null>(null); // Ref для чата

  const handleTouchStart = (event: React.TouchEvent) => {
    // Получаем координату начала касания
    const touchX = event.touches[0].clientX;

    // Проверяем, находится ли касание в пределах 0-100px от левого края чата
    if (chatRef.current) {
      const chatLeft = chatRef.current.getBoundingClientRect().left; // Левый край чата
      const touchOffset = touchX - chatLeft;

      if (touchOffset >= 0 && touchOffset <= 80) {
        setIsDraggable(true); // Активируем drag
      } else {
        setIsDraggable(false); // Отключаем drag
      }
    }
  };

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

  return (
    <div className={`${styles.wrapper} ${styles.overlay}`}>
      {screen >= BREAKPOINT.MD ? (
        <AlertDialog>
          <AlertDialogTrigger
            className={styles.trigger}
            onClick={() => setIsOpen(true)}
          >
            {isMain ? (
              <ChatMainIcon haveNewMessage={haveNewMessage} />
            ) : isProject ? (
              <ChatIcon2 className="active__icon" />
            ) : (
              <ChatIcon className="icon__white" />
            )}
            {isFull && toRole === ENUM_ROLES.BLOGGER && (
              <p>{t("chat.role.blogger")}</p>
            )}
            {isFull && toRole === ENUM_ROLES.MANAGER && (
              <p>{t("chat.role.manager")}</p>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent
            showOverlay={false}
            className={`blur_content ${styles.content} ${styles.dialog}`}
          >
            <div
              className={`${styles.content__left} ${role !== ENUM_ROLES.BLOGGER ? styles.gridA : styles.gridB}`}
            >
              <AlertDialogTitle className={styles.title}>
                <p className="gradient_color">{t("chat.my_messages")}</p>
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only"></AlertDialogDescription>
              {role !== ENUM_ROLES.BLOGGER && (
                <div className={styles.filter}>
                  <BarSubFilter
                    tab={chatFilter}
                    changeTab={setChatFilter}
                    tab_list={tab_list}
                    resetValues={resetValues}
                    badge={badge}
                    isFixedColumns={true}
                  />
                </div>
              )}
              {chats?.length ? (
                <ScrollArea>
                  <div className={styles.all_chats}>
                    {chats?.map((card: IChatData, index: number) => (
                      <div
                        key={card?.order_id || card?.project_id || index}
                        onClick={() => handleChangeChat(card)}
                      >
                        <ChatCard
                          card={card}
                          isActive={
                            (!!orderId && card?.order_id === orderId) ||
                            (!!projectId && card?.project_id === projectId)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.content__right}>
              {currentChat ? (
                <>
                  <div className={styles.top}>
                    <div className={styles.info}>
                      <div className={styles.logo}>
                        {currentChat?.order_id ? (
                          <img src={currentChat?.avatar} alt="" />
                        ) : (
                          <div className={styles.icon}>
                            <CubeDevelopmentIcon />
                          </div>
                        )}
                      </div>
                      <div className={styles.description}>
                        <p className="truncate">
                          {currentChat.project_name
                            ? `${t("chat.campaign")} ${currentChat.project_name} ${!!currentChat?.channel_name ? `(${t("chat.channel")} ${currentChat?.channel_name})` : ""}`
                            : t("chat.types.administration")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChatMessages card={currentChat} />
                </>
              ) : (
                <div className={styles.chat__choose}>
                  <ChatChooseIcon />
                  <div className={styles.no_messages}>
                    <p>{t("chat.chat_choose")}</p>
                  </div>
                </div>
              )}
            </div>
            <AlertDialogCancel onClick={handleCloseChat} asChild>
              <CustomCloseButton className="translate-y-0 top-1" />
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer>
          <DrawerTrigger
            className={styles.trigger}
            onClick={() => setIsOpen(true)}
          >
            {isMain ? (
              <ChatMainIcon haveNewMessage={haveNewMessage} />
            ) : isProject ? (
              <ChatIcon2 className="active__icon" />
            ) : (
              <ChatIcon className="icon__white" />
            )}
            {isFull && toRole === ENUM_ROLES.BLOGGER && (
              <p>{t("chat.role.blogger")}</p>
            )}
            {isFull && toRole === ENUM_ROLES.MANAGER && (
              <p>{t("chat.role.manager")}</p>
            )}
            {isFull && toRole === ENUM_ROLES.ADVERTISER && (
              <p>{t("chat.role.advertiser")}</p>
            )}
          </DrawerTrigger>
          <DrawerContent showOverlay={false} className="blur_content">
            <div className={`${styles.content} ${styles.drawer}`}>
              <div
                className={`${styles.content__left} ${role !== ENUM_ROLES.BLOGGER ? styles.gridA : styles.gridB}`}
              >
                <DrawerTitle className={styles.title}>
                  <DrawerDescription
                    className={`gradient_color ${styles.description}`}
                  >
                    {t("chat.my_messages")}
                  </DrawerDescription>
                  <DrawerClose onClick={handleCloseChat} asChild>
                    <CustomCloseButton />
                  </DrawerClose>
                </DrawerTitle>
                {role !== ENUM_ROLES.BLOGGER && (
                  <div className={styles.filter}>
                    <BarSubFilter
                      tab={chatFilter}
                      changeTab={setChatFilter}
                      tab_list={tab_list}
                      resetValues={resetValues}
                      badge={badge}
                      isFixedColumns={true}
                    />
                  </div>
                )}
                {chats && chats?.length > 0 ? (
                  <ScrollArea>
                    <div className={styles.all_chats}>
                      {chats?.map((card, index) => (
                        <div
                          key={card?.order_id || card?.project_id || index}
                          onClick={() => handleChangeChat(card)}
                        >
                          <ChatCard
                            card={card}
                            isActive={
                              !!(
                                currentChat &&
                                (currentChat.type === CHAT_TYPE.ORDER
                                  ? currentChat.order_id === card?.order_id
                                  : currentChat.project_id === card?.project_id)
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <></>
                )}
              </div>
              <AnimatePresence>
                {currentChat && (
                  <motion.div
                    ref={chatRef} // Привязываем ref к блоку чата
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={PAGE_ANIMATION.sideTransition.transition}
                    variants={PAGE_ANIMATION.sideTransition}
                    className={styles.content__right}
                    drag={isDraggable ? "x" : false} // Включаем drag только если isDraggable === true
                    dragConstraints={{ left: 0, right: 0 }}
                    onTouchStart={(event) => handleTouchStart(event)} // Отслеживаем начало касания
                    onDragEnd={(event, info) => {
                      if (info.offset.x > 100) handleCloseChat(); // Закрыть чат, если свайп вправо больше 100px
                    }}
                  >
                    <div className={styles.top}>
                      <div className={styles.info}>
                        <div className={styles.logo}>
                          {currentChat?.order_id ? (
                            <img src={currentChat?.avatar} alt="" />
                          ) : (
                            <div className={styles.icon}>
                              <CubeDevelopmentIcon />
                            </div>
                          )}
                        </div>
                        <div className={styles.description}>
                          <p>
                            {currentChat.project_name
                              ? `${t("chat.campaign")} ${currentChat.project_name} ${!!currentChat?.channel_name ? `(${t("chat.channel")} ${currentChat?.channel_name})` : ""}`
                              : t("chat.types.administration")}
                          </p>
                        </div>
                      </div>
                      <div className={styles.arrow} onClick={handleCloseChat}>
                        <ArrowLongHorizontalIcon className="active__gradient__icon" />
                      </div>
                    </div>
                    <ChatMessages card={currentChat} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
