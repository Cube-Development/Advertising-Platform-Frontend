import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { ArrowIcon4 } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";
import { paymentTypes } from "@shared/config/payment";
import { profileTypesName } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import {
  useCreateLegalMutation,
  useEditLegalMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
} from "@shared/store/services/legalService";
import { usePaymentDepositMutation } from "@shared/store/services/walletService";
import {
  ILegalCard,
  ILegalCardShort,
  IProfileData,
} from "@shared/types/profile";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { ChooseProfile } from "@widgets/wallet/UI/chooseProfile";
import { Guide } from "@widgets/wallet/UI/guide";
import { PaymentData } from "@widgets/wallet/UI/paymentData/UI";
import { TopUpCard } from "@widgets/wallet/UI/topUpCard";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IExtendedProfileData extends IProfileData {
  amount: number;
}

export const WalletTopUp: FC = () => {
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

  const { profileFilter: filter } = useAppSelector((state) => state.filter);

  const {
    data: legalsByType,
    isLoading: isReadLegalsLoading,
    error: readLegalsError,
  } = useReadLegalsByTypeQuery(filter.id);

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

  const [createLegal] = useCreateLegalMutation();

  const [editLegal] = useEditLegalMutation();

  const [paymentDeposit, { error: topupError }] = usePaymentDepositMutation();

  const onSubmit: SubmitHandler<IExtendedProfileData> = async (formData) => {
    const dataWithLegalType = {
      ...formData,
      type_legal: filter.id,
    };
    createLegal(dataWithLegalType)
      .unwrap()
      .then((createRes) => {
        const paymentReq = {
          amount: formData.amount,
          legal_id: createRes.legal_id,
          way_type: paymentTypes.didox,
        };
        paymentDeposit(paymentReq)
          .unwrap()
          .then(() => {
            reset();
            // alert(`Баланс успешно пополнен на сумму: ${paymentReq.amount}`);
            toast({
              variant: "success",
              title: `${t("toasts.wallet.topup.success")}: ${paymentReq.amount.toLocaleString()} ${t("symbol")}`,
            });
          })
          .catch((error) => {
            toast({
              variant: "error",
              title: t("toasts.wallet.topup.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            console.error("Ошибка payment/deposit: ", error);
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
              const paymentReq = {
                amount: Number(formData.amount),
                legal_id: editRes.legal_id,
                way_type: paymentTypes.didox,
              };
              paymentDeposit(paymentReq)
                .unwrap()
                .then(() => {
                  reset();
                  toast({
                    variant: "success",
                    title: `${t("toasts.wallet.topup.success")}: ${paymentReq.amount.toLocaleString()} ${t("symbol")}`,
                  });
                  // alert(
                  //   `Баланс успешно пополнен на сумму: ${paymentReq.amount}`
                  // );
                })
                .catch((error) => {
                  toast({
                    variant: "error",
                    title: t("toasts.wallet.topup.error"),
                    action: <ToastAction altText="Ok">Ok</ToastAction>,
                  });
                  console.error("Ошибка payment/deposit: ", error);
                });
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: t("toasts.wallet.profile.error"),
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
              console.error("Ошибка в editLegal", error);
            });
        }
      });
  };

  return (
    <div className="container sidebar">
      {topupError ? <h1>ОШИБКА В ЗАПРОСЕ</h1> : ""}
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>{t("wallet.topup.title")}</p>
          <ArrowIcon4 />
        </div>
        <BarProfileFilter
          resetValues={reset}
          page={pageFilter.walletTopUp}
          resetActiveAccount={setActiveAccount}
        />
        {filter.type === profileTypesName.selfEmployedAccounts ? (
          <TopUpCard />
        ) : (
          <div>
            <div className={styles.top}>
              <p>{t("wallet.topup.offer")}</p>
            </div>
            <div className={styles.content}>
              <PaymentData
                amountTitle={t("wallet.topup.amount")}
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
        )}
      </div>
    </div>
  );
};
