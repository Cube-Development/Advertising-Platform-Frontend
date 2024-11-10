import { IAdminTransactionData } from "@entities/admin";
import { accordionTypes } from "@shared/config";
import { Accordion } from "@shared/ui";
import { FC, useEffect, useRef } from "react";
import { TransactionCard } from "../card";
import styles from "./styles.module.scss";

interface TransactionsListProps {
  transactions: IAdminTransactionData[];
}

export const TransactionsList: FC<TransactionsListProps> = ({
  transactions,
}) => {
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    accordionRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new MutationObserver(() => {
          const state = ref.getAttribute("data-state");
          const icon = ref.querySelector(`.arrow svg`);
          if (state === accordionTypes.open) {
            ref.classList.add(styles.active);
            if (icon) icon.classList.add("rotate");
            if (icon) icon.classList.remove("rotate__down");
          } else {
            ref.classList.remove(styles.active);
            if (icon) icon.classList.add("rotate__down");
            if (icon) icon.classList.remove("rotate");
          }
        });
        observer.observe(ref, {
          attributes: true,
          attributeFilter: ["data-state"],
        });
        return () => observer.disconnect();
      }
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      {transactions?.length ? (
        <Accordion type="single" collapsible>
          <div className={styles.cards}>
            {transactions.map((card, index) => (
              <div key={index}>
                <TransactionCard
                  card={card}
                  accordionRefs={accordionRefs}
                  index={index}
                />
              </div>
            ))}
          </div>
        </Accordion>
      ) : (
        <div></div>
      )}
    </div>
  );
};
