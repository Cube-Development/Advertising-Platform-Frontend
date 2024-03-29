import { FC } from "react";
import styles from "./styles.module.scss";
import { IWalletHistory } from "@shared/types/history";
import { MoreIcon } from "@shared/assets";

interface HistoryCardProps {
  card: IWalletHistory;
}

export const HistoryCard: FC<HistoryCardProps> = ({ card }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <p>{card.date}</p>
      </div>
      <div className={styles.info}>
        <p>{card.purpose}</p>
      </div>
      <div className={styles.info}>
        <p>{card.method}</p>
      </div>
      <div className={styles.info}>
        <p>{card.ammount.toLocaleString()}</p>
      </div>
      <div className={styles.status}>
        <p>{card.status}</p>
        <MoreIcon />
      </div>
    </div>
  );
};
