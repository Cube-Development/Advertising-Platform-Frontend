import { Rate, ratingData, Review } from "@entities/channel";
import { RATING, REVIEWS } from "@shared/config";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ReviewsProps {}

export const Reviews: FC<ReviewsProps> = () => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<ratingData | null>(null);

  const handleChangeActiveType = (id: ratingData) => {
    setActiveType(activeType !== id ? id : null);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("channel.reviews.title")}</p>
      <Rate
        rating={RATING}
        activeType={activeType}
        onChange={handleChangeActiveType}
      />
      <div className={styles.reviews__wrapper}>
        {REVIEWS.map((review, index) => (
          <Review key={index} card={review} />
        ))}
      </div>
    </div>
  );
};
