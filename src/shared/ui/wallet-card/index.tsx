import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { cn } from "../shadcn-ui/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount: number;
  isActive?: boolean;
  variant?: "deposit" | "individual" | "profit";
}

export const WalletCard: FC<Props> = ({
  amount,
  isActive,
  variant = "deposit",
  ...props
}) => {
  const { t } = useTranslation();
  const { className, ...rest } = props;

  const texts: Record<string, string> = {};
  let colorStyle = "";

  switch (variant) {
    case "deposit":
      texts.title = t("wallets.deposit.title");
      texts.description = t("wallets.deposit.description");
      colorStyle = styles.deposit;
      break;
    case "individual":
      texts.title = t("wallets.spending.title");
      texts.description = t("wallets.spending.description");
      colorStyle = styles.spending;
      break;
    case "profit":
      texts.title = t("wallets.profit.title");
      texts.description = t("wallets.profit.description");
      colorStyle = styles.profit;
      break;
    default:
      break;
  }

  return (
    <button
      className={cn(
        className,
        styles.wrapper,
        isActive && styles.active,
        colorStyle,
      )}
      {...rest}
    >
      <div className={styles.header}>
        <p className={styles.title}>{texts.title}</p>
      </div>
      <div className={styles.amount}>
        <p className={styles.description}>{texts.description}:</p>
        <p className={styles.value}>
          {Math.floor(amount).toLocaleString()} {t("symbol")}
        </p>
      </div>
    </button>
  );
};
