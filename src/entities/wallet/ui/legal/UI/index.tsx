import { ILegalCardShort } from "@entities/wallet";
import { SpinnerLoaderSmall } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface LegalCardProps {
  account: ILegalCardShort;
  isActive: boolean;
  isOneLegalLoading?: boolean;
  oneLegalError?: any;
}

export const LegalCard: FC<LegalCardProps> = ({
  account,
  isActive,
  isOneLegalLoading,
  oneLegalError,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles.wrapper} ${isActive ? styles.active__account : ""}`}
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
            <div
              className={`${styles.circle_wrapper} ${isActive ? styles.active : ""}`}
            >
              <div className={styles.outer}>
                <div className={styles.inner} />
              </div>
            </div>
          )}
        </>
      )}
      {oneLegalError && <h1>Ошибка запроса...</h1>}
    </div>
  );
};
