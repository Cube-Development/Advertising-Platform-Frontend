import { AddIcon } from "@shared/assets";
import { MessageStatus, RecipientType } from "@shared/config/chat";
import {
  IOrderMessageNewSocket,
  IOrderMessageSendSocket,
} from "@shared/types/chat";
import { useCentrifuge } from "@widgets/header/UI/chat/CentrifugeContext";
import { SendIcon } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { animateScroll } from "react-scroll";
import styles from "./styles.module.scss";
import { convertUTCToLocalDateTime } from "@shared/functions/convertUTCToLocalTime";
import { useGetChatHistoryQuery } from "@shared/store/services/chatService";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { getCurrentUtcDateTime } from "@shared/functions/getCurrentUtcDateTime";

interface ChatMessagesProps {
  order_id: string;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ order_id }) => {
  const { t } = useTranslation();
  const { OrderMessageSend, OrderMessageNew } = useCentrifuge();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentDateString = getCurrentUtcDateTime();
  console.log("currentDateString", currentDateString);
  const { data: history } = useGetChatHistoryQuery({
    order_id: order_id,
    batch: INTERSECTION_ELEMENTS.chat,
    message_date: currentDateString.date,
    message_time: currentDateString.time,
  });

  const [newMessage, setNewMessage] = useState<string>("");
  const [chat, setChat] = useState<IOrderMessageNewSocket[]>(history || []);

  useEffect(() => {
    if (history) {
      const reversedArray = [...history].reverse();
      const newHistory = reversedArray.map((item) => {
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
      setChat(newHistory);
    }
  }, [history]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      animateScroll.scrollToBottom({
        containerId: "all__messages",
        smooth: true,
      });
    }
  };

  let currentDate: string | null = null;

  const handleOnChange = (value: string) => {
    setNewMessage(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      const orderMessage: IOrderMessageSendSocket = {
        order_id: order_id,
        user_id: "35a547a1-6168-48de-9162-f9b89d7c5232",
        message: newMessage,
      };
      OrderMessageSend(orderMessage);
      const currentDate: Date = new Date();
      const year: number = currentDate.getFullYear();
      const month: number = currentDate.getMonth() + 1;
      const day: number = currentDate.getDate();
      const formattedDate: string = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      const hours: number = currentDate.getHours();
      const minutes: number = currentDate.getMinutes();
      const formattedTime: string = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      const orderMessageState: IOrderMessageNewSocket = {
        id: "12",
        order_id: order_id,
        message: newMessage,
        recipient: RecipientType.sender,
        message_date: formattedDate,
        message_time: formattedTime,
        status: MessageStatus.unread,
      };
      setChat([...chat, orderMessageState]);
      (document.getElementById("sendInput") as HTMLInputElement).value = "";
      setNewMessage("");
    }
  };

  const handleNewMessage = (message: IOrderMessageNewSocket) => {
    console.log("ChatMessages");
    if (
      message.order_id === order_id &&
      message.recipient === RecipientType.receiver
    ) {
      const datetime = convertUTCToLocalDateTime(
        message.message_date,
        message.message_time,
      );
      const newMessage: IOrderMessageNewSocket = {
        ...message,
        message_date: datetime.localDate,
        message_time: datetime.localTime,
      };
      setChat((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  OrderMessageNew(handleNewMessage);

  return (
    <>
      <div className={styles.wrapper}>
        <div id="all__messages" className={styles.check}>
          <div className={styles.all__messages}>
            {chat.map((message, index) => (
              <div key={index} className={styles.messages_wrapper}>
                {message.message_date !== currentDate &&
                  ((currentDate = message.message_date),
                  (
                    <div className={styles.date}>
                      <p>{message.message_date}</p>
                    </div>
                  ))}

                <div
                  className={`${styles.row__message} ${
                    message.recipient === RecipientType.receiver
                      ? styles.recipient
                      : styles.sender
                  }`}
                  key={index}
                >
                  <div
                    className={`${styles.message} ${
                      message.recipient === RecipientType.receiver
                        ? styles.recipient
                        : styles.sender
                    }`}
                  >
                    <p>{message.message}</p>
                    <span>{message.message_time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Реф для прокрутки вниз */}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.wrapper_bottom}>
        <button>
          <AddIcon />
        </button>
        <div className={styles.input}>
          <input
            id="sendInput"
            type="text"
            placeholder={t("chat.new_message")}
            onChange={(e) => handleOnChange(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button onClick={handleSendMessage}>
          <SendIcon />
        </button>
      </div>
    </>
  );
};
