import {
  IExtendedProfileData,
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
import { BarSubfilter } from "@features/other";
import { BarSubrofileFilter } from "@features/wallet";
import { ArrowIcon5 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { pageFilter, paths } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Guide, LegalsList, PaymentData } from "../../components";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "@shared/hooks";

export const Withdrawal: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState<ILegalCard | null>(null);
  const screen = useWindowWidth();
  const navigate = useNavigate();

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
  const [paymentWithdrawal, { isLoading: isPaymentLoading }] =
    usePaymentWithdrawalMutation();
  const [createLegal, { isLoading: isCreateLoading }] =
    useCreateLegalMutation();
  const [editLegal, { isLoading: isEditLoading }] = useEditLegalMutation();

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

  const onSubmit: SubmitHandler<IExtendedProfileData> = async (formData) => {
    const dataWithLegalType = {
      name: formState.name,
      bank_name: formState.bank_name,
      bank_mfo: formState.bank_mfo,
      phone: formState.phone,
      email: formState.email,
      profileFilter: formState.profileFilter,
      subprofileFilter: formState.subprofileFilter,

      // юр.лицо
      ...(formState.profileFilter.id === profileTypesNum.entities && {
        INN: formState.INN,
      }),
      ...(formState.profileFilter.id === profileTypesNum.entities && {
        address: formState.address,
      }),
      ...(formState.profileFilter.id === profileTypesNum.entities && {
        checking_account: formState.checking_account,
      }),
      ...(formState.profileFilter.id === profileTypesNum.entities && {
        type_legal: formState.profileFilter.id,
      }),

      // ИП
      ...(formState.profileFilter.id === profileTypesNum.individuals && {
        INN: formState.INN,
      }),
      ...(formState.profileFilter.id === profileTypesNum.individuals && {
        address: formState.address,
      }),
      ...(formState.profileFilter.id === profileTypesNum.individuals && {
        checking_account: formState.checking_account,
      }),
      ...(formState.profileFilter.id === profileTypesNum.individuals && {
        type_legal: formState.profileFilter.id,
      }),

      // самозанятый р/с
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.account && {
          PNFL: formState.PNFL,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.account && {
          checking_account: formState.checking_account,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.account && {
          registration_date: formState.registration_date,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.account && {
          registration_number: formState.registration_number,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.account && {
          type_legal: profileTypesNum.selfEmployedAccounts,
        }),

      // самозанятый т/с
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          PNFL: formState.PNFL,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          transit_account: formState.transit_account,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          registration_date: formState.registration_date,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          registration_number: formState.registration_number,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          card_number: formState.card_number,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          card_date: formState.card_date,
        }),
      ...(formState.profileFilter.id === profileTypesNum.selfEmployedAccounts &&
        formState.subprofileFilter.type === subprofileFilterTypes.card && {
          type_legal: profileTypesNum.selfEmployedTransits,
        }),
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
          .then(() => {
            reset();
            navigate(paths.wallethistory);
            toast({
              variant: "success",
              title: `${t("toasts.wallet.withdraw.success")}: ${paymentReq.amount.toLocaleString()} ${t("symbol")}`,
            });
          })
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
              const paymentReq = {
                amount: Number(formData.amount),
                legal_id: editRes.legal_id,
              };
              paymentWithdrawal(paymentReq)
                .unwrap()
                .then(() => {
                  reset();
                  navigate(paths.wallethistory);
                  toast({
                    variant: "success",
                    title: `${t("toasts.wallet.withdraw.success")}: ${paymentReq.amount.toLocaleString()} ${t("symbol")}`,
                  });
                })
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
    <div className="container">
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
        <div className={styles.form__wrapper}>
          {screen < BREAKPOINT.MD && (
            <Guide profileFilter={formState.profileFilter} />
          )}
          <div className={styles.top}>
            <p>{t("wallet.withdraw.offer")}</p>
          </div>
          {formState.profileFilter.type ===
            profileTypesName.selfEmployedAccounts && (
            <BarSubrofileFilter
              resetActiveAccount={setActiveAccount}
              resetValues={reset}
              subprofileFilter={formState.subprofileFilter}
              changeSubprofile={(subprofile: {
                type: subprofileFilterTypes;
                id: profileTypesNum;
              }) => setValue("subprofileFilter", subprofile)}
            />
          )}
          {screen < BREAKPOINT.LG && (
            <LegalsList
              accounts={legalsByType}
              changeActiveAccount={changeActiveAccount}
              activeAccount={activeAccount}
              isReadLegalsLoading={isReadLegalsLoading}
              isOneLegalLoading={isOneLegalLoading}
              readLegalsError={readLegalsError}
              oneLegalError={oneLegalError}
            />
          )}
          <div className={styles.content}>
            <PaymentData
              amountTitle={t("wallet.withdraw.amount")}
              profileFilter={formState.profileFilter}
              subprofileFilter={formState.subprofileFilter}
              errors={errors}
              watch={watch}
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              isPaymentLoading={
                isCreateLoading || isEditLoading || isPaymentLoading
              }
            />
            <div>
              <div className={styles.content__right}>
                {screen >= BREAKPOINT.LG && (
                  <LegalsList
                    accounts={legalsByType}
                    changeActiveAccount={changeActiveAccount}
                    activeAccount={activeAccount}
                    isReadLegalsLoading={isReadLegalsLoading}
                    isOneLegalLoading={isOneLegalLoading}
                    readLegalsError={readLegalsError}
                    oneLegalError={oneLegalError}
                  />
                )}
                {screen >= BREAKPOINT.MD && (
                  <Guide profileFilter={formState.profileFilter} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
