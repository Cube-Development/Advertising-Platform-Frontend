import { IOrderMessageAll } from "@shared/types/chat";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChatCardProps {
  card: IOrderMessageAll;
  isActive: boolean;
  onChange: (order_id: string) => void;
}

export const ChatCard: FC<ChatCardProps> = ({ card, isActive, onChange }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.channel} ${isActive ? styles.active : ""}`}
      onClick={() => onChange(card.order_id)}
    >
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card.avatar} alt="" />
        </div>
        <div className={styles.description}>
          <p>
            {t("chat.campaign")} "{card.project_name}" ({t("chat.channel")}{" "}
            {card.channel_name})
          </p>
          <span>{card.last_message}</span>
        </div>
      </div>

      <div className={styles.date}>
        <p>{card.message_time}</p>
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
