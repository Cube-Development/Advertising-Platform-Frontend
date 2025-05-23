import {
  EntityData,
  IExtendedProfileData,
  IndividualData,
  SelfEmployedCardData,
  SelfEmployedData,
  formDataLength,
  PROFILE_TYPE,
  PROFILE_STATUS,
  SUBPROFILE_TYPE,
  withdrawal,
} from "@entities/wallet";
import { LegalForm, PaymentDidox } from "@features/wallet";
import { ENUM_PATHS } from "@shared/routing";
import { CustomCheckbox } from "@shared/ui";
import { FC, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { isValidAmount } from "@shared/utils";

interface PaymentDataProps {
  amountTitle: string;
  profileFilter: {
    type: PROFILE_TYPE;
    id?: PROFILE_STATUS;
  };
  subprofileFilter: {
    type: SUBPROFILE_TYPE;
    id: PROFILE_STATUS;
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
    profileFilter.type === PROFILE_TYPE.ENTITIES
      ? EntityData
      : profileFilter.type === PROFILE_TYPE.INDIVIDUALS
        ? IndividualData
        : profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT &&
            subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT
          ? SelfEmployedData
          : SelfEmployedCardData;

  const [price, setPrice] = useState<number | string>("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, "");
    if (newValue.length > formDataLength.amount || newValue === "0") {
      return;
    }
    setPrice(newValue ? Number(newValue) : "");
  };

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
          <div
            className={`${styles.amount__wrapper} ${errors!["amount"] && styles.error}`}
          >
            <input
              {...register!("amount", {
                required: t("wallet.topup.required"),
                validate: {
                  valid: (value: string) => isValidAmount(value),
                },
                onChange: (e) => handleInput(e),
              })}
              placeholder={t("wallet.topup.placeholder")}
              value={Number.isInteger(price) ? price.toLocaleString() : ""}
              className={styles.input}
              // onChange={(e) => handleInput(e)}
              // onInput={(e) => {
              //   if (
              //     e.currentTarget.value.replace(/\D/g, "").length >
              //     formDataLength.amount
              //   ) {
              //     e.currentTarget.value = e.currentTarget.value.slice(
              //       0,
              //       formDataLength.amount
              //     );
              //   }
              // }}
            />
            <small>{t("symbol")}</small>
            {errors!["amount"] && (
              <p className={styles.error_text}>{t("wallet.topup.required")}</p>
            )}
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
      <div>
        <div className={styles.payment}>
          <div>
            <p>{t("wallet.pay.title")}:</p>
            <span className="!text-start">{t("wallet.pay.sub_title")}</span>
          </div>
          <div>
            <p>
              {Number(formFields?.amount?.replace(/\s/g, "")) != 0
                ? parseFloat(String(price)).toLocaleString()
                : 0}{" "}
              {t("symbol")}
            </p>
            <span>
              {t("wallet.pay.text")}: {withdrawal.commission}%
            </span>
          </div>
        </div>
        <div className="py-5 grid grid-flow-col justify-between items-center gap-2 border-b-[#D9D9D9] border-b-[1px]">
          <p className="font-semibold text-base">
            {t("wallet.pay.will_be_charged")}:
          </p>
          <p className="font-semibold text-base text-[#4D4D4D]">
            {Number(formFields?.amount?.replace(/\s/g, "")) !== 0
              ? (
                  Number(formFields?.amount?.replace(/\s/g, "")) *
                  (1 - withdrawal.commission / 100)
                ).toLocaleString()
              : 0}{" "}
            {t("symbol")}
          </p>
        </div>
      </div>
      <div className={styles.accept}>
        <CustomCheckbox handleChange={() => handleChangeAccept(true, false)} />
        {/* <input
          type="checkbox"
          onClick={() => handleChangeAccept(true, false)}
        /> */}
        <p>
          {t("wallet.accept.text1")}
          <Link to={ENUM_PATHS.SERVICE_RULES} target="_blank">
            {" "}
            {t("wallet.accept.span1")}{" "}
          </Link>
          {`${t("wallet.accept.and")} `}
          <Link to={ENUM_PATHS.PUBLIC_OFFER} target="_blank">
            {t("wallet.accept.span2")}{" "}
          </Link>
          {t("wallet.accept.text2")}
        </p>
      </div>
      <div className={styles.accept}>
        <CustomCheckbox handleChange={() => handleChangeAccept(false, true)} />
        {/* <input
          type="checkbox"
          onClick={() => handleChangeAccept(false, true)}
        /> */}
        <p>{t("wallet.save_data")}</p>
      </div>
      <div className={styles.button}>
        <PaymentDidox isLoading={isPaymentLoading} />
      </div>
    </form>
  );
};
