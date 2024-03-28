import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

interface CreateOrderPaymentProps {
  isBlur?: boolean;
}

export const CreateOrderPayment: FC<CreateOrderPaymentProps> = ({ isBlur }) => {
  const { t } = useTranslation();
  return (
    <div className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>4</span>
            <p>{t("create_order.payment.title")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
