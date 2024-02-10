import { CustomerList } from '@features/customerList';
import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

interface CustomersProps {
    page: string;
}

export const Customers: FC<CustomersProps> = ({page}) => {
    const { t } = useTranslation();

    return (
        <section className={styles.customers__wrapper}>
        <div className="container">
            <h1 className={styles.customer__title}>
                {t(`${page}.customers_title`)}
            </h1>
            <CustomerList customers={t(`${page}.customers_list`, { returnObjects: true })} />
        </div>
      </section>
    );
};