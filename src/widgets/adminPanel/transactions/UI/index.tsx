import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { AdminTransactions } from "@shared/config";
import { TransactionsList } from "../transactionsList";

export const Transactions: FC = () => {
  const { t } = useTranslation();
  const transactions = AdminTransactions;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.transactions")}</h1>
          <p>
            {t("admin_panel.pages.home")}
            <span> / {t("admin_panel.pages.transactions")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </div>
  );
};
