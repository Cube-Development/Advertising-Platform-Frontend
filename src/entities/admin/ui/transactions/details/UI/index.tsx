import {
  ADMIN_TRANSACTION_ID_LIST,
  ADMIN_TRANSACTION_STATUS_LIST,
  IAdminTransactionInfo,
} from "@entities/admin";
import { useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface TransactionDetailsProps {
  subcard: IAdminTransactionInfo;
}

export const TransactionDetails: FC<TransactionDetailsProps> = ({
  subcard,
}) => {
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
      <div className={styles.status}>
        <p>
          {t("admin_panel.transactions.card.details.title").toUpperCase()}{" "}
          --------------------------------------------------------{" "}
          {t(
            ADMIN_TRANSACTION_STATUS_LIST.find(
              (item) => item.id === subcard?.status,
            )?.name || "",
          ).toUpperCase()}
        </p>
      </div>
      <div className={styles.about}>
        <div className={styles.sender}>
          <div className={styles.title}>
            <p>
              {t(
                "admin_panel.transactions.card.details.sender.title",
              ).toUpperCase()}{" "}
              :
            </p>
          </div>
          <div className={styles.info}>
            <div className={styles.row}>
              <p>{t("admin_panel.transactions.card.details.sender.uuid")} :</p>
              <span
                className={`truncate ${styles.id}`}
                onClick={() => handleCopyLink(subcard?.sender?.id)}
              >
                {subcard?.sender?.id}
              </span>
            </div>
            <div className={styles.row}>
              <p>
                {t(
                  "admin_panel.transactions.card.details.sender.identification",
                )}{" "}
                :
              </p>
              <span>
                {t(
                  ADMIN_TRANSACTION_ID_LIST.find(
                    (item) => item.id === subcard?.sender?.ident,
                  )?.name || "",
                )}
              </span>
            </div>
            {!!subcard?.sender?.user_id && (
              <div className={styles.row}>
                <p>
                  {t("admin_panel.transactions.card.details.sender.userId")} :
                </p>
                <span
                  className={styles.id}
                  onClick={() => handleCopyLink(subcard?.sender?.user_id)}
                >
                  № {subcard?.sender?.user_id}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.receiver}>
          <div className={styles.title}>
            <p>
              {t(
                "admin_panel.transactions.card.details.receiver.title",
              ).toUpperCase()}{" "}
              :
            </p>
          </div>
          <div className={styles.info}>
            <div className={styles.row}>
              <p>
                {t("admin_panel.transactions.card.details.receiver.uuid")} :
              </p>
              <span
                className={`truncate ${styles.id}`}
                onClick={() => handleCopyLink(subcard?.receiver?.id)}
              >
                {subcard?.receiver?.id}
              </span>
            </div>
            <div className={styles.row}>
              <p>
                {t(
                  "admin_panel.transactions.card.details.receiver.identification",
                )}{" "}
                :
              </p>
              <span>
                {t(
                  ADMIN_TRANSACTION_ID_LIST.find(
                    (item) => item.id === subcard?.receiver?.ident,
                  )?.name || "",
                )}
              </span>
            </div>

            {!!subcard?.receiver?.user_id && (
              <div className={styles.row}>
                <p>
                  {t("admin_panel.transactions.card.details.receiver.userId")} :
                </p>
                <span
                  className={styles.id}
                  onClick={() => handleCopyLink(subcard?.receiver?.user_id)}
                >
                  № {subcard?.receiver?.user_id}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
