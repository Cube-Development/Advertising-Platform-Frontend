import { CancelIcon2, ChatIcon } from "@shared/assets";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ChatCard } from "@features/chatCard";
import { ChatMessages } from "@features/chatMessages";
import { IChat } from "@shared/types/chat";
import { SendMessage } from "@features/sendMessage";

const AdministrationChat = {
  name: "Administration",
  avatar:
    "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc",
    name: "UzNews",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc111",
    name: "UzNews33",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc244r",
    name: "UzNews24erwe",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc4242",
    name: "UzNews24242",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc333",
    name: "UzNews55",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc4",
    name: "UzNews3",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
    campaign: "Cubinc2",
    name: "UzNews2",
    avatar:
      "https://png.pngtree.com/background/20230611/original/pngtree-picture-of-a-blue-bird-on-a-black-background-picture-image_3124189.jpg",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<IChat | null>(null);
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangeChat = (chat: IChat) => {
    setCurrentChat(chat);
  };

  return (
    <div>
      <button className={styles.chat} onClick={handleOpenModal}>
        <ChatIcon />
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.content}>
              <div className={styles.content__left}>
                <big>{t("chat.my_messages")}</big>
                <div className={styles.all_chats}>
                  {AllChats.map((card, index) => (
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
                  <button onClick={handleOpenModal}>
                    <CancelIcon2 />
                  </button>
                </div>
                {currentChat && <ChatMessages card={currentChat} />}
                {currentChat && <SendMessage />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
