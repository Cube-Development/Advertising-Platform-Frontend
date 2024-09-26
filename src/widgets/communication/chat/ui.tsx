import {
  IChatProps,
  IOrderMessageAll,
  IOrderMessageNewSocket,
  RecipientType,
  chatTypesFilter,
  useGetOrderChatsQuery,
  useGetProjectChatsQuery,
} from "@entities/communication";
import { roles } from "@entities/user";
import { ChatCard, ChatMessages } from "@features/communication";
import { BarSubfilter } from "@features/other";
import {
  ArrowLongHorizontalIcon,
  CancelIcon2,
  ChatIcon,
  ChatIcon2,
  ChatMainIcon,
} from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { convertUTCToLocalDateTime } from "@shared/functions";
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
} from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCentrifuge } from "./CentrifugeContext";
import styles from "./styles.module.scss";

export const Chat: FC<IChatProps> = ({
  orderId,
  toRole,
  isMain,
  isProject,
  isFull,
}) => {
  const { t } = useTranslation();
  const role = Cookies.get("role")
    ? (Cookies.get("role") as roles)
    : roles.advertiser;

  const [chatFilter, setChatFilter] = useState<chatTypesFilter>(
    chatTypesFilter.blogger,
  );

  const isOrderCondition = (role: string, filter: string): boolean => {
    return (
      (role !== roles.blogger && filter === chatTypesFilter.blogger) ||
      role === roles.blogger
    );
  };

  const [isOrder, setIsOrder] = useState<boolean>(
    isOrderCondition(role, chatFilter),
  );

  const { data: chatsOrder } = useGetOrderChatsQuery(
    { role: role },
    { skip: role !== roles.blogger && chatFilter !== chatTypesFilter.blogger },
  );

  const { data: chatsProject } = useGetProjectChatsQuery(
    { role: role },
    { skip: role === roles.blogger || chatFilter === chatTypesFilter.blogger },
  );

  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [allChats, setAllChats] = useState<IOrderMessageAll[]>(
    chatsOrder || chatsProject || [],
  );

  const [currentChat, setCurrentChat] = useState<IOrderMessageAll | null>(null);

  useEffect(() => {
    setIsOrder(isOrderCondition(role, chatFilter));
  }, [role, chatFilter]);

  const { OrderMessageNewChat } = useCentrifuge();

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (chatsOrder) {
      const Chats = chatsOrder.map((item) => {
        const datetime = convertUTCToLocalDateTime(
          item.message_date,
          item.message_time,
        );
        return {
          ...item,
          message_date: datetime.localDate,
          message_time: datetime.localTime,
        };
      });
      setAllChats(Chats);
    }
  }, [chatsOrder]);

  useEffect(() => {
    if (chatsProject) {
      const Chats = chatsProject.map((item) => {
        const datetime = convertUTCToLocalDateTime(
          item.message_date,
          item.message_time,
        );
        return {
          ...item,
          message_date: datetime.localDate,
          message_time: datetime.localTime,
        };
      });
      setAllChats(Chats);
    }
  }, [chatsProject]);

  const handleChangeChat = (id: string) => {
    setCurrentChat(
      isOrder
        ? allChats.find((item) => item.order_id === id) || null
        : allChats.find((item) => item.project_id === id) || null,
    );
  };

  const handle = () => {};

  const handleCloseChat = () => {
    setCurrentChat(null);
  };

  const handleNewMessage = (message: IOrderMessageNewSocket) => {
    setAllChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.order_id === message.order_id) {
          const datetime = convertUTCToLocalDateTime(
            message.message_date,
            message.message_time,
          );
          return {
            ...chat,
            message_date: datetime.localDate,
            message_time: datetime.localTime,
            last_message: message.message,
            unread_count:
              message.recipient === RecipientType.receiver
                ? chat.unread_count + 1
                : chat.unread_count,
          };
        }
        return chat;
      }),
    );
  };

  OrderMessageNewChat(handleNewMessage);

  const divVariants = {
    close: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: "0%" },
    transition: { transition: { duration: 0.5 } },
  };
  const NEW_MESSAGE = true;
  return (
    <div className={styles.wrapper}>
      {screen >= BREAKPOINT.MD ? (
        <AlertDialog>
          <AlertDialogTrigger className={styles.chat}>
            {isMain ? (
              <ChatMainIcon haveNewMessage={true} />
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
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className={styles.content}>
              <div className={styles.content__left}>
                <div className={styles.left}>
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
                  {allChats.length ? (
                    <div className={styles.all_chats}>
                      {allChats.map((card, index) => (
                        <ChatCard
                          key={index}
                          card={card}
                          isActive={
                            isOrder
                              ? currentChat?.order_id === card.order_id
                              : currentChat?.project_id === card.project_id
                          }
                          isOrder={isOrder}
                          onChange={handleChangeChat}
                        />
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {currentChat ? (
                <div className={styles.content__right}>
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
                  <ChatMessages
                    id={
                      isOrder ? currentChat.order_id! : currentChat.project_id!
                    }
                    isOrder={isOrder}
                  />
                </div>
              ) : (
                <></>
              )}
              {/* <ChatMessages order_id={"771b2798-4cf8-4efc-a745-d59cab14e56d"} /> */}
              <AlertDialogCancel>
                <div className={styles.close} onClick={handleCloseChat}>
                  <CancelIcon2 />
                </div>
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer>
          <DrawerTrigger className={styles.chat}>
            {isMain ? (
              <ChatMainIcon />
            ) : // <ChatIcon className="active__icon" />
            isProject ? (
              <ChatIcon2 className="active__icon" />
            ) : (
              // <ChatIcon className="active__icon" />
              <ChatIcon className="icon__white" />
            )}
            {toRole === roles.blogger && <p>{t("chat.role.blogger")}</p>}
            {toRole === roles.manager && <p>{t("chat.role.manager")}</p>}
            {toRole === roles.advertiser && <p>{t("chat.role.advertiser")}</p>}
          </DrawerTrigger>
          <DrawerContent>
            <div className={styles.content}>
              <div className={styles.content__left}>
                <div className={styles.left}>
                  <p className={styles.title}>{t("chat.my_messages")}</p>
                  <div className={styles.filter}>
                    <BarSubfilter
                      page={pageFilter.chat}
                      resetValues={handle}
                      chatFilter={chatFilter}
                      changeChatFilter={setChatFilter}
                    />
                  </div>
                  {allChats.length ? (
                    <div className={styles.all_chats}>
                      {allChats.map((card, index) => (
                        <ChatCard
                          key={index}
                          card={card}
                          isActive={
                            isOrder
                              ? currentChat?.order_id === card.order_id
                              : currentChat?.project_id === card.project_id
                          }
                          isOrder={isOrder}
                          onChange={handleChangeChat}
                        />
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
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
                    <ChatMessages
                      id={
                        isOrder
                          ? currentChat.order_id!
                          : currentChat.project_id!
                      }
                      isOrder={isOrder}
                    />
                    <div className={styles.arrow} onClick={handleCloseChat}>
                      <ArrowLongHorizontalIcon className="icon__grey" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <DrawerClose>
                <div className={styles.close} onClick={handleCloseChat}>
                  <CancelIcon2 />
                </div>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
