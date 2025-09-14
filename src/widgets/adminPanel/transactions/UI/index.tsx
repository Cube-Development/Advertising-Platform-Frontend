import {
  ADMIN_TRANSACTION_FILTER_TABS_LIST,
  ADMIN_TRANSACTION_FORM,
  ADMIN_TRANSACTION_STATUS,
  IGetAdminTransactionsReq,
  useGetAdminTransactionsQuery,
} from "@entities/admin-panel";
import { BarSubFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TransactionsList } from "../transactions-list";
import styles from "./styles.module.scss";

export const Transactions: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<IGetAdminTransactionsReq>({
    defaultValues: {
      page: 1,
      status: ADMIN_TRANSACTION_STATUS.PENDING,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_TRANSACTIONS,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminTransactionsQuery(
    { ...formFields },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: (data?.status === formFields?.status && data) || undefined,
      }),
    },
  );

  const handleOnChangePage = () => {
    setValue(ADMIN_TRANSACTION_FORM.PAGE, formFields?.page + 1);
  };

  const changeTab = (filter: ADMIN_TRANSACTION_STATUS) => {
    setValue(ADMIN_TRANSACTION_FORM.PAGE, 1);
    setValue(ADMIN_TRANSACTION_FORM.STATUS, filter);
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
          <div className={styles.filter}>
            <BarSubFilter
              tab={formFields?.status}
              changeTab={changeTab}
              tab_list={ADMIN_TRANSACTION_FILTER_TABS_LIST}
            />
          </div>
          <TransactionsList
            data={data}
            isLoading={isLoading || isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
