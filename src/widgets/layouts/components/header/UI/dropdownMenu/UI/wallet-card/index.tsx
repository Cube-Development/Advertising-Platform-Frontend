import { useAppSelector } from "@shared/hooks";
import { CreditCard } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const WalletCard: FC = ({}) => {
  const { t } = useTranslation();
  const { balance, deposit_wallet, profit_wallet } = useAppSelector(
    (state) => state.wallet,
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.wallet_main}>
        <div className={styles.title}>
          <CreditCard color="white" size={24} />
          <p className={styles.label}>{t("burger_menu.balance")}</p>
        </div>
        <p className={styles.value}>
          {Math.floor(balance).toLocaleString()} <span>{t("symbol")}</span>
        </p>
      </div>
      <div className={styles.wallet_sub}>
        <div className={styles.wallet_sub__item}>
          <p className={styles.label}>Депозит</p>
          <p className={styles.value}>
            {Math.floor(deposit_wallet).toLocaleString()}{" "}
            <span>{t("symbol")}</span>
          </p>
        </div>
        <div className={styles.wallet_sub__item}>
          <p className={styles.label}>Прибыль</p>
          <p className={styles.value}>
            {Math.floor(profit_wallet).toLocaleString()}{" "}
            <span>{t("symbol")}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
