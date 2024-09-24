import { IManagerNewProjectCard } from "@entities/project";
import {
  SendToBot,
  StartProject,
  TechnicalSpecification,
} from "@features/project";
import { MoreIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ManagerNewProjectCardProps {
  card: IManagerNewProjectCard;
}

export const ManagerNewProjectCard: FC<ManagerNewProjectCardProps> = ({
  card,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.wrapper} border__gradient`}>
      <div className={styles.card}>
        <div className={styles.card__name}>
          <p className="truncate">Новая компания</p>
          <div>
            <span className="truncate">№ {card?.id}</span>
            <span className="truncate">№ {card?.tariff_date}</span>
          </div>
        </div>
        <div className={styles.card__info}>
          <div>
            <p>{t("orders_manager.card.tarif")}</p>
            <span className="truncate">{card?.tariff_name}</span>
          </div>
          <div>
            <p>{t("orders_manager.card.budget")}</p>
            <span className="truncate">
              {card?.budget?.toLocaleString()} {t("symbol")}
            </span>
          </div>
        </div>
        <div className={styles.card__buttons}>
          <TechnicalSpecification
            isFull={true}
            card={card}
            SendToBotBtn={SendToBot}
          />
          <StartProject project_id={card?.project_id} />
        </div>
        <div className={styles.card__more}>
          <div className={styles.more__btn}>
            <button>
              <MoreIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
