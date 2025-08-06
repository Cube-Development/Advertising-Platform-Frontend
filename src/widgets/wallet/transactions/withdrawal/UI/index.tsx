import { offerOpen } from "@entities/user";
import {
  ENUM_WALLETS_TYPE,
  GuideWithdraw,
  IWalletOperations,
  WithdrawSuccessCard,
} from "@entities/wallet";
import { DownloadInvoice, WalletsBar } from "@features/wallet";
import { ArrowIcon5 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  useAppDispatch,
  useAppSelector,
  useClearCookiesOnPage,
  useWindowWidth,
} from "@shared/hooks";
import { CustomTitle } from "@shared/ui";
import { formatWithOutSpaces } from "@shared/utils";
import { NotLogin } from "@widgets/organization";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { OrganizationData } from "../../components";
import { useWalletWithdraw } from "../../model";
import styles from "./styles.module.scss";

export const Withdrawal: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { isAuthEcp, isOfferSign } = useAppSelector((state) => state.user);
  const screen = useWindowWidth();
  const dispatch = useAppDispatch();
  const { withdraw, isLoading, isSuccess, uploadUrl } = useWalletWithdraw();
  const {
    setValue,
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IWalletOperations>({
    defaultValues: {
      wallet_type: ENUM_WALLETS_TYPE.DEPOSIT,
    },
  });
  const formState = watch();

  const onSubmit: SubmitHandler<IWalletOperations> = async (data) => {
    if (isOfferSign) {
      await withdraw({
        amount: formatWithOutSpaces(data?.amount?.toString()),
        wallet_type: data?.wallet_type!,
      });
    } else {
      dispatch(offerOpen(true));
    }
  };

  const setWalletType = (type: ENUM_WALLETS_TYPE | null) => {
    setValue("wallet_type", type || ENUM_WALLETS_TYPE.DEPOSIT);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {isSuccess ? (
          <WithdrawSuccessCard
            downloadBtn={<DownloadInvoice url={uploadUrl} />}
          />
        ) : (
          <>
            <CustomTitle
              title={t("wallet.withdraw.title")}
              icon={<ArrowIcon5 />}
            />
            {!isAuthEcp ? (
              <NotLogin />
            ) : (
              <>
                <div className={styles.form__wrapper}>
                  {screen < BREAKPOINT.MD && <GuideWithdraw />}
                  <WalletsBar
                    walletType={formState?.wallet_type!}
                    setWalletType={setWalletType}
                    direction="column"
                    wallets={[
                      ENUM_WALLETS_TYPE.DEPOSIT,
                      ENUM_WALLETS_TYPE.PROFIT,
                    ]}
                  />
                  <div className={styles.content}>
                    <div>
                      <OrganizationData
                        amountTitle={"wallet.withdraw.amount"}
                        formState={formState}
                        register={register}
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        isLoading={isSubmitting}
                      />
                    </div>
                    <div>
                      <div className={styles.content__right}>
                        {screen >= BREAKPOINT.MD && <GuideWithdraw />}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
