import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { ChatCard } from "@features/chatCard";
import { ChatMessages } from "@features/chatMessages";
import { CancelIcon2, ChatIcon } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import { IOrderMessageAll, IOrderMessageNewSocket } from "@shared/types/chat";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useCentrifuge } from "./CentrifugeContext";
import { RecipientType } from "@shared/config/chat";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useGetAllChatsQuery } from "@shared/store/services/chatService";
import Cookies from "js-cookie";
import { convertUTCToLocalDateTime } from "@shared/functions/convertUTCToLocalTime";

const AdministrationChat = {
  id: "999",
  name: "Administration",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
  messages: [
    {
      type: "sender",
      message:
        "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
      date: "28.03.2024",
      time: "18:00",
    },
    {
      type: "recipient",
      message:
        "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
      date: "28.03.2024",
      time: "18:02",
    },

    {
      type: "sender",
      message:
        "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
      date: "28.03.2024",
      time: "18:10",
    },
    {
      type: "sender",
      message: "Lorem ipsum dolor sit amet consectetur.",
      date: "28.03.2024",
      time: "18:12",
    },
    {
      type: "sender",
      message:
        "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
      date: "29.03.2024",
      time: "15:00",
    },
    {
      type: "sender",
      message: "Lorem ipsum dolor ",
      date: "29.03.2024",
      time: "15:05",
    },
    {
      type: "recipient",
      message:
        "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
      date: "28.03.2024",
      time: "18:02",
    },
    {
      type: "recipient",
      message:
        "Lorem ipsum dolor sit amet consectetur.m dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
      date: "28.03.2024",
      time: "18:12",
    },
  ],
};

const AllChats = [
  {
    id: "1",
    campaign: "Cubinc",
    name: "UzNews",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "2",
    campaign: "Cubinc111",
    name: "UzNews33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "3",
    campaign: "Cubinc244r",
    name: "UzNews24erwe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "4",
    campaign: "Cubinc4242",
    name: "UzNews24242",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "5",
    campaign: "Cubinc333",
    name: "UzNews55",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "6",
    campaign: "Cubinc4",
    name: "UzNews3",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "7",
    campaign: "Cubinc2",
    name: "UzNews2",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
];

const ManagerChats = [
  {
    id: "100",
    campaign: "Cubinc111",
    name: "UzNews33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },

  {
    id: "101",
    campaign: "Cubinc4242",
    name: "UzNews24242",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
  {
    id: "102",
    campaign: "Cubinc333",
    name: "UzNews55",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUn5R4bj-U1l4KNlIOqSwdtK_cXYk6tyMfGBTlEXOew&s",
    messages: [
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:00",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },

      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:10",
      },
      {
        type: "sender",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit ame",
        date: "28.03.2024",
        time: "18:12",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "29.03.2024",
        time: "15:00",
      },
      {
        type: "sender",
        message: "Lorem ipsum dolor ",
        date: "29.03.2024",
        time: "15:05",
      },
      {
        type: "recipient",
        message: "Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:02",
      },
      {
        type: "recipient",
        message:
          "Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.",
        date: "28.03.2024",
        time: "18:12",
      },
    ],
  },
];

export const Chat: FC = () => {
  const { t } = useTranslation();
  const { data: chats } = useGetAllChatsQuery({
    role: Cookies.get("role")!,
  });
  console.log("chats", chats);

  const [allChats, setAllChats] = useState<IOrderMessageAll[]>(chats || []);
  const [currentChat, setCurrentChat] = useState<IOrderMessageAll | null>(null);
  const { OrderMessageNewChat } = useCentrifuge();

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

  const handle = () => {
    // if (filter === chatFilter.blogger) {
    //   setChats(ManagerChats);
    // } else if (filter === chatFilter.manager) {
    //   setChats(AllChats);
    // }
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
  };

  const handleNewMessage = (message: IOrderMessageNewSocket) => {
    setAllChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.order_id === message.order_id) {
          return {
            ...chat,
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

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className={styles.chat}>
            <ChatIcon />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className={styles.modal}>
            <div className={styles.content}>
              <div className={styles.content__left}>
                <big>{t("chat.my_messages")}</big>
                <div className={styles.filter}>
                  <BarProfileFilter
                    page={pageFilter.chat}
                    resetValues={handle}
                  />
                </div>
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
                <div
                  className={styles.administration}
                  // onClick={() => handleChangeChat(AdministrationChat)}
                >
                  <div>
                    <img src={AdministrationChat.avatar} alt="" />
                  </div>
                  <p>{t("chat.types.administration")}</p>
                </div>
              </div>
              <div className={styles.content__right}>
                <div className={styles.top}>
                  {currentChat ? (
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
                  ) : (
                    <div></div>
                  )}
                  <AlertDialogCancel>
                    <div className={styles.close} onClick={handleCloseChat}>
                      <CancelIcon2 />
                    </div>
                  </AlertDialogCancel>
                </div>

                {currentChat && (
                  <ChatMessages order_id={currentChat.order_id} />
                )}
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* <button className={styles.chat} onClick={handleOpenModal}>
        <ChatIcon />
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.content}>
            <div className={styles.content__left}>
              <big>{t("chat.my_messages")}</big>
              <div className={styles.filter}>
                <BarProfileFilter page={pageFilter.chat} resetValues={handle} />
              </div>
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
              <div
                className={styles.administration}
                // onClick={() => handleChangeChat(AdministrationChat)}
              >
                <div>
                  <img src={AdministrationChat.avatar} alt="" />
                </div>
                <p>{t("chat.types.administration")}</p>
              </div>
            </div>
            <div className={styles.content__right}>
              <div className={styles.top}>
                {currentChat && (
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
                )}
                <button onClick={handleOpenModal}>
                  <CancelIcon2 />
                </button>
              </div>

              {currentChat && (
                <>
                  <ChatMessages order_id={currentChat.order_id} />
                </>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
