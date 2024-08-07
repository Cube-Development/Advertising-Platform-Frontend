import { ArrowIcon5 } from "@shared/assets";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Guide, LegalsList, PaymentData } from "../../components";
import { BarSubrofileFilter } from "@features/wallet";
import { BarSubfilter } from "@features/other";
import {
  ILegalCard,
  ILegalCardShort,
  ILegalData,
  profileTypesName,
  profileTypesNum,
  subprofileFilterTypes,
  useCreateLegalMutation,
  useEditLegalMutation,
  usePaymentWithdrawalMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
} from "@entities/wallet";
import { ToastAction, useToast } from "@shared/ui";
import { pageFilter } from "@shared/routing";

interface IExtendedProfileData extends ILegalData {
  amount: number;
}

export const Withdrawal: FC = () => {
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
  } = useForm<IExtendedProfileData>({
    defaultValues: {
      profileFilter: {
        type: profileTypesName.selfEmployedAccounts,
        id: profileTypesNum.selfEmployedAccounts,
      },
      subprofileFilter: {
        type: subprofileFilterTypes.account,
        id: profileTypesNum.selfEmployedAccounts,
      },
    },
  });
  const formState = watch();

  const {
    data: legalsByType,
    isLoading: isReadLegalsLoading,
    error: readLegalsError,
  } = useReadLegalsByTypeQuery(
    formState.profileFilter.type === profileTypesName.selfEmployedAccounts
      ? formState.subprofileFilter.id
      : formState.profileFilter.id,
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
          (Object.keys(data) as Array<keyof ILegalData>).forEach(
            (value: keyof ILegalData) => {
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

  const [paymentWithdrawal, { error: withdrowError }] =
    usePaymentWithdrawalMutation();

  const onSubmit: SubmitHandler<IExtendedProfileData> = async (formData) => {
    const dataWithLegalType = {
      ...formData,
      type_legal:
        formState.profileFilter.type === profileTypesName.selfEmployedAccounts
          ? formState.subprofileFilter.id
          : formState.profileFilter.id,
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
        <BarSubfilter
          resetValues={reset}
          page={pageFilter.walletWithdraw}
          resetActiveAccount={setActiveAccount}
          profileFilter={formState.profileFilter}
          changeProfile={(profileFilter) =>
            setValue("profileFilter", profileFilter)
          }
        />
        <div>
          {formState.profileFilter.type ===
            profileTypesName.selfEmployedAccounts && (
            <div className={styles.subbar}>
              <BarSubrofileFilter
                resetActiveAccount={setActiveAccount}
                resetValues={reset}
                subprofileFilter={formState.subprofileFilter}
                changeSubprofile={(subprofile: {
                  type: subprofileFilterTypes;
                  id: profileTypesNum;
                }) => setValue("subprofileFilter", subprofile)}
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
              profileFilter={formState.profileFilter}
              subprofileFilter={formState.subprofileFilter}
            />
            <div>
              <div className={styles.content__right}>
                <LegalsList
                  accounts={legalsByType}
                  changeActiveAccount={changeActiveAccount}
                  activeAccount={activeAccount}
                  isReadLegalsLoading={isReadLegalsLoading}
                  isOneLegalLoading={isOneLegalLoading}
                  readLegalsError={readLegalsError}
                  oneLegalError={oneLegalError}
                />
                <Guide profileFilter={formState.profileFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
