import { PaymentDidox } from "@features/paymentDidox";
import { ProfileData } from "@features/profileData/UI";
import {
  EntityData,
  IndividualData,
  SelfEmployedCardData,
  SelfEmployedData,
} from "@shared/config/profileData";
import { profileTypesName } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { subprofileFilter } from "@shared/config/profileFilter";

interface PaymentDataProps {
  amountTitle: string;
  register?: any;
  errors?: any;
  watch?: any;
  handleSubmit?: any;
  onSubmit?: any;
}

export const PaymentData: FC<PaymentDataProps> = ({
  amountTitle,
  register,
  errors,
  handleSubmit,
  watch,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const amount = watch("amount", 0);

  const { profileFilter: filter, subprofileFilter: subprofile } =
    useAppSelector((state) => state.filter);

  const typeLegal =
    filter.type === profileTypesName.entities
      ? EntityData
      : filter.type === profileTypesName.individuals
        ? IndividualData
        : filter.type === profileTypesName.selfEmployedAccounts &&
            subprofile.type === subprofileFilter.account
          ? SelfEmployedData
          : SelfEmployedCardData;

  return (
    <form className={styles.payment__data} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.block}>
        <div className={styles.ammount}>
          <p>{amountTitle}</p>
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
              className={errors["amount"] && styles.error}
            />
            <small>{t("symbol")}</small>
          </div>
        </div>
        {typeLegal.map((block, index) => (
          <ProfileData
            data={block}
            inputError={errors}
            register={register}
            key={index}
          />
        ))}
      </div>
      <div className={styles.payment}>
        <div>
          <p>{t("wallet.pay.title")}:</p>
        </div>
        <div>
          <p>
            {amount != 0 ? parseFloat(amount).toLocaleString() : 0}{" "}
            {t("symbol")}
          </p>
          <span>{t("wallet.pay.text")}</span>
        </div>
      </div>
      <div className={styles.accept}>
        <input type="checkbox" />
        <p>
          {`${t("wallet.accept.text1")} `}
          <span>{`${t("wallet.accept.span1")} `}</span>
          {`${t("wallet.accept.and")} `}
          <span>{`${t("wallet.accept.span2")} `}</span>
          {t("wallet.accept.text2")}
        </p>
      </div>
      <div className={styles.accept}>
        <input type="checkbox" />
        <p>{t("wallet.save_data")}</p>
      </div>
      <div className={styles.button}>
        <PaymentDidox />
      </div>
    </form>
  );
};
