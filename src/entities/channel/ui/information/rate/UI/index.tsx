import { ratingData, ratingStatus } from "@entities/channel/config";
import { IChannelRate } from "@entities/channel/types";
import { RatingIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SliderProps {
  max: number;
  current: number;
  isActive: boolean;
}

const Slider: FC<SliderProps> = ({ max, current, isActive }) => {
  const minValue = 5;
  const maxValue = 100;
  const length =
    current === 0
      ? 0
      : Math.max(minValue, Math.ceil((current / max) * maxValue));

  return (
    <div className={styles.out}>
      <div
        className={`${styles.in} ${isActive ? styles.active : ""}`}
        style={
          {
            "--widthIn": `${length}%`,
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};

interface RateProps {
  rating: IChannelRate;
  activeType: ratingData | null;
  onChange: (id: ratingData) => void;
}

export const Rate: FC<RateProps> = ({ rating, activeType, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.rate__wrapper}>
          <p>{rating.rate}</p>
          <div className={styles.rate}>
            <RatingIcon />
            <span>
              {rating.count} {t("channel.reviews.text")}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rate_type}>
          {ratingStatus.map((item, index) => (
            <span
              key={index}
              className={`${activeType === item.id ? styles.active : ""}`}
              onClick={() => onChange(item.id)}
            >{`${t(item.name)} (${rating.rating_type.find((type) => type.type === item.id)?.count || 0})`}</span>
          ))}
        </div>
        <div className={styles.sliders}>
          {ratingStatus.map((item, index) => (
            <div
              className={styles.slider}
              key={index}
              onClick={() => onChange(item.id)}
            >
              <Slider
                max={rating.count}
                isActive={activeType === item.id}
                current={
                  rating.rating_type.find((type) => type.type === item.id)
                    ?.count || 0
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};