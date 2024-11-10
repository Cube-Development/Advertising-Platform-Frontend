import { IAdminReviewData } from "@entities/admin";
import { FC } from "react";
import { ReviewCard } from "../card";
import styles from "./styles.module.scss";

interface ReviewsListProps {
  reviews: IAdminReviewData[];
}

export const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <div className={styles.wrapper}>
      {reviews?.length ? (
        <div className={styles.cards}>
          {reviews.map((card, index) => (
            <div key={index}>
              <ReviewCard card={card} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
