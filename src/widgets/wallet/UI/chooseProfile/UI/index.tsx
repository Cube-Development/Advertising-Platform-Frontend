import { WalletCard } from "@features/walletCard";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ILegalCard, ILegalCardShort } from "@shared/types/profile";
import { SadSmileIcon } from "@shared/assets";

interface ChooseProfileProps {
  accounts: ILegalCardShort[] | undefined;
  activeAccount: ILegalCard | null;
  changeActiveAccount: (account: ILegalCardShort) => void;
  isReadLegalsLoading?: boolean;
  isOneLegalLoading?: boolean;
  readLegalsError?: any;
  oneLegalError?: any;
}

export const ChooseProfile: FC<ChooseProfileProps> = ({
  accounts,
  activeAccount,
  changeActiveAccount,
  isReadLegalsLoading,
  isOneLegalLoading,
  readLegalsError,
  oneLegalError,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.profile}>
      <p className={styles.title}>{t("wallet.use_data")}</p>
      <div
        className={`${styles.all__profile} ${accounts && accounts.length > 5 ? styles.scroll : ""}`}
      >
        {accounts &&
        accounts?.length > 0 &&
        !isReadLegalsLoading &&
        !readLegalsError ? (
          <>
            {accounts?.map((account, index) => (
              <WalletCard
                account={account}
                key={index}
                changeActiveAccount={() => changeActiveAccount(account)}
                isActive={activeAccount?.legal_id === account.legal_id}
                isOneLegalLoading={isOneLegalLoading}
                oneLegalError={oneLegalError}
              />
            ))}
          </>
        ) : (
          <div className={styles.empty}>
            <SadSmileIcon />
            <p className={styles.empty__text}>Список пуст...</p>
          </div>
        )}
        {isReadLegalsLoading && !readLegalsError && <h1>Loading...</h1>}
        {readLegalsError && <h1>Ошибка запроса...</h1>}
      </div>
    </div>
  );
};
