import { INotificationCard } from "@entities/communication";
import { ScrollArea } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface NotificationMessageProps {
  card: INotificationCard;
}

export const NotificationMessage: FC<NotificationMessageProps> = ({ card }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <ScrollArea>
        <span dangerouslySetInnerHTML={{ __html: card?.text || "" }} />
      </ScrollArea>
      <div className={styles.support}>
        <span>{t("notifications.support.title")}</span>
      </div>
    </div>
  );
};
