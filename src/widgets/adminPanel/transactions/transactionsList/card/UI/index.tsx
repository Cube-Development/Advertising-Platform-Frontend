import {
  adminTransactionStatus,
  Details,
  Documents,
  IAdminTransactionData,
  TransactionsRoute,
  transactionStatus,
} from "@entities/admin";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useToast,
} from "@shared/ui";
import { FC, MutableRefObject } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface TransactionCardProps {
  card: IAdminTransactionData;
  accordionRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

export const TransactionCard: FC<TransactionCardProps> = ({
  card,
  accordionRefs,
  index,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const subcard = card?.subcard;

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.admin_transactions.id"),
    });
  };

  return (
    <AccordionItem
      value={`item-adminTransactions-${card?.id}`}
      className={styles.wrapper}
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <div className={styles.top}>
        <div
          className={`${styles.column} ${styles.id}`}
          onClick={() => handleCopyLink(card?.id)}
        >
          <p className="truncate">{card?.id}</p>
        </div>
        <div
          className={`${styles.column} ${styles.id}`}
          onClick={() => handleCopyLink(card?.sender)}
        >
          <p className="truncate">{card?.sender}</p>
        </div>
        <div
          className={`${styles.column} ${styles.id}`}
          onClick={() => handleCopyLink(card?.receiver)}
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
            card?.status === transactionStatus.complite
              ? styles.complite
              : card?.status === transactionStatus.reject
                ? styles.reject
                : styles.pending
          }`}
        >
          <p>
            {t(
              adminTransactionStatus.find((item) => item.id === card?.status)
                ?.name || "",
            )}
          </p>
        </div>
        <div className={styles.settings}>
          <div>|||</div>
          <AccordionTrigger className={styles.trigger}>
            <div className="arrow">
              <ArrowSmallVerticalIcon className="icon__grey rotate__down" />
            </div>
          </AccordionTrigger>
        </div>
      </div>
      <AccordionContent className={styles.content}>
        <Details subcard={subcard} />
        <TransactionsRoute subcard={subcard} />
        <Documents subcard={subcard} />
      </AccordionContent>
    </AccordionItem>
  );
};
