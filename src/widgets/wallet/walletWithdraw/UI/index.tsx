import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { ArrowIcon5 } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";
import { profileTypesName } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import {
  ILegalCard,
  ILegalCardShort,
  IProfileData,
} from "@shared/types/profile";
import { ChooseProfile } from "@widgets/wallet/UI/chooseProfile";
import { Guide } from "@widgets/wallet/UI/guide";
import { PaymentData } from "@widgets/wallet/UI/paymentData/UI";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BarSubrofileFilter } from "@features/barSubprofileFilter";
import { legalAPI } from "@shared/store/services/legalService";
import { walletAPI } from "@shared/store/services/walletService";

interface IExtendedProfileData extends IProfileData {
  amount: number;
}

export const WalletWithdraw: FC = () => {
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState<ILegalCard | null>(null);

  const {
    setValue,
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IExtendedProfileData>();

  const { profileFilter: filter, subprofileFilter } = useAppSelector(
    (state) => state.filterReducer,
  );

  const {
    data: legalsByType,
    isLoading: isReadLegalsLoading,
    error: readLegalsError,
  } = legalAPI.useReadLegalsByTypeQuery(
    filter.type === profileTypesName.selfEmployedAccounts
      ? subprofileFilter.id
      : filter.id,
  );

  const [readOneLegal, { isLoading: isOneLegalLoading, error: oneLegalError }] =
    legalAPI.useReadOneLegalMutation();

  const changeActiveAccount = async (account: ILegalCardShort) => {
    if (activeAccount && account.legal_id === activeAccount.legal_id) {
      setActiveAccount(null);
      reset();
    } else {
      readOneLegal(account.legal_id)
        .unwrap()
        .then((data) => {
          setActiveAccount(data);
          (Object.keys(data) as Array<keyof IProfileData>).forEach(
            (value: keyof IProfileData) => {
              setValue(value, data[value]);
            },
          );
        })
        .catch((error) => {
          console.error("Ошибка при заполнении данных", error);
        });
    }
  };

  const [createLegal, { isLoading: isCreateLoading, error: createError }] =
    legalAPI.useCreateLegalMutation();

  const [editLegal, { isLoading: isEditLoading, error: editError }] =
    legalAPI.useEditLegalMutation();

  const [paymentDeposit, { isLoading: isTopupLoading, error: topupError }] =
    walletAPI.usePaymentDepositMutation();

  const onSubmit: SubmitHandler<IExtendedProfileData> = async (formData) => {
    const dataWithLegalType = {
      ...formData,
      type_legal:
        filter.type === profileTypesName.selfEmployedAccounts
          ? subprofileFilter.id
          : filter.id,
    };
    createLegal(dataWithLegalType)
      .unwrap()
      .then((createRes) => {
        const paymentReq = {
          amount: formData.amount,
          legal_id: createRes.legal_id,
        };
        paymentDeposit(paymentReq)
          .unwrap()
          .then(() => reset());
      })
      .catch((error) => {
        console.error("Ошибка в createLegal", error);
        if (error.status === 400 && error.data.value) {
          const newFormData = { ...formData, legal_id: error.data.value };
          editLegal(newFormData)
            .unwrap()
            .then((editRes) => {
              const paymentReq = {
                amount: Number(formData.amount),
                legal_id: editRes.legal_id,
              };
              paymentDeposit(paymentReq)
                .unwrap()
                .then(() => reset())
                .catch((error) =>
                  console.error("Ошибка payment/deposit: ", error),
                );
            })
            .catch((error) => {
              console.error("Ошибка в editLegal", error);
            });
        }
      });
  };

  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>{t("wallet.withdraw.title")}</p>
          <ArrowIcon5 />
        </div>
        <BarProfileFilter
          resetValues={reset}
          page={pageFilter.walletWithdraw}
          resetActiveAccount={setActiveAccount}
        />
        <div>
          {filter.type === profileTypesName.selfEmployedAccounts && (
            <div className={styles.subbar}>
              <BarSubrofileFilter
                resetActiveAccount={setActiveAccount}
                resetValues={reset}
              />
            </div>
          )}
          <div className={styles.top}>
            <p>{t("wallet.withdraw.offer")}</p>
          </div>
          <div className={styles.content}>
            <PaymentData
              amountTitle={t("wallet.withdraw.amount")}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              watch={watch}
            />
            <div>
              <div className={styles.content__right}>
                <ChooseProfile
                  accounts={legalsByType}
                  changeActiveAccount={changeActiveAccount}
                  activeAccount={activeAccount}
                  isReadLegalsLoading={isReadLegalsLoading}
                  isOneLegalLoading={isOneLegalLoading}
                  readLegalsError={readLegalsError}
                  oneLegalError={oneLegalError}
                />
                <Guide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
