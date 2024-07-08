import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SubmitLoading } from "@shared/ui/submitLoading";

interface PaymentCardProps {
  error?: boolean;
  isLoading?: boolean;
}

export const PaymentCard: FC<PaymentCardProps> = ({ error, isLoading }) => {
  const { t } = useTranslation();
  return (
    <MyButton className={`${styles.button} ${error && styles.fetch_error}`}>
      {isLoading && !error ? (
        <SubmitLoading />
      ) : !error ? (
        t(`topup_btn.replenish`)
      ) : (
        t(`wallet.topup.fetch_error`)
      )}
    </MyButton>
  );
};
