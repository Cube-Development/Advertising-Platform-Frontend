import {
  ENUM_WALLETS_TYPE,
  IExtendedProfileData,
  ILegalCard,
  ILegalCardShort,
  ILegalData,
  PROFILE_FILTER_TABS_LIST,
  PROFILE_STATUS,
  PROFILE_TYPE,
  SUBPROFILE_TYPE,
  useCreateLegalMutation,
  useEditLegalMutation,
  usePaymentWithdrawalMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
  WithdrawSuccessCard,
} from "@entities/wallet";
import { ArrowIcon5 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  useAppSelector,
  useClearCookiesOnPage,
  useWindowWidth,
} from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { WalletsBar } from "@widgets/wallet";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Guide, PaymentData } from "../../components";
import styles from "./styles.module.scss";

export const Withdrawal: FC = () => {
  useClearCookiesOnPage();
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
    formState: { errors, isSubmitted },
  } = useForm<IExtendedProfileData>({
    defaultValues: {
      profileFilter: {
        type: PROFILE_TYPE.ENTITIES,
        id: PROFILE_STATUS.ENTITIES,
      },
      // subprofileFilter: {
      //   type: SUBPROFILE_TYPE.ACCOUNT,
      //   id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      // },
    },
  });
  const formState = watch();

  const resetValues = () => {
    setActiveAccount(null);
  };

  const changeTab = (filter: PROFILE_TYPE) => {
    const item = PROFILE_FILTER_TABS_LIST.find((item) => item.type === filter)!;
    const newFilter = { type: item?.type, id: item?.id };
    setValue("profileFilter", newFilter);
  };

  const {
    data: legalsByType,
    isLoading: isReadLegalsLoading,
    error: readLegalsError,
  } = useReadLegalsByTypeQuery(
    formState.profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT
      ? formState.subprofileFilter.id
      : formState.profileFilter.id,
  );

  const [readOneLegal, { isLoading: isOneLegalLoading, error: oneLegalError }] =
    useReadOneLegalMutation();
  const [paymentWithdrawal, { isLoading: isPaymentLoading, isSuccess }] =
    usePaymentWithdrawalMutation();
  const [createLegal, { isLoading: isCreateLoading }] =
    useCreateLegalMutation();
  const [editLegal, { isLoading: isEditLoading }] = useEditLegalMutation();

  const changeActiveAccount = async (account: ILegalCardShort) => {
    if (activeAccount && account.legal_id === activeAccount.legal_id) {
      setActiveAccount(null);
      reset();
    } else {
      !isOneLegalLoading &&
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

  useEffect(() => {
    if (!legalsByType?.length) return;
    changeActiveAccount(legalsByType?.[0]);
  }, [legalsByType]);

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
      ...(formState.profileFilter.id === PROFILE_STATUS.ENTITIES && {
        INN: formState.INN,
      }),
      ...(formState.profileFilter.id === PROFILE_STATUS.ENTITIES && {
        address: formState.address,
      }),
      ...(formState.profileFilter.id === PROFILE_STATUS.ENTITIES && {
        checking_account: formState.checking_account,
      }),
      ...(formState.profileFilter.id === PROFILE_STATUS.ENTITIES && {
        type_legal: formState.profileFilter.id,
      }),

      // ИП
      ...(formState.profileFilter.id === PROFILE_STATUS.INDIVIDUALS && {
        INN: formState.INN,
      }),
      ...(formState.profileFilter.id === PROFILE_STATUS.INDIVIDUALS && {
        address: formState.address,
      }),
      ...(formState.profileFilter.id === PROFILE_STATUS.INDIVIDUALS && {
        checking_account: formState.checking_account,
      }),
      ...(formState.profileFilter.id === PROFILE_STATUS.INDIVIDUALS && {
        type_legal: formState.profileFilter.id,
      }),

      // самозанятый р/с
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT && {
          PNFL: formState.PNFL,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT && {
          checking_account: formState.checking_account,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT && {
          registration_date: formState.registration_date,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT && {
          registration_number: formState.registration_number,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.ACCOUNT && {
          type_legal: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
        }),

      // самозанятый т/с
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          PNFL: formState.PNFL,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          transit_account: formState.transit_account,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          registration_date: formState.registration_date,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          registration_number: formState.registration_number,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          card_number: formState.card_number,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          card_date: formState.card_date,
        }),
      ...(formState.profileFilter.id === PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT &&
        formState.subprofileFilter.type === SUBPROFILE_TYPE.CARD && {
          type_legal: PROFILE_STATUS.SELF_EMPLOYED_TRANSIT,
        }),
    };
    !isCreateLoading &&
      createLegal(dataWithLegalType)
        .unwrap()
        .then((createRes) => {
          const paymentReq = {
            amount: Number(formState.amount.replace(/\s/g, "")),
            legal_id: createRes.legal_id,
          };
          paymentWithdrawal(paymentReq)
            .unwrap()
            .then(() => {
              reset();
              navigate(ENUM_PATHS.WALLET_HISTORY);
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
                  amount: Number(formState.amount.replace(/\s/g, "")),
                  legal_id: editRes.legal_id,
                };
                console.log("paymentReq", paymentReq, formData.amount);
                paymentWithdrawal(paymentReq)
                  .unwrap()
                  .then(() => {
                    reset();
                    navigate(ENUM_PATHS.WALLET_HISTORY);
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

  const [walletType, setWalletType] = useState<ENUM_WALLETS_TYPE>(
    ENUM_WALLETS_TYPE.DEPOSIT,
  );
  return (
    <div className="container">
      <div className={styles.wrapper}>
        {isSuccess ? (
          <WithdrawSuccessCard />
        ) : (
          <>
            <div className={styles.title}>
              <p>{t("wallet.withdraw.title")}</p>
              <ArrowIcon5 />
            </div>
            {/* <BarSubFilter
          tab={formState.profileFilter.type}
          tab_list={PROFILE_FILTER_TABS_LIST}
          changeTab={changeTab}
          resetValues={resetValues}
        /> */}
            <div className={styles.form__wrapper}>
              {screen < BREAKPOINT.MD && (
                <Guide profileFilter={formState.profileFilter} />
              )}
              {/* <div className={styles.top}>
            <p>{t("wallet.withdraw.offer")}</p>
          </div> */}
              <WalletsBar
                walletType={walletType}
                setWalletType={setWalletType}
              />
              {/* {formState.profileFilter.type ===
            PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT && (
            <BarSubrofileFilter
              resetActiveAccount={setActiveAccount}
              resetValues={reset}
              subprofileFilter={formState.subprofileFilter}
              changeSubprofile={(subprofile: {
                type: SUBPROFILE_TYPE;
                id: PROFILE_STATUS;
              }) => setValue("subprofileFilter", subprofile)}
            />
          )} */}
              {/* {screen < BREAKPOINT.LG && (
            <LegalsList
              accounts={legalsByType}
              changeActiveAccount={changeActiveAccount}
              activeAccount={activeAccount}
              isReadLegalsLoading={isReadLegalsLoading}
              isOneLegalLoading={isOneLegalLoading}
              readLegalsError={readLegalsError}
              oneLegalError={oneLegalError}
            />
          )} */}
              <div className={styles.content}>
                <PaymentData
                  amountTitle={"wallet.withdraw.amount"}
                  profileFilter={formState.profileFilter}
                  subprofileFilter={formState.subprofileFilter}
                  errors={errors}
                  setValue={setValue}
                  formState={formState}
                  onSubmit={onSubmit}
                  register={register}
                  handleSubmit={handleSubmit}
                  isPaymentLoading={
                    isCreateLoading || isEditLoading || isPaymentLoading
                  }
                  walletType={walletType}
                />
                <div>
                  <div className={styles.content__right}>
                    {/* {screen >= BREAKPOINT.LG && (
                  <LegalsList
                    accounts={legalsByType}
                    changeActiveAccount={changeActiveAccount}
                    activeAccount={activeAccount}
                    isReadLegalsLoading={isReadLegalsLoading}
                    isOneLegalLoading={isOneLegalLoading}
                    readLegalsError={readLegalsError}
                    oneLegalError={oneLegalError}
                    />
                )} */}
                    {screen >= BREAKPOINT.MD && (
                      <Guide profileFilter={formState.profileFilter} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
