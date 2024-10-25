import { IWalletHistory } from "@entities/wallet";
import { MoreIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface HistoryCardProps {
  card: IWalletHistory;
}

export const HistoryCard: FC<HistoryCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div className={styles.wrapper}>
          <div className={`truncate ${styles.datetime}`}>
            {card?.transaction_datetime}
          </div>
          <div className={`truncate ${styles.info}`}>
            {card?.transaction_type}
          </div>
          <div className={`truncate ${styles.info}`}>{card?.way_type}</div>
          <div className={`truncate ${styles.info}`}>
            {card?.amount?.toLocaleString()}
          </div>
          <div className={styles.status}>
            <p>{card?.status}</p>
            <MoreIcon />
          </div>
        </div>
      ) : (
        <div className={styles.wrapper__card}>
          <div className={styles.top}>
            <div className={styles.left}>
              <p>{card?.transaction_type}</p>
              <span>{card?.transaction_datetime}</span>
            </div>
            <div className={styles.right}>
              <MoreIcon />
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.info__row}>
              <p>{t("wallet_history.tab.method")}:</p>
              <span>{card?.way_type}</span>
            </div>
            <div className={styles.info__row}>
              <p>{t("wallet_history.tab.ammount")}:</p>
              <span>{card?.amount?.toLocaleString()}</span>
            </div>
            <div className={styles.info__row}>
              <p>{t("wallet_history.tab.status")}:</p>
              <span>{card?.status}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
