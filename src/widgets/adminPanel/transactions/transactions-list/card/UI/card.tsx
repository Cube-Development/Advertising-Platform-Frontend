import {
  IAdminTransactionData,
  TransactionDetails,
  TransactionDocuments,
  TransactionsRoute,
  useGetAdminTransactionInfoQuery,
} from "@entities/admin-panel";
import { useCopyLink } from "@shared/hooks";
import { AccordionContent, AccordionItem } from "@shared/ui";
import { FC, MutableRefObject, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardTrigger } from "./card-trigger";
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
  const [isSubcardOpen, setSubcardOpen] = useState(false);
  const { copyLink } = useCopyLink();

  const { data: subcard, isLoading } = useGetAdminTransactionInfoQuery(
    { id: card?.id },
    {
      skip: !isSubcardOpen,
    },
  );

  return (
    <AccordionItem
      value={`item-adminTransactions-${card?.id}`}
      className={styles.wrapper}
      ref={(el) => (accordionRefs.current[index] = el)}
    >
      <CardTrigger
        card={card}
        isLoading={isLoading}
        isOpen={isSubcardOpen}
        onClick={() => setSubcardOpen(!isSubcardOpen)}
      />
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
