import { useAppSelector } from "@shared/hooks";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { WalletDepositCard, WalletProfitCard } from "@shared/ui";

export const WalletCard: FC = ({}) => {
  const { t } = useTranslation();
  const { balance, deposit_wallet, profit_wallet } = useAppSelector(
    (state) => state.wallet,
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>{t("wallets.title")}</p>
        <p className={styles.amount}>
          {Math.floor(balance).toLocaleString()} <span>{t("symbol")}</span>
        </p>
      </div>
      <div className={styles.cards}>
        <WalletDepositCard amount={deposit_wallet} />
        <WalletProfitCard amount={profit_wallet} />
      </div>
    </div>
  );
};
