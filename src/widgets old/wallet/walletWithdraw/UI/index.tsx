import { BarProfileFilter } from "src/features old/barProfileFilter/UI";
import { BarSubrofileFilter } from "src/features old/barSubprofileFilter";
import { ArrowIcon5 } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";
import { profileTypesName } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import {
  useCreateLegalMutation,
  useEditLegalMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
} from "@shared/store/services/legalService";
import { usePaymentWithdrawalMutation } from "@shared/store/services/walletService";
import {
  ILegalCard,
  ILegalCardShort,
  IProfileData,
} from "@shared/types/profile";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IExtendedProfileData extends IProfileData {
  amount: number;
}

export const WalletWithdraw: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState<ILegalCard | null>(null);

  const {
    setValue,
    watch,
    reset,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IExtendedProfileData>();

  const { profileFilter: filter, subprofileFilter } = useAppSelector(
    (state) => state.filter,
  );

  const {
    data: legalsByType,
    isLoading: isReadLegalsLoading,
    error: readLegalsError,
  } = useReadLegalsByTypeQuery(
    filter.type === profileTypesName.selfEmployedAccounts
      ? subprofileFilter.id
      : filter.id,
  );

  const [readOneLegal, { isLoading: isOneLegalLoading, error: oneLegalError }] =
    useReadOneLegalMutation();

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
          clearErrors();
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.wallet.profile.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("Ошибка при заполнении данных", error);
        });
    }
  };

  const [createLegal, { isLoading: isCreateLoading, error: createError }] =
    useCreateLegalMutation();

  const [editLegal, { isLoading: isEditLoading, error: editError }] =
    useEditLegalMutation();

  const [
    paymentWithdrawal,
    { isLoading: withdrowIsLoading, error: withdrowError },
  ] = usePaymentWithdrawalMutation();

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
        paymentWithdrawal(paymentReq)
          .unwrap()
          .then(() => reset())
          .catch((error) => {
            toast({
              variant: "error",
              title: t("toasts.wallet.withdraw.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            console.error("Ошибка payment/paymentWithdrawal: ", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка в createLegal", error);
        if (error.status === 400 && error.data.value) {
          const newFormData = {
            ...dataWithLegalType,
            legal_id: error.data.value,
          };
          editLegal(newFormData)
            .unwrap()
            .then((editRes) => {
              toast({
                variant: "success",
                title: t("toasts.add_profile.edit.success"),
              });
              const paymentReq = {
                amount: Number(formData.amount),
                legal_id: editRes.legal_id,
              };
              paymentWithdrawal(paymentReq)
                .unwrap()
                .then(() => reset())
                .catch((error) => {
                  toast({
                    variant: "error",
                    title: t("toasts.wallet.withdraw.error"),
                    action: <ToastAction altText="Ok">Ok</ToastAction>,
                  });
                  console.error("Ошибка payment/paymentWithdrawal: ", error);
                });
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.add_profile.edit.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка в editLegal", error);
            });
        }
      });
  };

  return (
    <div className="container sidebar">
      {withdrowError ? <h1>ОШИБКА В ЗАПРОСЕ</h1> : ""}
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
            {/* <PaymentData
              amountTitle={t("wallet.withdraw.amount")}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              watch={watch}
            /> */}
            <div>
              <div className={styles.content__right}>
                {/* <ChooseProfile
                  accounts={legalsByType}
                  changeActiveAccount={changeActiveAccount}
                  activeAccount={activeAccount}
                  isReadLegalsLoading={isReadLegalsLoading}
                  isOneLegalLoading={isOneLegalLoading}
                  readLegalsError={readLegalsError}
                  oneLegalError={oneLegalError}
                />
                <Guide /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
