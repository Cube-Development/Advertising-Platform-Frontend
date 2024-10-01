import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { CreateOrder } from "@features/createOrder";
import heartAnimation from "/animated/heart_white_lottie.gif";

interface CreateOrderPaymentProps {
  isBlur?: boolean;
  total_price: number;
}

export const CreateOrderPayment: FC<CreateOrderPaymentProps> = ({
  isBlur,
  total_price,
}) => {
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
            <div className={styles.info}>
              <div className={styles.lottie}>
                <img src={heartAnimation} alt="heart_lottie_gif" />
              </div>
              <p className={styles.price}>
                {total_price.toLocaleString()} <span>{t("symbol")}</span>
              </p>
              <p className={styles.description}>
                {t("create_order.payment.description")}
              </p>
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
