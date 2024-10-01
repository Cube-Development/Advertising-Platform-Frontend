import {
  ILegalCard,
  ILegalCardShort,
  ILegalData,
  paymentTypes,
  profileTypesName,
  profileTypesNum,
  subprofileFilterTypes,
  useCreateLegalMutation,
  useEditLegalMutation,
  usePaymentDepositMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
} from "@entities/wallet";
import { BarSubfilter } from "@features/other";
import { ArrowIcon4 } from "@shared/assets";
import { pageFilter, paths } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Guide, LegalsList, PaymentData } from "../../components";
import { CreditCard } from "./creditCard";
import styles from "./styles.module.scss";
import { BREAKPOINT } from "@shared/config";

interface IExtendedProfileData extends ILegalData {
  amount: number;
}

export const Topup: FC = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState<ILegalCard | null>(null);
  const navigate = useNavigate();
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
  } = useReadLegalsByTypeQuery(formState.profileFilter.id);

  const [readOneLegal, { isLoading: isOneLegalLoading, error: oneLegalError }] =
    useReadOneLegalMutation();

  const [createLegal] = useCreateLegalMutation();

  const [editLegal] = useEditLegalMutation();

  const [paymentDeposit] = usePaymentDepositMutation();

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
      type_legal: formState.profileFilter.id,
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
          way_type: paymentTypes.didox,
        };
        paymentDeposit(paymentReq)
          .unwrap()
          .then(() => {
            reset();
            navigate(paths.main);
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
                  navigate(paths.main);
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
          <p>{t("wallet.topup.title")}</p>
          <ArrowIcon4 />
        </div>
        <BarSubfilter
          resetValues={reset}
          page={pageFilter.walletTopUp}
          resetActiveAccount={setActiveAccount}
          profileFilter={formState.profileFilter}
          changeProfile={(profileFilter) =>
            setValue("profileFilter", profileFilter)
          }
        />
        {formState.profileFilter.type ===
        profileTypesName.selfEmployedAccounts ? (
          <CreditCard />
        ) : (
          <div className={styles.form__wrapper}>
            {screen < BREAKPOINT.MD && (
              <Guide profileFilter={formState.profileFilter} />
            )}
            <div className={styles.top}>
              <p>{t("wallet.topup.offer")}</p>
            </div>
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
                amountTitle={t("wallet.topup.amount")}
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
        )}
      </div>
    </div>
  );
};
