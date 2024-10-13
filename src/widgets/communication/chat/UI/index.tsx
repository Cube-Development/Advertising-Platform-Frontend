import {
  IChatProps,
  IChatData,
  IMessageNewSocket,
  MeesageSendType,
  chatType,
  RecipientType,
  chatTypesFilter,
  useGetOrderChatsQuery,
  useGetProjectChatsQuery,
  chatAPI,
  MessageStatus,
} from "@entities/communication";
import { roles } from "@entities/user";
import { ChatCard, ChatMessages } from "@features/communication";
import { BarSubfilter } from "@features/other";
import {
  ArrowLongHorizontalIcon,
  CancelIcon2,
  ChatChooseIcon,
  ChatIcon,
  ChatIcon2,
  ChatMainIcon,
} from "@shared/assets";
import { BREAKPOINT, INTERSECTION_ELEMENTS } from "@shared/config";
import {
  checkDatetime,
  checkDatetimeDifference,
  convertUTCToLocalDateTime,
} from "@shared/functions";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { pageFilter } from "@shared/routing";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  useToast,
} from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCentrifuge } from "../CentrifugeContext";
import styles from "./styles.module.scss";

export const Chat: FC<IChatProps> = ({
  orderId,
  toRole,
  isMain,
  isProject,
  isFull,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentChat, setCurrentChat] = useState<IChatData | null>(null);
  const [chatFilter, setChatFilter] = useState<chatTypesFilter>(
    chatTypesFilter.blogger,
  );

  const { data: chatsOrder } = useGetOrderChatsQuery(
    { role: role },
    { skip: role !== roles.blogger && chatFilter !== chatTypesFilter.blogger },
  );

  const { data: chatsProject } = useGetProjectChatsQuery(
    { role: role },
    { skip: role === roles.blogger || chatFilter === chatTypesFilter.blogger },
  );

  const { OrderMessageNewChat, OrderReadMessage } = useCentrifuge();

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangeChat = (card: IChatData) => {
    setCurrentChat(
      card?.type === chatType.order
        ? chatsOrder?.find((item) => item?.order_id === card?.order_id) || null
        : chatsOrder?.find((item) => item?.project_id === card?.project_id) ||
            null,
    );
  };

  const handle = () => {};

  const handleCloseChat = () => {
    setCurrentChat(null);
    setIsOpen(false);
  };

  const handleNewMessage = (message: IMessageNewSocket) => {
    if (message.order_id && chatsOrder) {
      const updatedChat = chatsOrder?.find(
        (chat) => chat?.order_id === message?.order_id,
      );

      if (updatedChat) {
        const datetime = convertUTCToLocalDateTime(
          message.message_date,
          message.message_time,
        );
        const updatedChatWithNewData = {
          ...updatedChat,
          message_date: datetime.localDate,
          message_time: datetime.localTime,
          last_message: message.message,
          unread_count:
            message.recipient === RecipientType.receiver
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
            title: t("toasts.websoket.new_message"),
          });
        }
      }
    }
  };

  const handleReadMessage = (message: IMessageNewSocket) => {
    const datetime = message?.message_date + " " + message?.message_time;
    console.log("READ READ READ");
    if (message?.order_id) {
      dispatch(
        chatAPI.util.updateQueryData(
          "getOrderHistory",
          { order_id: message?.order_id, batch: INTERSECTION_ELEMENTS.chat },
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

  const divVariants = {
    close: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: "0%" },
    transition: { transition: { duration: 0.5 } },
  };

  console.log("chatsOrder", chatsOrder);
  const haveNewMessage = Boolean(
    chatsOrder?.filter((item) => item.unread_count !== 0).length,
  );

  useEffect(() => {
    if (orderId && isOpen) {
      setCurrentChat(
        chatsOrder?.find((item) => item?.order_id === orderId) || null,
      );
    }
  }, [orderId, isOpen]);

  OrderMessageNewChat(handleNewMessage);
  OrderReadMessage(handleReadMessage);

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
            <div className={styles.content__left}>
              {/* <div className={styles.left}> */}
              <p className={styles.title}>{t("chat.my_messages")}</p>
              {role !== roles.blogger && (
                <div className={styles.filter}>
                  <BarSubfilter
                    page={pageFilter.chat}
                    resetValues={handle}
                    chatFilter={chatFilter}
                    changeChatFilter={setChatFilter}
                  />
                </div>
              )}
              {chatsOrder?.length ? (
                <div className={styles.all_chats}>
                  {chatsOrder.map((card, index) => (
                    <div key={index} onClick={() => handleChangeChat(card)}>
                      <ChatCard
                        card={card}
                        isActive={
                          (currentChat &&
                            (currentChat.type === chatType.order
                              ? currentChat.order_id === card?.order_id
                              : currentChat.project_id === card?.project_id)) ||
                          false
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* </div> */}
            <div className={styles.content__right}>
              {currentChat ? (
                <>
                  <div className={styles.top}>
                    <div className={styles.info}>
                      <div className={styles.logo}>
                        <div>
                          <img src={currentChat.avatar} alt="" />
                        </div>
                      </div>
                      <div className={styles.description}>
                        <p className="truncate">
                          {currentChat.project_name
                            ? `${t("chat.campaign")} ${currentChat.project_name} (${t("chat.channel")} ${currentChat.channel_name})`
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
              <ChatMainIcon />
            ) : // <ChatIcon className="active__icon" />
            isProject ? (
              <ChatIcon2 className="active__icon" />
            ) : (
              // <ChatIcon className="active__icon" />
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
          <DrawerContent className={`${styles.content} ${styles.drawer}`}>
            <DrawerClose>
              <div className={styles.close} onClick={handleCloseChat}>
                <CancelIcon2 />
              </div>
            </DrawerClose>
            <div className={styles.content__left}>
              <p className={styles.title}>{t("chat.my_messages")}</p>
              <div className={styles.filter}>
                <BarSubfilter
                  page={pageFilter.chat}
                  resetValues={handle}
                  chatFilter={chatFilter}
                  changeChatFilter={setChatFilter}
                />
              </div>
              {chatsOrder?.length ? (
                <div className={styles.all_chats}>
                  {chatsOrder.map((card, index) => (
                    <div key={index} onClick={() => handleChangeChat(card)}>
                      <ChatCard
                        card={card}
                        isActive={
                          (currentChat &&
                            (currentChat.type === chatType.order
                              ? currentChat.order_id === card?.order_id
                              : currentChat.project_id === card?.project_id)) ||
                          false
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <AnimatePresence>
              {currentChat && (
                <motion.div
                  initial="close"
                  animate="open"
                  exit="close"
                  transition={divVariants.transition}
                  variants={divVariants}
                  className={styles.content__right}
                >
                  <div className={styles.top}>
                    <div className={styles.info}>
                      <div className={styles.logo}>
                        <div>
                          <img src={currentChat.avatar} alt="" />
                        </div>
                      </div>
                      <div className={styles.description}>
                        <p>
                          {currentChat.project_name
                            ? `${t("chat.campaign")} ${currentChat.project_name} (${t("chat.channel")} ${currentChat.channel_name})`
                            : t("chat.types.administration")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChatMessages card={currentChat} />
                  <div className={styles.arrow} onClick={handleCloseChat}>
                    <ArrowLongHorizontalIcon className="icon__grey" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
