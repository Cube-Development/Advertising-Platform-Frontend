import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { ArrowIcon4 } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";
import { profileTypesName } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import { IProfileData } from "@shared/types/profile";
import { ChooseProfile } from "@widgets/wallet/UI/chooseProfile";
import { Guide } from "@widgets/wallet/UI/guide";
import { PaymentData } from "@widgets/wallet/UI/paymentData/UI";
import { TopUpCard } from "@widgets/wallet/UI/topUpCard";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const Accounts = [
  {
    title: "Card name 1",
    info: "Information Information Information",
    index: 0,
  },
  {
    title: "Card name 1",
    info: "Information Information Information",
    index: 1,
  },
  {
    title: "Card name 1",
    info: "Information Information Information",
    index: 2,
  },
  {
    title: "Card name 1",
    info: "Information Information Information",
    index: 3,
  },
  {
    title: "Card name 1",
    info: "Information Information Information",
    index: 4,
  },
  {
    title: "Card name 1",
    info: "Information Information Information",
    index: 5,
  },
];

export const WalletTopUp: FC = () => {
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState(Accounts[0]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileData>();

  const { profileFilter: filter } = useAppSelector(
    (state) => state.filterReducer
  );

  const handleOnchange = (account: any) => {
    setActiveAccount(account);
  };

  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>{t("wallet.topup.title")}</p>
          <ArrowIcon4 />
        </div>
        <BarProfileFilter resetValues={reset} page={pageFilter.walletTopUp} />
        {filter.type === profileTypesName.selfEmployedAccounts ? (
          <TopUpCard />
        ) : (
          <div>
            <div className={styles.top}>
              <p>{t("wallet.topup.offer")}</p>
            </div>
            <div className={styles.content}>
              <PaymentData
                account={Accounts[0]}
                amountTitle={t("wallet.topup.amount")}
              />
              <div>
                <div className={styles.content__right}>
                  <ChooseProfile
                    accounts={Accounts}
                    onChange={handleOnchange}
                    activeAccount={activeAccount}
                  />
                  <Guide />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
