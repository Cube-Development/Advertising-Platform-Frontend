import { paymentTypes, TOP_UP_AMOUNT, topup } from "@entities/wallet";
import { PaymentCard } from "@features/wallet";
import { CardIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import {
  cn,
  CustomCheckbox,
  CustomInput,
  IParameterData,
  ToastAction,
  useToast,
} from "@shared/ui";
import {
  formatWithOutSpaces,
  formatWithSpaces,
  getCommissionAmount,
} from "@shared/utils";
import { TOP_UP_CARD_TYPES } from "@widgets/wallet/transactions/model";
import { InfoIcon } from "lucide-react";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface IOnlineBankingData {
  legal_id: string;
  way_type: paymentTypes;
  amount: string;
  is_fee_included?: boolean;
}

export const CreditCard: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    watch,
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<IOnlineBankingData>({
    mode: "onChange",
    defaultValues: {
      legal_id: "3754ba1c-132e-4c2d-b4fd-943c32de8a0c",
      way_type: paymentTypes.payme,
      amount: "",
      is_fee_included: false,
    },
  });

  const formState = watch();

  const { commissionAmount, receivedAmount, finallyAmount } =
    getCommissionAmount(
      formatWithOutSpaces(formState?.amount),
      topup.commission,
      !!formState?.is_fee_included,
    );

  const onSubmit: SubmitHandler<IOnlineBankingData> = async (data) => {
    // const formData = {
    //   ...data,
    //   amount: formatWithOutSpaces(data?.amount),
    // };
    // !isLoading &&
    //   paymentDeposit(formData)
    //     .unwrap()
    //     .then(() => {
    //       reset();
    //       toast({
    //         variant: "success",
    //         title: `${t("toasts.wallet.topup.success")}: ${formData.amount.toLocaleString()} ${t("symbol")}`,
    //       });
    //       navigate(ENUM_PATHS.MAIN);
    //     })
    //     .catch((error) => {
    //       toast({
    //         variant: "error",
    //         title: t("toasts.wallet.topup.error"),
    //         action: <ToastAction altText="Ok">Ok</ToastAction>,
    //       });
    //       console.error("Ошибка payment/deposit: ", error);
    //     });
  };

  const amountText = t("wallet.topup.amount", {
    returnObjects: true,
  }) as IParameterData;

  return (
    <div className={styles.card}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(styles.form, "frame relative")}
      >
        <div className={styles.icon}>
          <CardIcon />
        </div>
        <div className={styles.data}>
          <div className={styles.payment__card}>
            <p>{t("wallet.choose")}</p>
            <div>
              {TOP_UP_CARD_TYPES.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setValue("way_type", item.type)}
                  className={
                    formState.way_type === item.type
                      ? styles.active__payment
                      : styles.payment_item
                  }
                >
                  <img src={item.img} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.amount}>
            <CustomInput
              {...register("amount", { ...TOP_UP_AMOUNT(t) })}
              maxLength={12}
              label={amountText?.title}
              information={amountText?.description}
              placeholder={amountText?.placeholder}
              value={formatWithSpaces(formState?.amount)}
              error={errors?.amount}
              error_message={errors?.amount?.message}
            />
          </div>
          <div className={styles.conditions}>
            <div className={styles.conditions__right}>
              <InfoIcon color="#BDBDBD" />
            </div>
            <div className={styles.conditions__left}>
              <div>
                <p>{t("wallet.conditions.commission")} </p>
                <span>{topup.commission} %</span>
              </div>
              <div>
                <p>{t("wallet.conditions.min")} </p>
                <span>
                  {topup.min.toLocaleString()} {t("symbol")}
                </span>
              </div>
              <div>
                <p>{t("wallet.conditions.max")} </p>
                <span>
                  {topup.max.toLocaleString()} {t("symbol")}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.commission}>
            <p className="truncate">
              {t("wallet.commission.title")}: {topup.commission} % ={" "}
              {commissionAmount.toLocaleString()} {t("symbol")}
            </p>
            <p className="truncate">
              {t("wallet.commission.enrollment")}:{" "}
              <span>
                {receivedAmount.toLocaleString()} {t("symbol")}
              </span>
            </p>
          </div>
          <div className={styles.fee_include}>
            <CustomCheckbox
              isSelected={formState?.is_fee_included}
              handleChange={() =>
                setValue("is_fee_included", !formState?.is_fee_included)
              }
            />
            <p>{t("wallet.commission.include")}</p>
          </div>
          <div className={styles.finally}>
            <p>{t("wallet.finally")}:</p>
            <span className="truncate">
              {finallyAmount.toLocaleString()} {t("symbol")}
            </span>
          </div>
        </div>
        <PaymentCard />
        <div className="backdrop-blur-[10px] absolute top-0 right-0 w-full h-full bg-gray-300/10 z-10 flex items-center justify-center rounded-[24px]">
          <p className="!text-gray-500 md:!text-sm !text-xs !font-medium">
            Doesn't work yet :(
          </p>
        </div>
      </form>
    </div>
  );
};
