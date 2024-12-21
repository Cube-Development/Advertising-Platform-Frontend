import { adminComplaintTypesFilter, IAdminComplaints } from "@entities/admin";
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
  status: adminComplaintTypesFilter;
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
        className={`${styles.bar}  ${status === adminComplaintTypesFilter.wait ? styles.wait : status === adminComplaintTypesFilter.active ? styles.active : styles.completed}`}
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
        {status === adminComplaintTypesFilter.wait && (
          <div className={styles.column}>
            <p className="truncate">
              {t("admin_panel.complaints.bar.priority")}
            </p>
          </div>
        )}
        {status === adminComplaintTypesFilter.complete && (
          <div className={styles.column}>
            <p className="truncate">
              {t("admin_panel.complaints.bar.completed")}
            </p>
          </div>
        )}
        {status !== adminComplaintTypesFilter.wait && (
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
              custom={index % INTERSECTION_ELEMENTS.adminComplaints}
              variants={PAGE_ANIMATION.animationUp}
            >
              <ComplaintCard card={card} status={status} />
            </motion.div>
          ))}
          {(isFetching || isLoading) &&
            Array.from({ length: INTERSECTION_ELEMENTS.adminComplaints }).map(
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
