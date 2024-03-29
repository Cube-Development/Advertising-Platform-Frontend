import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { SortingFilter } from "@features/sortingFilter";
import { BarHistory } from "@features/barHistory";
import { HistoryCard } from "@features/historyCard";

const History = [
  {
    date: "27.27.2727 27:27",
    purpose: 0,
    method: "0",
    ammount: 90000000,
    status: "0",
  },
  {
    date: "27.27.2727 27:27",
    purpose: 0,
    method: "0",
    ammount: 90000000,
    status: "0",
  },
  {
    date: "27.27.2727 27:27",
    purpose: 0,
    method: "0",
    ammount: 90000000,
    status: "0",
  },
  {
    date: "27.27.2727 27:27",
    purpose: 0,
    method: "0",
    ammount: 90000000,
    status: "0",
  },
  {
    date: "27.27.2727 27:27",
    purpose: 0,
    method: "0",
    ammount: 90000000,
    status: "0",
  },
];

export const WalletHistory: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <p>{t("wallet_history.wallet_history")}</p>
        </div>
        <div className={styles.filter}>
          <SortingFilter />
        </div>
        <BarHistory />
        <div className={styles.cards}>
          {History.map((card, index) => (
            <HistoryCard card={card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
