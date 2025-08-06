import {
  IWalletOperations,
  PROFILE_STATUS,
  PROFILE_TYPE,
  TopupSuccessCard,
  WALLET_TOP_UP_FILTER_TABS_LIST,
} from "@entities/wallet";
import { BarSubFilter } from "@features/other";
import { ArrowIcon4 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import {
  useAppSelector,
  useClearCookiesOnPage,
  useWindowWidth,
} from "@shared/hooks";
import { CustomTitle } from "@shared/ui";
import { NotLogin } from "@widgets/organization";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreditCard, Guide, OrganizationData } from "../../components";
import { useWalletDeposit } from "../../model";
import styles from "./styles.module.scss";
import { formatWithOutSpaces } from "@shared/utils";
import { DownloadInvoice } from "@features/wallet";

export const Topup: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const screen = useWindowWidth();

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IWalletOperations>({
    defaultValues: {
      profileFilter: {
        type: PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT,
        id: PROFILE_STATUS.SELF_EMPLOYED_ACCOUNT,
      },
    },
  });
  const formState = watch();
  const { deposit, isLoading, isSuccess, uploadUrl } = useWalletDeposit();

  const changeTab = (filter: PROFILE_TYPE) => {
    const item = WALLET_TOP_UP_FILTER_TABS_LIST.find(
      (item) => item.type === filter,
    )!;
    const newFilter = { type: item?.type, id: item?.id };
    setValue("profileFilter", newFilter);
  };

  const onSubmit: SubmitHandler<IWalletOperations> = async (data) => {
    await deposit({ amount: formatWithOutSpaces(data?.amount?.toString()) });
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {isSuccess ? (
          <TopupSuccessCard downloadBtn={<DownloadInvoice url={uploadUrl} />} />
        ) : (
          <>
            <CustomTitle
              title={t("wallet.topup.title")}
              icon={<ArrowIcon4 />}
            />
            <BarSubFilter
              tab={formState?.profileFilter?.type!}
              tab_list={WALLET_TOP_UP_FILTER_TABS_LIST}
              changeTab={changeTab}
            />
            {formState?.profileFilter?.type ===
            PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT ? (
              <CreditCard />
            ) : !isAuthEcp ? (
              <NotLogin />
            ) : (
              <>
                <div className={styles.form__wrapper}>
                  {screen < BREAKPOINT.MD && <Guide />}
                  <div className={styles.content}>
                    <OrganizationData
                      amountTitle={"wallet.topup.amount"}
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
