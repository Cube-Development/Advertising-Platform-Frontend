import { TemplateIcon2 } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  IAdvManagerProjectsDevCard,
  projectTypesFilter,
} from "@entities/project";
import { useAppSelector } from "@shared/hooks";

interface AdvDevProjectCardProps {
  card: IAdvManagerProjectsDevCard;
  ContinueBtn: FC;
}

export const AdvDevProjectCard: FC<AdvDevProjectCardProps> = ({
  card,
  ContinueBtn,
}) => {
  const { t } = useTranslation();
  const { typeFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={`${styles.card} border__gradient`}>
      <div className={styles.card__title}>
        <p>{card?.name}</p>
        <div>
          <span>№31221515</span>
          {/* <span>№{card.id}</span> */}
          <span>{card?.created}</span>
        </div>
      </div>

      <div className={styles.card__info}>
        <p>{t("orders_advertiser.card.tarif")}:</p>
        <span>{card?.tarif}</span>
      </div>

      <div className={styles.card__info}>
        <p>{t("orders_advertiser.card.cost")}:</p>
        <span>
          {card?.budget?.toLocaleString()} {t("symbol")}
        </span>
      </div>

      {typeFilter === projectTypesFilter.savedProject ? (
        <div className={styles.card__template}>
          <div>
            <TemplateIcon2 />
            {t("orders_advertiser.order_status.template.title")}
          </div>
          <ContinueBtn />
        </div>
      ) : (
        <div className={styles.card__status}>fffff</div>
      )}
    </div>
  );
};
