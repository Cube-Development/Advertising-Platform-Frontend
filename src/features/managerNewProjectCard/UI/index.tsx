import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { IManagerNewProjectCard } from "@shared/types/managerProjects";
import { ArrowSmallVerticalIcon, CopyIcon, MoreIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";

interface ManagerNewProjectCardProps {
  card: IManagerNewProjectCard;
  ManagerNewProjectStartBtn: FC;
  SendToBotBtn: FC;
}

export const ManagerNewProjectCard: FC<ManagerNewProjectCardProps> = ({
  card,
  ManagerNewProjectStartBtn,
  SendToBotBtn,
}) => {
  const { t } = useTranslation();
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.card__id}>
          <p>№ {card.id}</p>
        </div>
        <div className={styles.card__date}>
          <p>{card.date}</p>
        </div>
        <div className={styles.card__tarif}>
          <p>{t("orders_manager.card.tarif")}:</p>
          <span>{card.tarif}</span>
        </div>
        <div className={styles.card__price}>
          <p>{t("orders_manager.card.cost")}:</p>
          <span>
            {card.price.toLocaleString()} {t("symbol")}
          </span>
        </div>
        <ManagerNewProjectStartBtn />
        <MoreIcon />
      </div>

      {isSubcardOpen && (
        <div className={styles.subcard}>
          <div className={styles.subcard__left}>
            <div className={styles.comment}>
              <p>{t("orders_manager.subcard.comment")}</p>
              <span>{card.comment}</span>
            </div>
            <div className={styles.link}>
              <p>{t("orders_manager.subcard.link")}</p>
              <ul>
                {card.url.map((url, index) => (
                  <li key={index}>
                    <span>{url}</span>
                    <CopyIcon />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.subcard__right}>
            <div className={styles.file}>
              <div className={styles.file__top}>
                <p>{t("orders_manager.subcard.file")}</p>
                <span> {t("orders_manager.subcard.download_all")}</span>
              </div>
              <ul className={styles.file__all}>
                {/* {card.file.map((file, index) => (
                  <li key={index}>
                    <span>{file}</span>
                  </li>
                ))} */}
              </ul>
            </div>
            <SendToBotBtn />
          </div>
        </div>
      )}

      <button
        className={`${styles.card__btn} ${isSubcardOpen ? styles.less : styles.more}`}
        onClick={() => handleChangeOpenSubcard()}
      >
        {isSubcardOpen
          ? t(`orders_manager.card.see_less`)
          : t(`orders_manager.card.see_more`)}

        <ArrowSmallVerticalIcon
          className={
            isSubcardOpen
              ? "active__icon rotate"
              : "default__icon__white rotate_down"
          }
        />
      </button>
    </div>
  );
};
