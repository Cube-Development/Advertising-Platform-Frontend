import { IAdminTransactionInfo } from "@entities/admin";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface TransactionsRouteProps {
  subcard: IAdminTransactionInfo;
}

export const TransactionsRoute: FC<TransactionsRouteProps> = ({ subcard }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.admin_transactions.id"),
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.column}>
          <p>{t("admin_panel.transactions.card.transactions.id")}</p>
        </div>
        <div className={styles.column}>
          <p>{t("admin_panel.transactions.card.transactions.transactionId")}</p>
        </div>
        <div className={styles.column}>
          <p>{t("admin_panel.transactions.card.transactions.accountId")}</p>
        </div>
        <div className={styles.column}>
          <p>{t("admin_panel.transactions.card.transactions.amount")}</p>
        </div>
        <div className={styles.column}>
          <p>{t("admin_panel.transactions.card.transactions.date")}</p>
        </div>
      </div>
      <div className={styles.body}>
        {subcard?.transactions?.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.id} onClick={() => handleCopyLink(item?.id)}>
              <p>{item?.id}</p>
            </div>
            <div
              className={styles.id}
              onClick={() => handleCopyLink(item?.journal_id)}
            >
              <p>{item?.journal_id}</p>
            </div>
            <div
              className={styles.id}
              onClick={() => handleCopyLink(item?.account_id)}
            >
              <p>{item?.account_id}</p>
            </div>
            <div>
              <p>{item?.amount.toLocaleString()}</p>
            </div>
            <div>
              <p>{item?.created}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
