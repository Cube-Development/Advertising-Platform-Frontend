import { BarProfileFilter } from "@features/barProfileFilter/UI";
import { ArrowIcon5 } from "@shared/assets";
import { pageFilter } from "@shared/config/pageFilter";
import { profileFilter } from "@shared/config/profileFilter";
import { useAppSelector } from "@shared/store";
import { IProfileData } from "@shared/types/profile";
import { ChooseProfile } from "@widgets/wallet/UI/chooseProfile";
import { Guide } from "@widgets/wallet/UI/guide";
import { PaymentData } from "@widgets/wallet/UI/paymentData/UI";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BarSubrofileFilter } from "@features/barSubprofileFilter";

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

export const WalletWithdraw: FC = () => {
  const { t } = useTranslation();
  const [activeAccount, setActiveAccount] = useState(Accounts[0]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProfileData>();

  const { profileFilter: profile } = useAppSelector(
    (state) => state.filterReducer,
  );

  const handleOnchange = (account: any) => {
    setActiveAccount(account);
  };

  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p>{t("wallet.withdraw.title")}</p>
          <ArrowIcon5 />
        </div>
        <BarProfileFilter page={pageFilter.walletWithdraw} />
        <div>
          <div className={styles.top}>
            <p>{t("wallet.withdraw.offer")}</p>
          </div>
          {profile === profileFilter.selfEmployed && (
            <div className={styles.subbar}>
              <BarSubrofileFilter />
            </div>
          )}
          <div className={styles.content}>
            <PaymentData account={Accounts[0]} />
            <div>
              <div className={styles.content__left}>
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
      </div>
    </div>
  );
};
