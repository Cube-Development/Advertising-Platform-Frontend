import { FC } from "react";
import styles from "./styles.module.scss";
import {
  adminComplaintPriorityStatus,
  adminComplaintStatus,
  complaintPriority,
  complaintStatus,
  IAdminComplaintInfoData,
} from "@entities/admin";
import { useTranslation } from "react-i18next";
import { useToast } from "@shared/ui";

interface ComplaintDescriptionProps {
  card: IAdminComplaintInfoData;
}

export const ComplaintDescription: FC<ComplaintDescriptionProps> = ({
  card,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.default"),
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1>{t("admin_panel.complaintInfo.card.description.title")}</h1>
      <div className={styles.description}>
        <div className={styles.users__wrapper}>
          <div className={styles.user}>
            <p className={styles.head}>
              {t("admin_panel.complaintInfo.card.description.sender")}:
            </p>
            <div className={styles.info}>
              <div className={styles.logo}>
                <img src={card?.sender?.avatar || ""} alt="avatar" />
              </div>
              <div className={styles.title}>
                <p
                  className="truncate"
                  onClick={() => handleCopyLink(card?.sender?.email)}
                >
                  {card?.sender?.email}
                </p>
                <span
                  className="truncate"
                  onClick={() => handleCopyLink(card?.sender?.userId)}
                >
                  # {card?.sender?.userId}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.user}>
            <p className={styles.head}>
              {t("admin_panel.complaintInfo.card.description.moderator")}:
            </p>
            <div className={styles.info}>
              <div className={styles.logo}>
                <img src={card?.moderator?.avatar || ""} alt="avatar" />
              </div>
              <div className={styles.title}>
                <p className="truncate">{card?.moderator?.name}</p>
                <span
                  className="truncate"
                  onClick={() => handleCopyLink(card?.moderator?.userId)}
                >
                  # {card?.sender?.userId}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.status__wrapper}>
            <p className={styles.title}>
              {t("admin_panel.complaintInfo.card.description.status")}:
            </p>
            <div
              className={`${styles.status} ${
                card?.status === complaintStatus.wait
                  ? styles.wait
                  : card?.status === complaintStatus.active
                    ? styles.active
                    : styles.complite
              }`}
            >
              <p>
                {t(
                  adminComplaintStatus.find((item) => item?.id === card?.status)
                    ?.name || "",
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.complaint__wrapper}>
          <div className={styles.datetime}>
            <p>{t("admin_panel.complaintInfo.card.description.date")}:</p>
            <span>{card?.datetime}</span>
          </div>
          <div className={styles.theme}>
            <p>{t("admin_panel.complaintInfo.card.description.theme")}:</p>
            <span>{card?.theme}</span>
          </div>
          <div className={styles.priority__wrapper}>
            <p className={styles.title}>
              {t("admin_panel.complaintInfo.card.description.priority")}:
            </p>
            <div
              className={`${styles.priority} ${
                card?.priority === complaintPriority.low
                  ? styles.low
                  : card?.priority === complaintPriority.medium
                    ? styles.medium
                    : styles.high
              }`}
            >
              <p>
                {t(
                  adminComplaintPriorityStatus.find(
                    (item) => item?.id === card?.priority,
                  )?.name || "",
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.comment__wrapper}>
          <p>{t("admin_panel.complaintInfo.card.description.theme")}:</p>
          <span>{card?.comment}</span>
        </div>
      </div>
    </div>
  );
};
