import { getDateChat } from "@shared/functions/checkDate";
import { IOrderMessageAll } from "@shared/types/chat";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChatCardProps {
  card: IOrderMessageAll;
  isActive: boolean;
  isOrder: boolean;
  onChange: (id: string) => void;
}

export const ChatCard: FC<ChatCardProps> = ({
  card,
  isActive,
  isOrder,
  onChange,
}) => {
  const { t } = useTranslation();
  const dateTime = getDateChat(card.message_date, card.message_time);

  const cleanMessage = (message: string) => {
    console.log("Before cleaning:", message);
    let cleanedMessage = message.replace(/<br\s*\/?>/g, " ");
    cleanedMessage = cleanedMessage.replace(/<\/?strong>/g, "");
    cleanedMessage = cleanedMessage.replace(/<\/?p>/g, "");
    cleanedMessage = cleanedMessage.replace(/<\/?em>/g, "");
    console.log("After cleaning:", cleanedMessage);
    return `<p>${cleanedMessage}</p>`;
  };

  return (
    <div
      className={`${styles.channel} ${isActive ? styles.active : ""}`}
      onClick={() => onChange(isOrder ? card.order_id! : card.project_id!)}
    >
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card.avatar} alt="" />
        </div>
        <div className={styles.description}>
          <p className={styles.title}>
            {t("chat.campaign")} "{card.project_name}" ({t("chat.channel")}{" "}
            {card.channel_name})
          </p>
          <span
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: cleanMessage(card.last_message) || "",
            }}
          ></span>
        </div>
      </div>

      <div className={styles.date}>
        <p>{dateTime}</p>
        {card.unread_count ? (
          <div className={styles.unread}>
            <span>{card.unread_count}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
