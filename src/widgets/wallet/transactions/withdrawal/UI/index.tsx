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
import { pageFilter } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Guide, LegalsList, PaymentData } from "../../components";
import styles from "./styles.module.scss";

export const Withdrawal: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState<ILegalCard | null>(null);
  const [screen, setScreen] = useState<number>(window.innerWidth);

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
      ...formData,
      type_legal:
        formState.profileFilter.type === profileTypesName.selfEmployedAccounts
          ? formState.subprofileFilter.id
          : formState.profileFilter.id,
      PNFL: Number(formState.PNFL),
      INN: Number(formState.INN),
      registration_number: Number(formState.registration_number),
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

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container sidebar">
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
