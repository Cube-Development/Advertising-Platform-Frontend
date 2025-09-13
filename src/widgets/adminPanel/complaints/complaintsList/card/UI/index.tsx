import {
  ADMIN_COMPLAINT_PRIORITY_STATUS_LIST,
  ADMIN_COMPLAINT_STATUS,
  ADMIN_COMPLAINT_PRIORITY,
  IAdminComplaintData,
} from "@entities/admin";
import { ChooseComplaint, SeeComplaint } from "@features/admin-panel";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import noUserAvatar from "/images/notFound/noUserAvatar.jpg";

interface ComplaintCardProps {
  card: IAdminComplaintData;
  status: ADMIN_COMPLAINT_STATUS;
}

export const ComplaintCard: FC<ComplaintCardProps> = ({ card, status }) => {
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
    <div
      className={`${styles.wrapper} ${status === ADMIN_COMPLAINT_STATUS.WAIT ? styles.wait : status === ADMIN_COMPLAINT_STATUS.ACTIVE ? styles.active : styles.completed}`}
    >
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
      {status === ADMIN_COMPLAINT_STATUS.COMPLETE && (
        <div className={styles.column}>
          <p>{card?.completed}</p>
        </div>
      )}
      {/* {status !== adminComplaintTypesFilter.active && (
        <div className={styles.info}>
          <div className={styles.logo}>
            <img
              src={card?.moderator?.avatar || noUserAvatar}
              alt="moderator"
            />
          </div>
          <div className={styles.title}>
            <p
              className="truncate"
              onClick={() => handleCopyLink(card?.moderator?.email)}
            >
              {card?.moderator?.email}
            </p>
            <span
              className="truncate"
              onClick={() => handleCopyLink(card?.moderator?.id)}
            >
              # {card?.moderator?.id}
            </span>
          </div>
        </div>
      )} */}
      <div className={styles.last}>
        {status === ADMIN_COMPLAINT_STATUS.WAIT ? (
          <>
            <div
              className={`${styles.priority} ${
                card?.priority === ADMIN_COMPLAINT_PRIORITY.LOW
                  ? styles.low
                  : card?.priority === ADMIN_COMPLAINT_PRIORITY.MEDIUM
                    ? styles.medium
                    : styles.high
              }`}
            >
              <p>
                {t(
                  ADMIN_COMPLAINT_PRIORITY_STATUS_LIST.find(
                    (item) => item?.id === card?.priority,
                  )?.name || "",
                )}
              </p>
            </div>
            <SeeComplaint id={card?.id} ChooseBtn={ChooseComplaint} />
          </>
        ) : (
          <>
            <div className={styles.info}>
              <div className={styles.logo}>
                <img
                  src={card?.moderator?.avatar || noUserAvatar}
                  alt="moderator"
                />
              </div>
              <div className={styles.title}>
                <p
                  className="truncate"
                  onClick={() => handleCopyLink(card?.moderator?.email)}
                >
                  {card?.moderator?.email}
                </p>
                <span
                  className="truncate"
                  onClick={() => handleCopyLink(card?.moderator?.id)}
                >
                  # {card?.moderator?.id}
                </span>
              </div>
            </div>
            <Link
              to={`${ENUM_PATHS.ADMIN_COMPLAINT_INFO.replace(":id", card?.id)}`}
              className={styles.arrow}
            >
              <ArrowLongHorizontalIcon className="icon__grey" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
