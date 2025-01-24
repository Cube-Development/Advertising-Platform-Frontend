import { IReviewCard } from "@entities/channel";
import { RatingIcon } from "@shared/assets";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ReviewProps {
  card: IReviewCard;
}

export const ReviewCard: FC<ReviewProps> = ({ card }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.review}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <img src={card?.avatar} alt="" />
            </div>
            <p className="truncate">{card?.email}</p>
          </div>
          <span>{card?.date}</span>
        </div>
        <RatingIcon />
        <div className={styles.description}>
          <p>{card?.text}</p>
        </div>
      </div>
    </div>
  );
};
