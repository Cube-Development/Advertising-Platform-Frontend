import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { MoreIcon } from "@shared/assets";
import { IWalletHistory } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useTranslation } from "react-i18next";

interface HistoryCardProps {
  card: IWalletHistory;
}

export const HistoryCard: FC<HistoryCardProps> = ({ card }) => {
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const { t } = useTranslation();
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
          <div className={styles.datetime}>
            <p>{card?.transaction_datetime}</p>
          </div>
          <div className={styles.info}>
            <p>{card?.transaction_type}</p>
          </div>
          <div className={styles.info}>
            <p>{card?.way_type}</p>
          </div>
          <div className={styles.info}>
            <p>{card?.amount?.toLocaleString()}</p>
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
