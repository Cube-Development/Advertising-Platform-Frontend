import { IAdminTransactions } from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { HistoryReq, useGetHistoryQuery } from "@entities/wallet";
import {
  AdminTransactions,
  INTERSECTION_ELEMENTS,
  Languages,
} from "@shared/config";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TransactionsList } from "../transactionsList";
import styles from "./styles.module.scss";

export const Transactions: FC = () => {
  const { t, i18n } = useTranslation();
  const transactions = AdminTransactions;

  const [transactionsData, setTransactionsData] = useState<IAdminTransactions>({
    page: 1,
    elements: transactions.length,
    transactions: [],
  });

  ////
  // удалить

  const language = Languages.find((lang) => lang.name === i18n.language);
  const [currentPage, setCurrentPage] = useState(1);

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: dateSortingTypes.decrease,
  };

  const { data, isLoading, isFetching } = useGetHistoryQuery(getParams);

  const handleOnChangePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);

    setTransactionsData({
      page: transactionsData.page + 1,
      elements: transactions.length,
      transactions: transactions.slice(
        0,
        (transactionsData.page + 1) * INTERSECTION_ELEMENTS.adminTransactions,
      ),
      isLast:
        transactions.length <=
        (transactionsData.page + 1) * INTERSECTION_ELEMENTS.adminTransactions,
    });
  };

  /////

  useEffect(() => {
    if (data && !isLoading && transactionsData.page === 1) {
      setTransactionsData({
        ...transactionsData,
        transactions: transactions.slice(
          0,
          INTERSECTION_ELEMENTS.adminTransactions,
        ),
      });
    }
  }, [data, isLoading]);

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
          <TransactionsList
            data={transactionsData}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
