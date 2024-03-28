import { PaymentCard } from "@features/paymentCard";
import { CardIcon, InfoIcon } from "@shared/assets";
import { REPLENISHMENT } from "@shared/config/common";
import { paymentTypes } from "@shared/config/payment";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const TopUpCard: FC = () => {
  const { t } = useTranslation();
  const [paymentType, setpaymentType] = useState("");

  const handlePaymentType = (type: paymentTypes) => {
    setpaymentType(type);
  };

  return (
    <div className={styles.card}>
      <form>
        <div className={styles.icon}>
          <CardIcon />
        </div>
        <div className={styles.data}>
          <div className={styles.payment__card}>
            <p>{t("wallet.choose")}</p>
            <div>
              <button
                type="button"
                onClick={() => handlePaymentType(paymentTypes.payme)}
                className={
                  paymentType === paymentTypes.payme
                    ? styles.active__payment
                    : ""
                }
              >
                <img src="./../images/payment/payme.svg" alt="" />
              </button>
              <button
                type="button"
                onClick={() => handlePaymentType(paymentTypes.click)}
                className={
                  paymentType === paymentTypes.click
                    ? styles.active__payment
                    : ""
                }
              >
                <img src="./../images/payment/click.svg" alt="" />
              </button>
            </div>
          </div>
          <div className={styles.ammount}>
            <p>{t("wallet.ammount.title")}</p>
            <span>{t("wallet.ammount.text")}</span>
            <div>
              <input type="text" />
              <small>{t("symbol")}</small>
            </div>
          </div>
          <div className={styles.conditions}>
            <div className={styles.conditions__right}>
              <InfoIcon />
            </div>
            <div className={styles.conditions__left}>
              <div>
                <p>
                  {t("wallet.conditions.commission")}{" "}
                  <span>{REPLENISHMENT.commission} %</span>
                </p>
              </div>
              <div>
                <p>
                  {t("wallet.conditions.min")}{" "}
                  <span>
                    {REPLENISHMENT.min.toLocaleString()} {t("symbol")}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  {t("wallet.conditions.max")}{" "}
                  <span>
                    {REPLENISHMENT.max.toLocaleString()} {t("symbol")}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.finally}>
            <p>{t("wallet.finally")}</p>
            <span>6 870 000 {t("symbol")}</span>
          </div>
        </div>
        <div className={styles.button}>
          <PaymentCard />
        </div>
      </form>
    </div>
  );
};
