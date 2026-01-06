import { IWalletHistory } from "@entities/wallet";
import { MoreIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface HistoryCardProps {
  card: IWalletHistory;
}

const convertGMTToLocal = (gmtDateTime: string): string => {
  // Парсим формат "05.01.2026 13:57"
  const [datePart, timePart] = gmtDateTime.split(" ");
  const [day, month, year] = datePart.split(".");
  const [hours, minutes] = timePart.split(":");

  // Создаем Date объект, интерпретируя время как UTC/GMT
  const utcDate = new Date(
    Date.UTC(
      parseInt(year, 10),
      parseInt(month, 10) - 1, // месяцы в JS начинаются с 0
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    )
  );

  // Получаем локальное время
  const localDay = String(utcDate.getDate()).padStart(2, "0");
  const localMonth = String(utcDate.getMonth() + 1).padStart(2, "0");
  const localYear = utcDate.getFullYear();
  const localHours = String(utcDate.getHours()).padStart(2, "0");
  const localMinutes = String(utcDate.getMinutes()).padStart(2, "0");

  return `${localDay}.${localMonth}.${localYear} ${localHours}:${localMinutes}`;
};

export const HistoryCard: FC<HistoryCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <div className={styles.wrapper}>
          <div className={`truncate ${styles.datetime}`}>
            {card?.transaction_datetime
              ? convertGMTToLocal(card.transaction_datetime)
              : ""}
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
              <span>
                {card?.transaction_datetime
                  ? convertGMTToLocal(card.transaction_datetime)
                  : ""}
              </span>
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
