import {
  INotificationCard,
  notificationsStatus,
} from "@entities/communication";
import { ScrollArea } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface NotificationMessageProps {
  card: INotificationCard;
}

export const NotificationMessage: FC<NotificationMessageProps> = ({ card }) => {
  const { t } = useTranslation();
  const title =
    notificationsStatus.find((item) => item.type === card?.method)?.name ||
    "...";
  return (
    <div className={styles.wrapper}>
      <ScrollArea>
        <div className={styles.text__wrapper}>
          <p className={styles.title}>{t(title)}</p>
          <span dangerouslySetInnerHTML={{ __html: card?.data?.text || "" }} />
        </div>
      </ScrollArea>
      <div className={styles.support}>
        <span>{t("notifications.support.title")}</span>
      </div>
    </div>
  );
};
