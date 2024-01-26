import { FC } from "react";
import styles from "./styles.module.scss";
import { IReview } from "@shared/types/translate";

interface ReviewCardProps {
  review: IReview;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  console.log(review.img)
  return (
    <div className={styles.review}>
      <div className={styles.review__row}>
        <img  className={styles.logo} src={`images/customers/${review.img}`} alt="" />
        <div className={styles.review__column}>
          <h4 className={styles.title}>{review.name}, {review.workplace}</h4>
          <img className={styles.rating} src={`images/common/rating.svg`} alt="" />
        </div>
      </div>
      <p className={styles.text}>{review.text}</p>
      

    </div>
  );
};
