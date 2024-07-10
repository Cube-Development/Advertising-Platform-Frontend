import { FC } from "react";
import styles from "./styles.module.scss";
import { MoreIcon } from "@shared/assets";
import { IWalletHistory } from "@entities/wallet/types";

interface HistoryCardProps {
  card: IWalletHistory;
}

export const HistoryCard: FC<HistoryCardProps> = ({ card }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
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
  );
};
