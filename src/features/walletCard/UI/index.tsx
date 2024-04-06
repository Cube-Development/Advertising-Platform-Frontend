import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ILegalCardShort } from "@shared/types/profile";
import { AccountsLoader } from "@shared/ui/accountsLoader";

interface WalletCardProps {
  account: ILegalCardShort;
  isActive: boolean;
  changeActiveAccount: (account: ILegalCardShort) => void;
  isOneLegalLoading?: boolean;
  oneLegalError?: any;
}

export const WalletCard: FC<WalletCardProps> = ({
  account,
  isActive,
  changeActiveAccount,
  isOneLegalLoading,
  oneLegalError,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.wrapper} ${isActive ? styles.active__account : ""}`}
      onClick={() => changeActiveAccount(account)}
    >
      {!oneLegalError && (
        <>
          <div className={styles.content}>
            <p className={styles.card_name}>{account.name}</p>
            <span>
              {(account.INN &&
                `${t("wallet.inn")} ${account.INN.toLocaleString()}`) ||
                (account.PNFL && `${t("wallet.pnfl")} ${account.PNFL}`)}
            </span>
          </div>
          {isOneLegalLoading && !oneLegalError ? (
            <AccountsLoader />
          ) : (
            <div className={styles.outer}>
              <div
                className={`${styles.inner} ${isActive ? styles.active : ""}`}
              ></div>
            </div>
          )}
        </>
      )}
      {oneLegalError && <h1>Ошибка запроса...</h1>}
    </div>
  );
};
