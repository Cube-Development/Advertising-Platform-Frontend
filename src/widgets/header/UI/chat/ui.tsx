import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { ChatCard } from "@features/chatCard";
import { ChatMessages } from "@features/chatMessages";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { ArrowLongHorizontalIcon, CancelIcon2, ChatIcon } from "@shared/assets";
import { RecipientType } from "@shared/config/chat";
import { BREAKPOINT } from "@shared/config/common";
import { pageFilter } from "@shared/config/pageFilter";
import { convertUTCToLocalDateTime } from "@shared/functions/convertUTCToLocalTime";
import { useAppSelector } from "@shared/store";
import { useGetAllChatsQuery } from "@shared/store/services/chatService";
import { IOrderMessageAll, IOrderMessageNewSocket } from "@shared/types/chat";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@shared/ui/shadcn-ui/ui/drawer";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCentrifuge } from "./CentrifugeContext";
import styles from "./styles.module.scss";

export const Chat: FC = () => {
  const { t } = useTranslation();
  const { data: chats } = useGetAllChatsQuery({
    role: Cookies.get("role")!,
  });
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [allChats, setAllChats] = useState<IOrderMessageAll[]>(chats || []);
  const [currentChat, setCurrentChat] = useState<IOrderMessageAll | null>(null);
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
    if (chats) {
      const Chats = chats.map((item) => {
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
  }, [chats]);

  const handleChangeChat = (order_id: string) => {
    setCurrentChat(allChats.find((item) => item.order_id === order_id) || null);
  };

  const { chatFilter: filter } = useAppSelector((state) => state.filter);

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

  console.log(allChats);
  return (
    <div>
      {screen >= BREAKPOINT.MD ? (
        <AlertDialog>
          <AlertDialogTrigger className={styles.chat}>
            <ChatIcon />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className={styles.content}>
              <div className={styles.content__left}>
                <div className={styles.left}>
                  <p className={styles.title}>{t("chat.my_messages")}</p>
                  <div className={styles.filter}>
                    <BarProfileFilter
                      page={pageFilter.chat}
                      resetValues={handle}
                    />
                  </div>
                  {allChats.length ? (
                    <div className={styles.all_chats}>
                      {allChats.map((card, index) => (
                        <ChatCard
                          key={index}
                          card={card}
                          isActive={currentChat?.order_id === card.order_id}
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
                  <ChatMessages order_id={currentChat.order_id} />
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
            <ChatIcon />
          </DrawerTrigger>
          <DrawerContent>
            <div className={styles.content}>
              <div className={styles.content__left}>
                <div className={styles.left}>
                  <p className={styles.title}>{t("chat.my_messages")}</p>
                  <div className={styles.filter}>
                    <BarProfileFilter
                      page={pageFilter.chat}
                      resetValues={handle}
                    />
                  </div>
                  {allChats.length ? (
                    <div className={styles.all_chats}>
                      {allChats.map((card, index) => (
                        <ChatCard
                          key={index}
                          card={card}
                          isActive={currentChat?.order_id === card.order_id}
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
                    <ChatMessages order_id={currentChat.order_id} />
                    <div className={styles.arrow} onClick={handleCloseChat}>
                      <ArrowLongHorizontalIcon className="default__icon__grey" />
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
