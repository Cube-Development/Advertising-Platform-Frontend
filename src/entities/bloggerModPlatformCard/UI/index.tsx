import { IBloggerPlatformCard } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BloggerModPlatformCardProps {
  card: IBloggerPlatformCard;
}

export const BloggerModPlatformCard: FC<BloggerModPlatformCardProps> = ({
  card,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.channel__preview}>
          <div className={styles.channel__logo}>
            <img src={card.img} alt="" />
          </div>
          <div>
            <p>{card.name}</p>
            <span>{card.category}</span>
          </div>
        </div>
      </div>
      <div className={styles.card__date}>
        <p>{card.date}</p>
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
