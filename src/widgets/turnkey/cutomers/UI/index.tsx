import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { CustomerList } from "@features/mainPages";
import { ICustomer } from "@shared/types/translate";

interface CustomersProps {}

export const Customers: FC<CustomersProps> = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.customer}>
      <div className="container">
        <div className={styles.customer__title}>
          <h1>{t(`turnkey.customers.title`)}</h1>
          <h2>{t(`turnkey.customers.text`)}</h2>
        </div>
      </div>
      <CustomerList
        customers={
          t(`main_page_advertiser.customers_list`, {
            returnObjects: true,
          }) as ICustomer[]
        }
      />
    </div>
  );
};
