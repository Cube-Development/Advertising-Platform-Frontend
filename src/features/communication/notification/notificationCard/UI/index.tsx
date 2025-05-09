import { INotificationCard } from "@entities/communication";
import { BagIcon } from "@shared/assets";
import { FC } from "react";
import styles from "./styles.module.scss";

interface NotificationCardProps {
  card: INotificationCard;
}

export const NotificationCard: FC<NotificationCardProps> = ({ card }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(card?.text, "text/html");
  const h2Text = doc.querySelector("h2.title")?.textContent?.trim();

  const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, " ");
  return (
    <div
      className={`${styles.wrapper} ${!card?.is_read ? styles.isUnread : ""}`}
    >
      <div className={styles.icon}>
        <BagIcon
          className={`${card?.is_read ? "icon__grey2" : "active__icon"}`}
        />
      </div>
      <div className={styles.text__wrapper}>
        <p className={`${styles.title} truncate`}>{h2Text}</p>
        <span className={styles.text}>{stripHtml(card?.text || "")}</span>
      </div>
      <div className={styles.info}>
        <span>{card?.formatted_date}</span>
        <span>{card?.formatted_time}</span>
      </div>
    </div>
  );
};
