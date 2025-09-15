import {
  ADMIN_TRANSACTION_STATUS,
  ADMIN_TRANSACTION_STATUS_LIST,
  IAdminTransactionData,
} from "@entities/admin-panel";
import { TransactionCardMenu } from "@features/admin-panel";
import { useCopyLink } from "@shared/hooks";
import { AccordionTrigger, AccountsLoader } from "@shared/ui";
import { ChevronDown } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ICardTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  card: IAdminTransactionData;
  isLoading?: boolean;
  isOpen?: boolean;
}

export const CardTrigger: FC<ICardTriggerProps> = ({
  card,
  isLoading,
  isOpen,
  ...props
}) => {
  const { t } = useTranslation();
  const { copyLink } = useCopyLink();
  return (
    <div className={styles.top}>
      <div
        className={`${styles.column} ${styles.id}`}
        onClick={() => copyLink(card?.id)}
      >
        <p className="truncate">{card?.id}</p>
      </div>
      <div
        className={`${styles.column} ${styles.id}`}
        onClick={() => copyLink(card?.sender)}
      >
        <p className="truncate">{card?.sender}</p>
      </div>
      <div
        className={`${styles.column} ${styles.id}`}
        onClick={() => copyLink(card?.receiver)}
      >
        <p className="truncate">{card?.receiver}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.transaction_date}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.transaction_type}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.way_type}</p>
      </div>
      <div className={styles.column}>
        <p className="truncate">{card?.amount.toLocaleString()}</p>
      </div>
      <div
        className={`${styles.status} ${
          card?.status === ADMIN_TRANSACTION_STATUS.COMPLETE
            ? styles.complete
            : card?.status === ADMIN_TRANSACTION_STATUS.REJECT
              ? styles.reject
              : styles.pending
        }`}
      >
        <p className="truncate">
          {t(
            ADMIN_TRANSACTION_STATUS_LIST.find(
              (item) => item.id === card?.status,
            )?.name || "",
          )}
        </p>
      </div>
      <div className={styles.settings}>
        <TransactionCardMenu id={card?.id} />
        <AccordionTrigger className={styles.trigger} {...props}>
          {isLoading ? (
            <div className={styles.loader}>
              <AccountsLoader />
            </div>
          ) : (
            <ChevronDown
              size={20}
              className={`trigger-chevron w-5 h-5 text-gray-400 transition-transform duration-350 flex-shrink-0 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </AccordionTrigger>
      </div>
    </div>
  );
};
