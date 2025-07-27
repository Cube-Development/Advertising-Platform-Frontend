import {
  ENUM_WALLETS_TYPE,
  IExtendedProfileData,
  PROFILE_STATUS,
  PROFILE_TYPE,
  SUBPROFILE_TYPE,
  useCreateLegalMutation,
  useEditLegalMutation,
  usePaymentWithdrawalMutation,
  WithdrawSuccessCard,
} from "@entities/wallet";
import { WalletsBar } from "@features/wallet";
import { ArrowIcon5 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  useAppSelector,
  useClearCookiesOnPage,
  useWindowWidth,
} from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { CustomTitle, ToastAction, useToast } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Guide, PaymentData } from "../../components";
import styles from "./styles.module.scss";

export const Withdrawal: FC = () => {
  useClearCookiesOnPage();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);
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
    },
  });
  const formState = watch();

  const [paymentWithdrawal, { isLoading: isPaymentLoading, isSuccess }] =
    usePaymentWithdrawalMutation();
  const [createLegal, { isLoading: isCreateLoading }] =
    useCreateLegalMutation();
  const [editLegal, { isLoading: isEditLoading }] = useEditLegalMutation();

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

  const [walletType, setWalletType] = useState<ENUM_WALLETS_TYPE | null>(
    ENUM_WALLETS_TYPE.DEPOSIT,
  );
  return (
    <div className="container">
      <div className={styles.wrapper}>
        {isSuccess ? (
          <WithdrawSuccessCard />
        ) : (
          <>
            <CustomTitle
              title={t("wallet.withdraw.title")}
              icon={<ArrowIcon5 />}
            />
            {!isAuthEcp ? (
              <NotLogin />
            ) : (
              <div className={styles.form__wrapper}>
                {screen < BREAKPOINT.MD && (
                  <Guide profileFilter={formState.profileFilter} />
                )}

                <WalletsBar
                  walletType={walletType}
                  setWalletType={setWalletType}
                  direction="column"
                  wallets={[
                    ENUM_WALLETS_TYPE.DEPOSIT,
                    ENUM_WALLETS_TYPE.PROFIT,
                  ]}
                />

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
                      {screen >= BREAKPOINT.MD && (
                        <Guide profileFilter={formState.profileFilter} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
