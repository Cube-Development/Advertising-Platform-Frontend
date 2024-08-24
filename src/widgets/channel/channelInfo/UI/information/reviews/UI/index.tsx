import {
  IReviewData,
  Rate,
  ratingData,
  ReviewCard,
  SkeletonChannelRate,
  SkeletonReviewCard,
} from "@entities/channel";
import {
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
  RATING,
  REVIEWS,
  REVIEWSBYRATE,
} from "@shared/config";
import { ShowMoreBtn } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ReviewsProps {
  isLoadingReviews: boolean;
}

export const Reviews: FC<ReviewsProps> = ({ isLoadingReviews }) => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<ratingData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRev, setCurrentRev] = useState<IReviewData[]>(REVIEWS);
  const [reviews, setReviews] = useState<IReviewData[]>(
    currentRev.slice(0, INTERSECTION_ELEMENTS.review),
  );

  useEffect(() => {
    setReviews(currentRev.slice(0, currentPage * INTERSECTION_ELEMENTS.review));
  }, [currentRev, currentPage]);

  const handleChangeActiveType = (id: ratingData) => {
    setActiveType(activeType !== id ? id : null);
    setCurrentPage(1);
    setCurrentRev(activeType !== id ? REVIEWSBYRATE[id] : REVIEWS);
  };

  const handleOnChangePage = () => {
    const newPage = currentPage + 1;
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsLoading(false);
    }, 500);
  };

  const rate = RATING;

  return (
    <div className={styles.wrapper}>
      {!isLoadingReviews ? (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={PAGE_ANIMATION.animationLeft}
          >
            <Rate
              rating={rate}
              activeType={activeType}
              onChange={handleChangeActiveType}
            />
          </motion.div>
          <div className={styles.reviews__wrapper}>
            {reviews.map((review, index) => (
              <motion.div
                key={review.date + review.email + index} // заменить на review.id когда будет апи
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.review}
                variants={PAGE_ANIMATION.animationUp}
              >
                <ReviewCard card={review} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.review }).map(
                (_, index) => <SkeletonReviewCard key={index} />,
              )}
            {reviews.length < currentRev.length && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                <ShowMoreBtn />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <SkeletonChannelRate />
          <div className={styles.reviews__wrapper}>
            {Array.from({ length: INTERSECTION_ELEMENTS.review }).map(
              (_, index) => (
                <SkeletonReviewCard key={index} />
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
};
