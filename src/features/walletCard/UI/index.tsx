import { FC } from "react";
import styles from "./styles.module.scss";

interface WalletCardProps {
  account: any;
  isActive: boolean;
  onChange: (account: any) => void;
}

export const WalletCard: FC<WalletCardProps> = ({
  account,
  isActive,
  onChange,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${isActive ? styles.active__account : ""}`}
      onClick={() => onChange(account)}
    >
      <div className={styles.content}>
        <p>{account.title}</p>
        <span>{account.info}</span>
      </div>
      <div className={styles.outer}>
        <div
          className={`${styles.inner} ${isActive ? styles.active : ""}`}
        ></div>
      </div>
    </div>
  );
};
