import {
  paymentTypes,
  topup,
  usePaymentDepositMutation,
} from "@entities/wallet";
import { PaymentCard } from "@features/wallet";
import { CardIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { InfoIcon } from "lucide-react";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface IOnlineBankingData {
  legal_id: string;
  way_type: paymentTypes;
  amount: number;
}

export const CreditCard: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [paymentType, setPaymentType] = useState<paymentTypes>(
    paymentTypes.payme,
  );
  const navigate = useNavigate();

  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOnlineBankingData>();

  const handlePaymentType = (type: paymentTypes) => {
    setPaymentType(type);
  };

  const [paymentDeposit, { isLoading, error }] = usePaymentDepositMutation();

  const onSubmit: SubmitHandler<IOnlineBankingData> = async (data) => {
    const formData = {
      ...data,
      legal_id: "3754ba1c-132e-4c2d-b4fd-943c32de8a0c",
      amount: Number(data.amount),
      way_type: paymentType,
    };
    !isLoading &&
      paymentDeposit(formData)
        .unwrap()
        .then(() => {
          reset();
          toast({
            variant: "success",
            title: `${t("toasts.wallet.topup.success")}: ${formData.amount.toLocaleString()} ${t("symbol")}`,
          });
          navigate(ENUM_PATHS.MAIN);
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.wallet.topup.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("Ошибка payment/deposit: ", error);
        });
  };

  const amount = watch("amount", 0);

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.icon}>
          <CardIcon />
        </div>
        <div className={styles.data}>
          <div className={styles.payment__card}>
            <p className={errors["way_type"] && styles.form_error}>
              {t("wallet.choose")}
            </p>
            <div>
              <button
                type="button"
                onClick={() => handlePaymentType(paymentTypes.payme)}
                className={
                  paymentType === paymentTypes.payme
                    ? styles.active__payment
                    : styles.payment_item
                }
              >
                <img src="/images/payment/payme.svg" alt="" />
              </button>
              <button
                type="button"
                onClick={() => handlePaymentType(paymentTypes.click)}
                className={
                  paymentType === paymentTypes.click
                    ? styles.active__payment
                    : styles.payment_item
                }
              >
                <img src="/images/payment/click.svg" alt="" />
              </button>
            </div>
          </div>
          <div className={styles.ammount}>
            <p className={errors["amount"] && styles.form_error}>
              {t("wallet.topup.amount")}
            </p>
            <div>
              <input
                {...register("amount", {
                  required: t("wallet.topup.required"),
                })}
                type="number"
                placeholder={
                  errors["amount"]
                    ? errors["amount"].message
                    : t("wallet.topup.placeholder")
                }
                // пример ограничения инпута
                maxLength={10}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.slice(0, target.maxLength);
                  target.value = target.value.replace(/\D/g, "");
                }}
                className={errors["amount"] && styles.form_error}
              />
              <small>{t("symbol")}</small>
            </div>
          </div>
          <div className={styles.conditions}>
            <div className={styles.conditions__right}>
              <InfoIcon color="#BDBDBD" />
            </div>
            <div className={styles.conditions__left}>
              <div>
                <p>
                  {t("wallet.conditions.commission")}{" "}
                  <span>{topup.commission} %</span>
                </p>
              </div>
              <div>
                <p>
                  {t("wallet.conditions.min")}{" "}
                  <span>
                    {topup.min.toLocaleString()} {t("symbol")}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  {t("wallet.conditions.max")}{" "}
                  <span>
                    {topup.max.toLocaleString()} {t("symbol")}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.finally}>
            <p>{t("wallet.finally")}</p>
            <span>
              {amount != 0 ? Number(amount).toLocaleString() : 0} {t("symbol")}
            </span>
          </div>
        </div>
        <PaymentCard error={error && true} isLoading={isLoading} />
      </form>
    </div>
  );
};
