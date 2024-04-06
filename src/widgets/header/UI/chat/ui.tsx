import { CancelIcon2, ChatIcon } from "@shared/assets";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ChatCard } from "@features/chatCard";
import { ChatMessages } from "@features/chatMessages";
import { IChat, IMessage } from "@shared/types/chat";
import { SendMessage } from "@features/sendMessage";
import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { pageFilter } from "@shared/config/pageFilter";
import { useAppSelector } from "@shared/store";
import { chatFilter } from "@shared/config/chatFilter";

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

  const [chats, setChats] = useState<IChat[]>(AllChats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null);
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangeChat = (chat: IChat) => {
    setCurrentChat(chat);
  };

  const handleAddMessage = (message: IMessage) => {
    let newChat: IChat = currentChat!;
    newChat!.messages.push(message);
    setChats([newChat, ...chats.filter((chat) => chat !== currentChat)]);
  };

  const { chatFilter: filter } = useAppSelector((state) => state.filterReducer);

  const handle = () => {
    if (filter === chatFilter.blogger) {
      setChats(ManagerChats);
    } else if (filter === chatFilter.manager) {
      setChats(AllChats);
    }
  };

  return (
    <div>
      <button className={styles.chat} onClick={handleOpenModal}>
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
                {chats.map((card, index) => (
                  <ChatCard
                    key={index}
                    card={card}
                    isActive={currentChat === card}
                    onChange={handleChangeChat}
                  />
                ))}
              </div>
              <div
                className={styles.administration}
                onClick={() => handleChangeChat(AdministrationChat)}
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
                        {currentChat.campaign
                          ? `${t("chat.campaign")} ${currentChat.campaign} (${t("chat.channel")} ${currentChat.name})`
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
                  <ChatMessages card={currentChat} />
                  <SendMessage onChange={handleAddMessage} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
