import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { IChat } from "@shared/types/chat";
import { chatRoles } from "@shared/config/roles";
import { useTranslation } from "react-i18next";

interface ChatMessagesProps {
  card: IChat;
}

export const ChatMessages: FC<ChatMessagesProps> = ({ card }) => {
  const { t } = useTranslation();
  //   const [currentDate, setCurrentDate] = useState<string | null>(null);
  let currentDate: string | null = null;

  //   const handleOnChange = (date: string) => {
  //     setCurrentDate(date);
  //     console.log(date)
  //   };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <div>
            <img src={card.avatar} alt="" />
          </div>
        </div>
        <div className={styles.description}>
          <p>
            {card.campaign
              ? `${t("chat.campaign")} ${card.campaign} (${t("chat.channel")} ${card.name})`
              : t("chat.types.administration")}
          </p>
        </div>
      </div>
      <div className={styles.all__messages}>
        {card.messages.map((message, index) => (
          <>
            {message.date !== currentDate &&
              ((currentDate = message.date),
              (
                <div className={styles.date}>
                  <p>{message.date}</p>
                </div>
              ))}

            <div
              className={`${styles.row__message} ${message.type === chatRoles.recipient ? styles.recipient : styles.sender}`}
              key={index}
            >
              <div
                className={`${styles.message} ${message.type === chatRoles.recipient ? styles.recipient : styles.sender}`}
              >
                <p>{message.message}</p>
                <span>{message.time}</span>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
