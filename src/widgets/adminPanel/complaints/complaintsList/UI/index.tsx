import { ADMIN_COMPLAINT_STATUS, IAdminComplaints } from "@entities/admin";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ComplaintCard } from "../card";
import { SkeletonAdminComplaintCard } from "../card/skeleton";
import styles from "./styles.module.scss";

interface ComplaintsListProps {
  data?: IAdminComplaints;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: () => void;
  status: ADMIN_COMPLAINT_STATUS;
}

export const ComplaintsList: FC<ComplaintsListProps> = ({
  data,
  isLoading,
  isFetching,
  handleChange,
  status,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.bar}  ${status === ADMIN_COMPLAINT_STATUS.WAIT ? styles.wait : status === ADMIN_COMPLAINT_STATUS.ACTIVE ? styles.active : styles.completed}`}
      >
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.complaints.bar.id")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.complaints.bar.theme")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.complaints.bar.sender")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.complaints.bar.created")}</p>
        </div>
        {status === ADMIN_COMPLAINT_STATUS.WAIT && (
          <div className={styles.column}>
            <p className="truncate">
              {t("admin_panel.complaints.bar.priority")}
            </p>
          </div>
        )}
        {status === ADMIN_COMPLAINT_STATUS.COMPLETE && (
          <div className={styles.column}>
            <p className="truncate">
              {t("admin_panel.complaints.bar.completed")}
            </p>
          </div>
        )}
        {status !== ADMIN_COMPLAINT_STATUS.WAIT && (
          <div className={styles.column}>
            <p className="truncate">
              {t("admin_panel.complaints.bar.moderator")}
            </p>
          </div>
        )}
      </div>
      {data?.complaints?.length ? (
        <div className={styles.cards}>
          {data?.complaints.map((card, index) => (
            <motion.div
              key={card.id}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.ADMIN_COMPLAINTS}
              variants={PAGE_ANIMATION.animationUp}
            >
              <ComplaintCard card={card} status={status} />
            </motion.div>
          ))}
          {(isFetching || isLoading) &&
            Array.from({ length: INTERSECTION_ELEMENTS.ADMIN_COMPLAINTS }).map(
              (_, index) => <SkeletonAdminComplaintCard key={index} />,
            )}
          {!data.isLast && (
            <div className={`${styles.show_more}`} onClick={handleChange}>
              {isLoading || isFetching ? (
                <SpinnerLoaderSmall />
              ) : (
                <ShowMoreBtn />
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
