import { adminReviewTypesFilter, IAdminReviews } from "@entities/admin";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ReviewCard, SkeletonAdminReviewCard } from "../card";
import styles from "./styles.module.scss";

interface ReviewsListProps {
  data?: IAdminReviews;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: () => void;
  status: adminReviewTypesFilter;
}

export const ReviewsList: FC<ReviewsListProps> = ({
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
        className={`${styles.bar} ${status === adminReviewTypesFilter.accept ? styles.accept : styles.wait}`}
      >
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.reviews.bar.id")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.reviews.bar.platform")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.reviews.bar.sender")}</p>
        </div>
        {status === adminReviewTypesFilter.accept && (
          <div className={styles.column}>
            <p className="truncate">{t("admin_panel.reviews.bar.moderator")}</p>
          </div>
        )}
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.reviews.bar.date")}</p>
        </div>
        {status === adminReviewTypesFilter.accept && (
          <div className={styles.column}>
            <p className="truncate">
              {t("admin_panel.reviews.bar.closed_date")}
            </p>
          </div>
        )}
      </div>
      {data?.reviews?.length ? (
        <div className={styles.cards}>
          {data?.reviews.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.adminReviews}
              variants={PAGE_ANIMATION.animationUp}
            >
              <ReviewCard card={card} />
            </motion.div>
          ))}
          {(isFetching || isLoading) &&
            Array.from({ length: INTERSECTION_ELEMENTS.adminReviews }).map(
              (_, index) => (
                <SkeletonAdminReviewCard key={index} status={status} />
              ),
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
