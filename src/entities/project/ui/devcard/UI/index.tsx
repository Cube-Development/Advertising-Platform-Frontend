import { IChatOpen } from "@entities/communication";
import { IAdvManagerProjectsDevCard } from "@entities/project";
import { roles } from "@entities/user";
import { MoreIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AdvDevProjectCardProps {
  card: IAdvManagerProjectsDevCard;
  ChatBtn: FC<IChatOpen>;
}

export const AdvDevProjectCard: FC<AdvDevProjectCardProps> = ({
  card,
  ChatBtn,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.card} border__gradient`}>
      <div className={styles.card__title}>
        <p className="truncate">{card?.name}</p>
        <div>
          <span className="truncate">№{card.identifier}</span>
          <span>{card?.created}</span>
        </div>
      </div>
      <div className={styles.card__info}>
        <div>
          <p>{t("orders_advertiser.card.tarif")}:</p>
          <span>{card?.tarif}</span>
        </div>
        <div>
          <p>{t("orders_advertiser.card.cost")}:</p>
          <span className="truncate">
            {card?.budget?.toLocaleString()} {t("symbol")}
          </span>
        </div>
      </div>
      <div className={styles.card__status}>
        <div>
          <p>{t("orders_advertiser.card.status.develop")}</p>
        </div>
      </div>
      <div className={styles.card__chat}>
        <ChatBtn orderId={card?.id} toRole={roles.manager} />
      </div>
      <div className={styles.card__more}>
        <button>
          <MoreIcon />
        </button>
      </div>
    </div>
  );
};
