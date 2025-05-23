import {
  ADMIN_TRANSACTION_STATUS_LIST,
  IAdminTransactionData,
  TransactionDetails,
  TransactionDocuments,
  TransactionsRoute,
  ADMIN_TRANSACTION_STATUS,
  useGetAdminTransactionInfoQuery,
} from "@entities/admin";
import { TransactionCardMenu } from "@features/adminPanel";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccountsLoader,
  useToast,
} from "@shared/ui";
import { FC, MutableRefObject, useState } from "react";
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
  const [isSubcardOpen, setSubcardOpen] = useState(false);

  const { data: subcard, isLoading } = useGetAdminTransactionInfoQuery(
    { id: card?.id },
    {
      skip: !isSubcardOpen,
    },
  );

  const handleCopyLink = (text: string = "") => {
    navigator.clipboard.writeText(text);
    toast({
      variant: "default",
      title: t("copy.admin_transactions.id"),
    });
  };

  const handleChangeOpenSubcard = (): void => {
    setSubcardOpen(!isSubcardOpen);
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
          <AccordionTrigger
            className={styles.trigger}
            onClick={() => handleChangeOpenSubcard()}
          >
            {isLoading ? (
              <div className={styles.loader}>
                <AccountsLoader />
              </div>
            ) : (
              <div className="arrow">
                <ArrowSmallVerticalIcon className="icon__grey rotate__down" />
              </div>
            )}
          </AccordionTrigger>
        </div>
      </div>
      <AccordionContent className={styles.content}>
        {!!subcard && (
          <>
            <TransactionDetails subcard={subcard} />
            <TransactionsRoute subcard={subcard} />
            <TransactionDocuments subcard={subcard} />
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
