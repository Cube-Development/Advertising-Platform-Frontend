import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IChat } from "@shared/types/chat";

interface ChatCardProps {
  card: IChat;
  isActive: boolean;
  onChange: (card: IChat) => void;
}

export const ChatCard: FC<ChatCardProps> = ({ card, isActive, onChange }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.channel} ${isActive ? styles.active : ""}`}
      onClick={() => onChange(card)}
    >
      <div className={styles.info}>
        <div className={styles.logo}>
          <div>
            <img src={card.avatar} alt="" />
          </div>
        </div>
        <div className={styles.description}>
          <p>
            {t("chat.campaign")} "{card.campaign}" ({t("chat.channel")}{" "}
            {card.name})
          </p>
          <span>{card.messages[card.messages.length - 1].message}</span>
        </div>
      </div>

      <div className={styles.date}>
        <p>{card.messages[card.messages.length - 1].date}</p>
      </div>
    </div>
  );
};
