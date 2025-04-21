import {
  chatAPI,
  chatType,
  chatTypesFilter,
  IChatData,
  IChatProps,
  IMessageNewSocket,
  MessageStatus,
  RecipientType,
  useGetOrderChatByIdQuery,
  useGetOrderChatsQuery,
  useGetProjectChatByIdQuery,
  useGetProjectChatsQuery,
} from "@entities/communication";
import { roles } from "@entities/user";
import { ChatCard, ChatMessages } from "@features/communication";
import { BarSubfilter } from "@features/other";
import { useCentrifuge } from "@shared/api";
import {
  ArrowLongHorizontalIcon,
  CancelIcon2,
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
import { pageFilter } from "@shared/routing";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  const [chatFilter, setChatFilter] = useState<chatTypesFilter>(
    chatTypesFilter.blogger,
  );

  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const [newProjectId, setNewProjectId] = useState<string | null>(null);

  // All chats
  const { data: chatsOrder } = useGetOrderChatsQuery({ role: role });

  const { data: chatsProject } = useGetProjectChatsQuery(
    { role: role },
    { skip: role === roles.blogger },
  );

  // Checking existing current chat in all chats
  const currentChatOrder = useMemo(() => {
    if (!orderId) return null;
    return chatsOrder?.find((item) => item?.order_id === orderId) || null;
  }, [chatsOrder, orderId]);

  const currentChatProject = useMemo(() => {
    if (!projectId) return null;
    return chatsProject?.find((item) => item?.project_id === projectId) || null;
  }, [chatsProject, projectId]);

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

  const selectedChats =
    chatFilter === chatTypesFilter.blogger || role === roles.blogger
      ? chatsOrder
      : chatsProject;

  const countOrderMessage =
    chatsOrder?.reduce(
      (total, item) =>
        total +
        (item.recipient === RecipientType.receiver ? item.unread_count : 0),
      0,
    ) || 0;

  const countProjectMessage =
    chatsProject?.reduce(
      (total, item) =>
        total +
        (item.recipient === RecipientType.receiver ? item.unread_count : 0),
      0,
    ) || 0;

  const haveNewMessage = !!(countOrderMessage + countProjectMessage);

  const handleChangeChat = (card: IChatData) => {
    setCurrentChat(
      card?.type === chatType.order
        ? chatsOrder?.find((item) => item?.order_id === card?.order_id) || null
        : chatsProject?.find((item) => item?.project_id === card?.project_id) ||
            null,
    );
  };

  const handle = () => {
    setCurrentChat(null);
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
    setIsOpen(false);
  };

  const checkOrderExist = (messageOrderId: string) => {
    const condition = !chatsOrder?.find(
      (item) => item?.order_id === messageOrderId,
    );
    if (condition) {
      setNewOrderId(messageOrderId);
    }
  };
  const checkProjectExist = (messageProjectId: string) => {
    const condition = !chatsProject?.find(
      (item) => item?.project_id === messageProjectId,
    );
    if (condition) {
      setNewProjectId(messageProjectId);
    }
  };

  const handleNewMessage = (message: IMessageNewSocket) => {
    const datetime = convertUTCToLocalDateTime(
      message?.created_date!,
      message?.created_time!,
    );
    const newMessage = {
      formatted_date: datetime.localDate,
      formatted_time: datetime.localTime,
      last_message: message?.message,
      message_datetime: message.created_date + " " + message.created_time,
    };
    if (message?.order_id && chatsOrder) {
      checkOrderExist(message?.order_id);
      const updatedChat = chatsOrder?.find(
        (chat) => chat?.order_id === message?.order_id,
      );

      if (updatedChat) {
        const updatedChatWithNewData = {
          ...updatedChat,
          ...newMessage,
          unread_count:
            message?.recipient === RecipientType.receiver
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
          message?.recipient === RecipientType.receiver &&
          currentChat?.order_id !== message?.order_id
        ) {
          toast({
            variant: "default",
            title: t("toasts.websocket.new_message"),
          });
        }
      }
    } else if (message?.project_id && chatsProject) {
      checkProjectExist(message?.project_id);
      const updatedChat = chatsProject?.find(
        (chat) => chat?.project_id === message?.project_id,
      );

      if (updatedChat) {
        const updatedChatWithNewData = {
          ...updatedChat,
          ...newMessage,
          unread_count:
            message?.recipient === RecipientType.receiver
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
          message?.recipient === RecipientType.receiver &&
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
                  status: MessageStatus.read,
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
                  status: MessageStatus.read,
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
      setChatFilter(chatTypesFilter.blogger);
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
        role === roles.advertiser
          ? chatTypesFilter.manager
          : chatTypesFilter.advertiser,
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
    role === roles.advertiser
      ? [
          { status: chatTypesFilter.blogger, count: countOrderMessage },
          { status: chatTypesFilter.manager, count: countProjectMessage },
        ]
      : role === roles.manager
        ? [
            { status: chatTypesFilter.blogger, count: countOrderMessage },
            { status: chatTypesFilter.advertiser, count: countProjectMessage },
          ]
        : [];

  return (
    <div className={styles.wrapper}>
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
            {isFull && toRole === roles.blogger && (
              <p>{t("chat.role.blogger")}</p>
            )}
            {isFull && toRole === roles.manager && (
              <p>{t("chat.role.manager")}</p>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent className={`${styles.content} ${styles.dialog}`}>
            <div
              className={`${styles.content__left} ${role !== roles.blogger ? styles.gridA : styles.gridB}`}
            >
              <AlertDialogTitle className={styles.title}>
                <p className="gradient_color">{t("chat.my_messages")}</p>
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only"></AlertDialogDescription>
              {role !== roles.blogger && (
                <div className={styles.filter}>
                  <BarSubfilter
                    page={pageFilter.chat}
                    resetValues={handle}
                    chatFilter={chatFilter}
                    changeChatFilter={setChatFilter}
                    badge={badge}
                    isFixedColumns={true}
                  />
                </div>
              )}
              {selectedChats?.length ? (
                <ScrollArea>
                  <div className={styles.all_chats}>
                    {selectedChats?.map((card, index) => (
                      <div
                        key={card?.order_id || card?.project_id || index}
                        onClick={() => handleChangeChat(card)}
                      >
                        <ChatCard
                          card={card}
                          isActive={
                            !!(
                              currentChat &&
                              (currentChat.type === chatType.order
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
            <AlertDialogCancel>
              <div className={styles.close} onClick={handleCloseChat}>
                <CancelIcon2 />
              </div>
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
            {isFull && toRole === roles.blogger && (
              <p>{t("chat.role.blogger")}</p>
            )}
            {isFull && toRole === roles.manager && (
              <p>{t("chat.role.manager")}</p>
            )}
            {isFull && toRole === roles.advertiser && (
              <p>{t("chat.role.advertiser")}</p>
            )}
          </DrawerTrigger>
          <DrawerContent>
            <div className={`${styles.content} ${styles.drawer}`}>
              <div
                className={`${styles.content__left} ${role !== roles.blogger ? styles.gridA : styles.gridB}`}
              >
                <DrawerTitle className={styles.title}>
                  <DrawerDescription
                    className={`gradient_color ${styles.description}`}
                  >
                    {t("chat.my_messages")}
                  </DrawerDescription>
                  <DrawerClose>
                    <div className={styles.close} onClick={handleCloseChat}>
                      <CancelIcon2 />
                    </div>
                  </DrawerClose>
                </DrawerTitle>
                {role !== roles.blogger && (
                  <div className={styles.filter}>
                    <BarSubfilter
                      page={pageFilter.chat}
                      resetValues={handle}
                      chatFilter={chatFilter}
                      changeChatFilter={setChatFilter}
                      badge={badge}
                      isFixedColumns={true}
                    />
                  </div>
                )}
                {selectedChats?.length ? (
                  <ScrollArea>
                    <div className={styles.all_chats}>
                      {selectedChats?.map((card, index) => (
                        <div
                          key={card?.order_id || card?.project_id || index}
                          onClick={() => handleChangeChat(card)}
                        >
                          <ChatCard
                            card={card}
                            isActive={
                              !!(
                                currentChat &&
                                (currentChat.type === chatType.order
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
