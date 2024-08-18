import { IReadChannelData } from "@entities/channel/types";
import {
  FeatherIcon,
  HeartIcon,
  ProtectIcon2,
  RatingIcon,
  StarIcon4,
} from "@shared/assets";
import { FC } from "react";
import styles from "./styles.module.scss";
import { platformToIcon } from "@entities/project";

interface DescriptionProps {
  card: IReadChannelData;
}

export const Description: FC<DescriptionProps> = ({ card }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.channel__logo__wrapper}>
        <div className={styles.channel__logo}>
          <div className={styles.logo}>
            <img src={card?.avatar} alt="" />
            <RatingIcon />
          </div>
          <button className={styles.add_channel}>
            <p>Добавить</p>
            <HeartIcon />
          </button>
        </div>
      </div>
      <div>
        <div className={styles.channel__description}>
          <div className={styles.title}>
            <p>{card?.name}</p>
            <div>
              <FeatherIcon />
              <ProtectIcon2 />
              <StarIcon4 />
            </div>
          </div>
          <div className={styles.description}>
            <p>{card?.description}</p>
          </div>
          <div className={styles.link}>
            {card?.platform || 0 in platformToIcon
              ? platformToIcon[card?.platform || 0]()
              : null}
            <p>{card?.url}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
