import {
  INotificationCard,
  notificationsStatus,
} from "@entities/communication";
import { BagIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface NotificationCardProps {
  card: INotificationCard;
}

export const NotificationCard: FC<NotificationCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const title =
    notificationsStatus.find((item) => item.type === card?.data?.method)
      ?.name || "...";
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
        <p className={`${styles.title} truncate`}>{t(title)}</p>
        <span className={styles.text}>{card?.data?.text}</span>
      </div>
      <div className={styles.info}>
        <span>{card?.created_date}</span>
        <span>{card?.created_time}</span>
      </div>
    </div>
  );
};
