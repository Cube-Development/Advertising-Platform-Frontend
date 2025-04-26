import {
  getReviewsByIdReq,
  IReadChannelData,
  Rate,
  ratingData,
  ReviewCard,
  SkeletonChannelRate,
  SkeletonReviewCard,
  useGetReviewsByIdQuery,
} from "@entities/channel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ShowMoreBtn } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { SadSmileIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
interface ReviewsProps {
  card: IReadChannelData;
  isLoadingReviews: boolean;
}

export const Reviews: FC<ReviewsProps> = ({ card, isLoadingReviews }) => {
  const { t } = useTranslation();
  const [currentLast, setCurrentLast] = useState<string | null>(null);

  const handleChangeActiveType = (id: ratingData) => {
    // setCurrentLast(null);
    // resetField("last");
    setValue("grade_filter", id);
  };

  useEffect(() => {
    handleChangeActiveType(5);
  }, []);

  const handleOnChangePage = () => {
    setValue("last", currentLast!);
  };

  const { id: channel_id } = useParams<{ id: string }>();
  const { watch, setValue, resetField } = useForm<getReviewsByIdReq>({
    defaultValues: {
      channel_id: channel_id,
      grade_filter: 5,
    },
  });
  const formFields = watch();

  const { data: reviews, isLoading } = useGetReviewsByIdQuery({
    ...formFields,
  });

  // useEffect(() => {
  //   const [lastElement] = (reviews?.reviews || [])?.slice(-1);
  //   const last = lastElement?.full_created;
  //   setCurrentLast(last);
  // }, [reviews]);

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
              card={card}
              activeType={formFields.grade_filter || null}
              onChange={handleChangeActiveType}
            />
          </motion.div>
          {!!reviews?.reviews?.length && (
            <div className={styles.reviews__wrapper}>
              {reviews?.reviews.map((review, index) => (
                <motion.div
                  key={review.date + review.email + index} // заменить на review.id когда будет апи
                  initial="hidden"
                  animate="visible"
                  custom={index % INTERSECTION_ELEMENTS.CHANNEL_REVIEWS}
                  variants={PAGE_ANIMATION.animationUp}
                >
                  <ReviewCard card={review} />
                </motion.div>
              ))}
              {isLoading &&
                Array.from({
                  length: INTERSECTION_ELEMENTS.CHANNEL_REVIEWS,
                }).map((_, index) => <SkeletonReviewCard key={index} />)}
              {/* {!reviews?.isLast && (
                <div className={styles.show_more} onClick={handleOnChangePage}>
                  <ShowMoreBtn />
                </div>
              )} */}
            </div>
          )}
        </>
      ) : (
        <>
          <SkeletonChannelRate />
          <div className={styles.reviews__wrapper}>
            {Array.from({ length: INTERSECTION_ELEMENTS.CHANNEL_REVIEWS }).map(
              (_, index) => (
                <SkeletonReviewCard key={index} />
              ),
            )}
          </div>
        </>
      )}
      {reviews?.reviews.length === 0 && (
        <div className="mt-6 grid grid-rows-[1fr_auto] gap-4 justify-center justify-items-center items-center">
          <div className="md:[&>svg]:size-[120px] mobile-xl:[&>svg]:size-[80px] [&>svg]:size-[60px]">
            <SadSmileIcon />
          </div>
          <p className="text-center md:text-base mobile:text-sm text-xs text-gray-500 font-medium">
            {t("channel.reviews.no_reviews")}
          </p>
        </div>
      )}
    </div>
  );
};
