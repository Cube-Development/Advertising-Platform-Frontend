import { TemplateIcon2 } from "@shared/assets";
import { projectTypesFilter } from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import { IAdvDevProjectCard } from "@shared/types/common";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AdvDevProjectCardProps {
  card: IAdvDevProjectCard;
  ContinueBtn: FC;
}

export const AdvDevProjectCard: FC<AdvDevProjectCardProps> = ({
  card,
  ContinueBtn,
}) => {
  const { t } = useTranslation();
  const { typeFilter } = useAppSelector((state) => state.filter);

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <p>{card.name}</p>
        <span>
          <small>№{card.id}</small>
          <small>{card.date}</small>
        </span>
      </div>

      <div className={styles.info}>
        <p>{t("orders_advertiser.card.tarif")}:</p>
        <span>{card.tarif}</span>
      </div>

      <div className={styles.info}>
        <p>{t("orders_advertiser.card.cost")}:</p>
        <span>
          {card.cost.toLocaleString()} {t("symbol")}
        </span>
      </div>

      {typeFilter === projectTypesFilter.savedProject ? (
        <>
          <div className={styles.status}>
            <TemplateIcon2 />
            {t("orders_advertiser.order_status.template.title")}
          </div>
          <ContinueBtn />
        </>
      ) : (
        <div className={styles.status}>{card.status}</div>
      )}
    </div>
  );
};
