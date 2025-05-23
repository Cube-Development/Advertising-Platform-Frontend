import { IChatData, getDateChat } from "@entities/communication";
import { CubeDevelopmentIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChatCardProps {
  card: IChatData;
  isActive: boolean;
}

export const ChatCard: FC<ChatCardProps> = ({ card, isActive }) => {
  const { t } = useTranslation();
  const dateTime = getDateChat(card?.formatted_date, card?.formatted_time);

  const cleanMessage = (message: string) => {
    // console.log("Before cleaning:", message);
    // let cleanedMessage = message;
    let cleanedMessage = message.replace(/<br\s*\/?>/g, " ");
    cleanedMessage = cleanedMessage.replace(/<\/?strong>/g, "");
    cleanedMessage = cleanedMessage.replace(/<\/?p>/g, "");
    cleanedMessage = cleanedMessage.replace(/<\/?em>/g, "");
    // console.log("After cleaning:", cleanedMessage);
    // return `<p>${cleanedMessage}</p>`;
    return cleanedMessage;
  };
  return (
    <div
      className={`${styles.channel} ${isActive ? styles.active : card?.unread_count ? styles.unread : ""}`}
    >
      <div className={styles.info}>
        <div className={styles.logo}>
          {card?.order_id ? (
            <img src={card?.avatar} alt="" />
          ) : (
            <div className={styles.icon}>
              <CubeDevelopmentIcon />
            </div>
          )}
        </div>
        <div className={styles.description}>
          <p className={styles.title}>
            {`${t("chat.campaign")} ${card?.project_name} ${!!card?.channel_name ? `(${t("chat.channel")} ${card?.channel_name})` : ""}`}
          </p>
          <span className={`${styles.text} truncate`}>
            {cleanMessage(card?.last_message || "") || ""}
          </span>
        </div>
      </div>

      <div className={styles.date}>
        <p>{dateTime}</p>
        {card?.unread_count ? (
          <div className={styles.unread}>
            <span>{card?.unread_count}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
