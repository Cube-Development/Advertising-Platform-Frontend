import { IModerationChannel } from "@entities/channel/types";
import { platformToIcon } from "@entities/project";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ModChannelCardProps {
  card: IModerationChannel;
}

export const ModChannelCard: FC<ModChannelCardProps> = ({ card }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.card} border__gradient`}>
      <div className={styles.platform__icon}>
        {card?.platform && card?.platform in platformToIcon
          ? platformToIcon[card.platform!]()
          : "..."}
      </div>
      <div className={styles.card__preview}>
        <div className={styles.card__preview__logo}>
          <img src={card?.avatar} alt="" />
        </div>
        <div className={styles.card__preview__description}>
          <p>{card?.name}</p>
          <span>{card?.category}</span>
        </div>
      </div>
      <div className={styles.card__date}>
        <span>{t("platforms_blogger.created")}:</span>
        <p>{card?.created}</p>
      </div>
      <div className={styles.card__status}>
        <p className="truncate">
          {t(`platforms_blogger.card.status.moderation`)}
        </p>
      </div>
      <div className={styles.card__date__mobile}>
        <span>{t("platforms_blogger.created")}:</span>
        <p>{card?.created}</p>
      </div>
      <div className={styles.card__info}>
        <p>{t(`platforms_blogger.moderation_time`)}</p>
      </div>
    </div>
  );
};
