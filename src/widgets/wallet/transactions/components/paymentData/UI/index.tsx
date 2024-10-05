import {
  EntityData,
  IExtendedProfileData,
  IndividualData,
  SelfEmployedCardData,
  SelfEmployedData,
  profileTypesName,
  profileTypesNum,
  subprofileFilterTypes,
} from "@entities/wallet";
import { LegalForm, PaymentDidox } from "@features/wallet";
import { FC, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PaymentDataProps {
  amountTitle: string;
  profileFilter: {
    type: profileTypesName;
    id?: profileTypesNum;
  };
  subprofileFilter: {
    type: subprofileFilterTypes;
    id: profileTypesNum;
  };
  errors?: FieldErrors<IExtendedProfileData>;
  watch?: UseFormWatch<IExtendedProfileData>;
  register?: UseFormRegister<IExtendedProfileData>;
  onSubmit?: SubmitHandler<IExtendedProfileData>;
  handleSubmit?: UseFormHandleSubmit<
    IExtendedProfileData,
    IExtendedProfileData
  >;
  isPaymentLoading: boolean;
}

export const PaymentData: FC<PaymentDataProps> = ({
  amountTitle,
  profileFilter,
  subprofileFilter,
  errors,
  watch,
  onSubmit,
  register,
  handleSubmit,
  isPaymentLoading,
}) => {
  const { t } = useTranslation();
  const formFields = watch!();
  const accept = {
    serviceRules: false,
    saveData: false,
  };
  const [isAccept, setIsAccept] = useState<typeof accept>(accept);

  const typeLegal =
    profileFilter.type === profileTypesName.entities
      ? EntityData
      : profileFilter.type === profileTypesName.individuals
        ? IndividualData
        : profileFilter.type === profileTypesName.selfEmployedAccounts &&
            subprofileFilter.type === subprofileFilterTypes.account
          ? SelfEmployedData
          : SelfEmployedCardData;

  const [price, setPrice] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, "");
    if (newValue.length > 10 || newValue == "0") {
      return;
    }
    setPrice(newValue);
  };
  // const formattedPrice = price === "" ? "" : Number(price).toLocaleString();
  // console.log("price", price)

  const handleChangeAccept = (serviceRules: boolean, saveData: boolean) => {
    if (serviceRules) {
      setIsAccept({ ...isAccept, serviceRules: !isAccept.serviceRules });
    } else if (saveData) {
      setIsAccept({ ...isAccept, saveData: !isAccept.saveData });
    }
  };

  return (
    <form className={styles.payment__data} onSubmit={handleSubmit!(onSubmit!)}>
      <div className={styles.block}>
        <div className={styles.ammount}>
          <p className={styles.title}>{amountTitle}</p>
          <div>
            <input
              {...register!("amount", {
                required: t("wallet.topup.required"),
                onChange: (e) => handleInput(e),
              })}
              placeholder={
                errors!["amount"]
                  ? errors!["amount"].message
                  : t("wallet.topup.placeholder")
              }
              value={price}
              maxLength={10}
              className={errors!["amount"] && styles.error}
            />
            <small>{t("symbol")}</small>
          </div>
        </div>
        {typeLegal.map((block, index) => (
          <LegalForm
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
            {formFields.amount != 0
              ? parseFloat(String(formFields.amount)).toLocaleString()
              : 0}{" "}
            {t("symbol")}
          </p>
          <span>{t("wallet.pay.text")}</span>
        </div>
      </div>
      <div className={styles.accept}>
        <input
          type="checkbox"
          onClick={() => handleChangeAccept(true, false)}
        />
        <p>
          {`${t("wallet.accept.text1")} `}
          <span>{`${t("wallet.accept.span1")} `}</span>
          {`${t("wallet.accept.and")} `}
          <span>{`${t("wallet.accept.span2")} `}</span>
          {t("wallet.accept.text2")}
        </p>
      </div>
      <div className={styles.accept}>
        <input
          type="checkbox"
          onClick={() => handleChangeAccept(false, true)}
        />
        <p>{t("wallet.save_data")}</p>
      </div>
      <div className={styles.button}>
        <PaymentDidox isLoading={isPaymentLoading} />
      </div>
    </form>
  );
};
