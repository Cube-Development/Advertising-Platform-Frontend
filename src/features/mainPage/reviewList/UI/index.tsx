import { FC } from "react";
import styles from "./styles.module.scss";
import { IReview } from "@shared/types/translate";
import { ReviewCard } from "@entities/mainPage";

interface ReviewListProps {
    reviews: IReview[];
}

export const ReviewList: FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};
