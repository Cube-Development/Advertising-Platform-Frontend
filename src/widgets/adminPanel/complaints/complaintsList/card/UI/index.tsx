import {
  adminComplaintPriorityStatus,
  complaintPriority,
  IAdminComplaintData,
} from "@entities/admin";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { paths } from "@shared/routing";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";

interface ComplaintCardProps {
  card: IAdminComplaintData;
}

export const ComplaintCard: FC<ComplaintCardProps> = ({ card }) => {
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
      <div
        className={`${styles.column} ${styles.id}`}
        onClick={() => handleCopyLink(card?.id)}
      >
        <p className="truncate">{card?.id}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.theme}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card?.sender?.avatar || noUserAvatar} alt="sender" />
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
            onClick={() => handleCopyLink(card?.sender?.id)}
          >
            # {card?.sender?.id}
          </span>
        </div>
      </div>
      <div className={styles.column}>
        <p>{card?.created}</p>
      </div>
      <div className={styles.last}>
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
        <Link
          to={`${paths.adminComplaintInfo.replace(":id", card?.id)}`}
          className={styles.arrow}
        >
          <ArrowLongHorizontalIcon className="icon__grey" />
        </Link>
      </div>
    </div>
  );
};
