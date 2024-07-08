import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { ILegalCardShort } from "@shared/types/profile";
import { SpinnerLoader, SpinnerLoaderSmall } from "@shared/ui/spinnerLoader";

interface LegalCardProps {
  account: ILegalCardShort;
  isActive: boolean;
  changeActiveAccount: (account: ILegalCardShort) => void;
  isOneLegalLoading?: boolean;
  oneLegalError?: any;
}

export const LegalCard: FC<LegalCardProps> = ({
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
            <p className={styles.card_name}>{account?.name}</p>
            <span>
              {(account?.INN &&
                `${t("wallet.inn")} ${account?.INN.toLocaleString()}`) ||
                (account?.PNFL && `${t("wallet.pnfl")} ${account?.PNFL}`)}
            </span>
          </div>
          {isOneLegalLoading && !oneLegalError ? (
            <SpinnerLoaderSmall />
          ) : (
            <div className={styles.circle_wrapper}>
              <div className={styles.outer}>
                <div
                  className={`${styles.inner} ${isActive ? styles.active : ""}`}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
      {oneLegalError && <h1>Ошибка запроса...</h1>}
    </div>
  );
};
