import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { cn } from "../shadcn-ui/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
}

export const WalletDepositCard: FC<Props> = ({ amount, ...props }) => {
  const { t } = useTranslation();
  const { className, ...rest } = props;
  return (
    <div className={cn(className, styles.wrapper)} {...rest}>
      <div className={styles.header}>
        <p className={styles.title}>{t("wallets.deposit.title")}</p>
      </div>
      <div className={styles.amount}>
        <p className={styles.description}>
          {t("wallets.deposit.description")}:
        </p>
        <p className={styles.value}>
          {Math.floor(amount).toLocaleString()} {t("symbol")}
        </p>
      </div>
    </div>
  );
};
