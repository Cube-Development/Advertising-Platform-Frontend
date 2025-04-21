import {
  IExtendedProfileData,
  ILegalCard,
  ILegalCardShort,
  ILegalData,
  paymentTypes,
  PROFILE_STATUS,
  PROFILE_TYPE,
  SUBPROFILE_TYPE,
  useCreateLegalMutation,
  useEditLegalMutation,
  usePaymentDepositMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
  WALLET_TOP_UP_FILTER_TABS_LIST,
} from "@entities/wallet";
import { BarSubFilter } from "@features/other";
import { ArrowIcon4 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useClearCookiesOnPage, useWindowWidth } from "@shared/hooks";
import { pageFilter, paths } from "@shared/routing";
import { ToastAction, useToast } from "@shared/ui";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Guide, LegalsList, PaymentData } from "../../components";
import { CreditCard } from "./creditCard";
import styles from "./styles.module.scss";

export const Topup: FC = () => {
  useClearCookiesOnPage();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState<ILegalCard | null>(null);
  const navigate = useNavigate();
  const screen = useWindowWidth();

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
        type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
      subprofileFilter: {
        type: SUBPROFILE_TYPE.ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
    },
  });
  const formState = watch();

  const resetValues = () => {
    setActiveAccount(null);
  };

  const changeTab = (filter: PROFILE_TYPE) => {
    const item = WALLET_TOP_UP_FILTER_TABS_LIST.find(
      (item) => item.type === filter,
    )!;
    const newFilter = { type: item?.type, id: item?.id };
    setValue("profileFilter", newFilter);
  };

  const {
    data: legalsByType,
    isLoading: isReadLegalsLoading,
    error: readLegalsError,
  } = useReadLegalsByTypeQuery(formState.profileFilter.id);

  const [readOneLegal, { isLoading: isOneLegalLoading, error: oneLegalError }] =
    useReadOneLegalMutation();

  const [createLegal, { isLoading: isCreateLoading }] =
    useCreateLegalMutation();

  const [editLegal, { isLoading: isEditLoading }] = useEditLegalMutation();

  const [paymentDeposit, { isLoading: isPaymentLoading }] =
    usePaymentDepositMutation();

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
                  amount: Number(formState.amount.replace(/\s/g, "")),
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

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>{t("wallet.topup.title")}</p>
          <ArrowIcon4 />
        </div>
        <BarSubFilter
          tab={formState.profileFilter.type}
          tab_list={WALLET_TOP_UP_FILTER_TABS_LIST}
          changeTab={changeTab}
          resetValues={resetValues}
        />
        {formState.profileFilter.type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT ? (
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
        )}
      </div>
    </div>
  );
};
