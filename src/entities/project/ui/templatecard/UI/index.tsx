import { IAdvTemplateProjectsCard } from "@entities/project";
import { MoreIcon, TemplateIcon2 } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AdvTemplateProjectCardProps {
  card: IAdvTemplateProjectsCard;
  ContinueBtn: FC;
}

export const AdvTemplateProjectCard: FC<AdvTemplateProjectCardProps> = ({
  card,
  ContinueBtn,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.card} border__gradient`}>
      <div className={styles.card__title}>
        <p className="truncate">{card?.name}</p>
        <div>
          <span className="truncate">{card?.identifier}</span>
          <span>{card?.created}</span>
        </div>
      </div>
      <div className={styles.card__info}>
        <div>
          <p>{t("orders_advertiser.card.channels")}:</p>
          <span>{card?.count?.toLocaleString()}</span>
        </div>
        <div>
          <p>{t("orders_advertiser.card.cost")}:</p>
          <span className="truncate">
            {card?.budget?.toLocaleString()} {t("symbol")}
          </span>
        </div>
      </div>
      <div className={styles.card__template}>
        <div>
          <TemplateIcon2 />
          <p>{t("orders_advertiser.order_status.template.title")}</p>
        </div>
      </div>
      <div className={styles.card__continue}>
        <ContinueBtn />
      </div>
      <div className={styles.card__more}>
        <button>
          <MoreIcon />
        </button>
      </div>
    </div>
  );
};
