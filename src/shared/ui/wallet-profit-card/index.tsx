import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { cn } from "../shadcn-ui/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount: number;
  isActive?: boolean;
}

export const WalletProfitCard: FC<Props> = ({ amount, isActive, ...props }) => {
  const { t } = useTranslation();
  const { className, ...rest } = props;
  return (
    <button
      className={cn(className, styles.wrapper, isActive && styles.active)}
      {...rest}
    >
      <div className={styles.header}>
        <p className={styles.title}>{t("wallets.profit.title")}</p>
      </div>
      <div className={styles.amount}>
        <p className={styles.description}>{t("wallets.profit.description")}:</p>
        <p className={styles.value}>
          {Math.floor(amount).toLocaleString()} {t("symbol")}
        </p>
      </div>
    </button>
  );
};
