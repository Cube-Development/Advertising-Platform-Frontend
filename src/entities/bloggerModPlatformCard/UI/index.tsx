import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IModerationChannel } from "@shared/types/channelStatus";

interface BloggerModPlatformCardProps {
  card: IModerationChannel;
}

export const BloggerModPlatformCard: FC<BloggerModPlatformCardProps> = ({
  card,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.card__preview}>
        <div className={styles.card__preview__logo}>
          <img src={card.avatar} alt="" />
        </div>
        <div className={styles.card__preview__description}>
          <p>{card.name}</p>
          <span>{card.category}</span>
        </div>
      </div>
      <div className={styles.card__date}>
        {/* <p>{card.created}</p> */}
        <p>222222</p>
      </div>
      <div className={styles.card__status}>
        <p>{t(`platforms_blogger.card.status.moderation`)}</p>
      </div>
      <div className={styles.card__info}>
        <p>{t(`platforms_blogger.moderation_time`)}</p>
      </div>
    </div>
  );
};
