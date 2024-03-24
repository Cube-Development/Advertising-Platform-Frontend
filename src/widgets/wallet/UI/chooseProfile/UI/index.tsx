import { WalletCard } from "@features/walletCard";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChooseProfileProps {
  accounts: any[];
  activeAccount: any;
  onChange: (account: any) => void;
}

export const ChooseProfile: FC<ChooseProfileProps> = ({
  accounts,
  activeAccount,
  onChange,
}) => {
  const { t } = useTranslation();
  //   const [activeAccount, setActiveAccount] = useState(accounts[0]);

  //   const handleOnchange = (account: any) => {
  //     setActiveAccount(account);
  //   };

  return (
    <div className={styles.profile}>
      <p>{t("wallet.use_data")}</p>
      <div
        className={`${styles.all__profile} ${accounts.length > 5 ? styles.scroll : ""}`}
      >
        {accounts.map((account, index) => (
          <WalletCard
            account={account}
            key={index}
            onChange={() => onChange(account)}
            isActive={activeAccount === account}
          />
        ))}
      </div>
    </div>
  );
};
