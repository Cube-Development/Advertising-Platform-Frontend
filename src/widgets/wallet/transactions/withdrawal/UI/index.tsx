import {
  ENUM_WALLETS_TYPE,
  IWalletOperations,
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
import { CustomTitle, useToast } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Guide, OrganizationData } from "../../components";
import styles from "./styles.module.scss";
import { useWalletWithdraw } from "../../model";
import { formatWithOutSpaces } from "@shared/utils";

export const Withdrawal: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const screen = useWindowWidth();
  const { withdraw, isLoading, isSuccess } = useWalletWithdraw();
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
    await withdraw({
      amount: formatWithOutSpaces(data?.amount?.toString()),
      wallet_type: data?.wallet_type!,
    });
  };

  const setWalletType = (type: ENUM_WALLETS_TYPE | null) => {
    setValue("wallet_type", type || ENUM_WALLETS_TYPE.DEPOSIT);
  };

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
              <>
                <div className={styles.form__wrapper}>
                  {screen < BREAKPOINT.MD && <Guide />}
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
                    <OrganizationData
                      amountTitle={"wallet.withdraw.amount"}
                      formState={formState}
                      register={register}
                      errors={errors}
                      onSubmit={handleSubmit(onSubmit)}
                      isLoading={isSubmitting}
                    />
                    <div>
                      <div className={styles.content__right}>
                        {screen >= BREAKPOINT.MD && <Guide />}
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
