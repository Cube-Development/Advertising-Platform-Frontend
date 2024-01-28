import { FC } from "react";
import styles from "./styles.module.scss";
import { ICustomer } from "@shared/types/translate";

interface CustomerCardProps {
  customer: ICustomer;
}

export const CustomerCard: FC<CustomerCardProps> = ({ customer }) => {

  return (
    <div className={styles.customer}>
      <div className={styles.customer__row}>
        <img  className={styles.logo} src={`images/customers/${customer.img}`} alt="" />
        <div className={styles.customer__column}>
          <h4 className={styles.title}>{customer.name}, {customer.workplace}</h4>
          <img className={styles.rating} src={`images/common/rating.svg`} alt="" />
        </div>
      </div>
      <p className={styles.text}>{customer.text}</p>
      

    </div>
  );
};
