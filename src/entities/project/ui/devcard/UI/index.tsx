import { IChatProps } from "@entities/communication";
import { IAdvManagerProjectsDevCard } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { MoreIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface AdvDevProjectCardProps {
  card: IAdvManagerProjectsDevCard;
  ChatBtn: FC<IChatProps>;
}

export const AdvDevProjectCard: FC<AdvDevProjectCardProps> = ({
  card,
  ChatBtn,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();

  return (
    <div className={`${styles.card} border__gradient`}>
      <div className={styles.card__title}>
        <p className="truncate">{card?.project_name}</p>
        <div>
          <span className="truncate">№{card?.identifier}</span>
          <span>{card?.created}</span>
        </div>
      </div>
      <div className={styles.card__info}>
        <div>
          <p>{t("orders_advertiser.card.tarif")}:</p>
          <span>{card?.tariff_name}</span>
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
        <ChatBtn
          projectId={card?.id}
          toRole={ENUM_ROLES.MANAGER}
          isFull={screen < BREAKPOINT.LG}
        />
      </div>
      <div className={styles.card__more}>
        <button>
          <MoreIcon />
        </button>
      </div>
    </div>
  );
};
