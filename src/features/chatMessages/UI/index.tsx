import { FC, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { IChat } from "@shared/types/chat";
import { chatRoles } from "@shared/config/roles";
import { useTranslation } from "react-i18next";
import { animateScroll } from "react-scroll";

interface ChatMessagesProps {
  card: IChat;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ card }) => {
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [card.messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      animateScroll.scrollToBottom({
        containerId: "all__messages",
        smooth: true,
      });
    }
  };

  let currentDate: string | null = null;

  return (
    <div className={styles.wrapper}>
      <div id="all__messages" className={styles.all__messages}>
        {card.messages.map((message, index) => (
          <div key={index} className={styles.messages_wrapper}>
            {message.date !== currentDate &&
              ((currentDate = message.date),
              (
                <div className={styles.date}>
                  <p>{message.date}</p>
                </div>
              ))}

            <div
              className={`${styles.row__message} ${
                message.type === chatRoles.recipient
                  ? styles.recipient
                  : styles.sender
              }`}
              key={index}
            >
              <div
                className={`${styles.message} ${
                  message.type === chatRoles.recipient
                    ? styles.recipient
                    : styles.sender
                }`}
              >
                <p>{message.message}</p>
                <span>{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Реф для прокрутки вниз */}
      <div ref={messagesEndRef} />
    </div>
  );
};
