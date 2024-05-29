import { CustomerList } from "@features/customerList";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CustomersProps {
  page: string;
}

export const Customers: FC<CustomersProps> = ({ page }) => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <section className={`${styles.customer}`}>
        <div className={styles.customer__title}>
          <p>{t(`${page}.customers_title`)}</p>
        </div>
        <CustomerList
          customers={t(`${page}.customers_list`, { returnObjects: true })}
        />
      </section>
    </div>
  );
};
