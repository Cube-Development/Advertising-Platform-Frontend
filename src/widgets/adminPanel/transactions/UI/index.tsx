import {
  adminTransactionForm,
  getAdminTransactionsReq,
  useGetAdminTransactionsQuery,
} from "@entities/admin";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TransactionsList } from "../transactionsList";
import styles from "./styles.module.scss";

export const Transactions: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<getAdminTransactionsReq>({
    defaultValues: {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.adminTransactions,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminTransactionsQuery({
    ...formFields,
  });

  const handleOnChangePage = () => {
    setValue(adminTransactionForm.page, formFields?.page + 1);
  };

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
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
