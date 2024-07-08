import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { CreateOrder } from "@features/project";

interface CreateOrderPaymentProps {
  isBlur?: boolean;
}

export const CreateOrderPayment: FC<CreateOrderPaymentProps> = ({ isBlur }) => {
  const { t } = useTranslation();

  return (
    <div id="payment" className={`layout ${isBlur ? "blur" : ""}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.title}>
              <span>4</span>
              <p>{t("create_order.payment.title")}</p>
            </div>
            <div className={styles.pay_btn}>
              <CreateOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
