import {
  EntityData,
  ENUM_WALLETS_TYPE,
  IExtendedProfileData,
  IndividualData,
  PROFILE_STATUS,
  PROFILE_TYPE,
  SelfEmployedCardData,
  SelfEmployedData,
  SUBPROFILE_TYPE,
  TOP_UP_AMOUNT,
  topup,
  withdrawal,
} from "@entities/wallet";
import { PaymentDidox } from "@features/wallet";
import { ENUM_PATHS } from "@shared/routing";
import {
  cn,
  CustomBlockData,
  CustomCheckbox,
  CustomInput,
  IParameterData,
} from "@shared/ui";
import {
  formatWithOutSpaces,
  formatWithSpaces,
  getCommissionAmount,
} from "@shared/utils";
import { FC, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useMaxWithdraw } from "../../model";
import styles from "./styles.module.scss";

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
  errors: FieldErrors<IExtendedProfileData>;
  formState: IExtendedProfileData;
  setValue: UseFormSetValue<IExtendedProfileData>;
  register: UseFormRegister<IExtendedProfileData>;
  onSubmit: SubmitHandler<IExtendedProfileData>;
  handleSubmit: UseFormHandleSubmit<IExtendedProfileData, IExtendedProfileData>;
  isPaymentLoading: boolean;
  isTopUp?: boolean;
  walletType?: ENUM_WALLETS_TYPE;
}

export const PaymentData: FC<PaymentDataProps> = ({
  amountTitle,
  profileFilter,
  subprofileFilter,
  errors,
  formState,
  setValue,
  register,
  onSubmit,
  handleSubmit,
  isPaymentLoading,
  isTopUp = false,
  walletType = ENUM_WALLETS_TYPE.DEPOSIT,
}) => {
  const { t } = useTranslation();
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

  const handleChangeAccept = (serviceRules: boolean, saveData: boolean) => {
    if (serviceRules) {
      setIsAccept({ ...isAccept, serviceRules: !isAccept.serviceRules });
    } else if (saveData) {
      setIsAccept({ ...isAccept, saveData: !isAccept.saveData });
    }
  };

  const { commissionAmount, receivedAmount, finallyAmount } =
    getCommissionAmount(
      formatWithOutSpaces(formState?.amount),
      topup.commission,
      isTopUp ? !!formState?.is_fee_included : true,
    );

  const { isMaxAmount, setIsMaxAmount, maxWithdraw } = useMaxWithdraw(
    formatWithOutSpaces(formState?.amount),
    walletType,
  );

  const handleMaxAmount = () => {
    if (!isMaxAmount) {
      setValue!("amount", maxWithdraw.toString());
    } else {
      setValue!("amount", "");
    }
    setIsMaxAmount(!isMaxAmount);
  };

  const amountText = t(amountTitle, {
    returnObjects: true,
  }) as IParameterData;

  return (
    <form
      className={cn(styles.payment__data, "frame")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.block}>
        <div className={styles.amount}>
          <CustomInput
            {...register!("amount", { ...TOP_UP_AMOUNT(t) })}
            maxLength={12}
            label={amountText?.title}
            information={amountText?.description}
            placeholder={amountText?.placeholder}
            value={formatWithSpaces(formState?.amount)}
            error={errors?.amount}
            error_message={errors?.amount?.message}
          />
          {!isTopUp && (
            <div className={styles.max_include}>
              <CustomCheckbox
                isSelected={isMaxAmount}
                handleChange={handleMaxAmount}
              />
              <p>{t("wallet.commission.withdraw_all")}</p>
            </div>
          )}
        </div>
        {typeLegal.map((block, index) => (
          <CustomBlockData
            data={block}
            inputError={errors}
            register={register}
            key={index}
            disabled
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
              {finallyAmount.toLocaleString()} {t("symbol")}
            </p>
            <span>
              {t("wallet.pay.text")}: {withdrawal.commission}% -{" "}
              {commissionAmount.toLocaleString()} {t("symbol")}
            </span>
          </div>
        </div>
        <div className="py-5 grid grid-flow-col justify-between items-center gap-2 border-b-[#D9D9D9] border-b-[1px]">
          <p className="text-base font-semibold">
            {t("wallet.pay.will_be_charged")}:
          </p>
          <p className="font-semibold text-base text-[#4D4D4D]">
            {receivedAmount.toLocaleString()} {t("symbol")}
          </p>
        </div>
      </div>
      {isTopUp && (
        <div className={styles.fee_include}>
          <CustomCheckbox
            isSelected={formState?.is_fee_included}
            handleChange={() =>
              setValue("is_fee_included", !formState?.is_fee_included)
            }
          />
          <p>{t("wallet.commission.include")}</p>
        </div>
      )}
      <div className={styles.accept}>
        <CustomCheckbox handleChange={() => handleChangeAccept(true, false)} />
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
        <p>{t("wallet.save_data")}</p>
      </div>
      <div className={styles.button}>
        <PaymentDidox isLoading={isPaymentLoading} />
      </div>
    </form>
  );
};
