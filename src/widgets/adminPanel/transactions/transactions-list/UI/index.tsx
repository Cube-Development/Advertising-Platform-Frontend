import {
  IAdminTransactions,
  SkeletonAdminTransactionCard,
} from "@entities/admin-panel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { useAccordionObserver } from "@shared/hooks";
import { Accordion, ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TransactionCard } from "../card";
import styles from "./styles.module.scss";

interface TransactionsListProps {
  data?: IAdminTransactions;
  isLoading: boolean;
  handleChange: () => void;
}

export const TransactionsList: FC<TransactionsListProps> = ({
  data,
  isLoading,
  handleChange,
}) => {
  const { t } = useTranslation();
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);
  useAccordionObserver(accordionRefs, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.transactions.bar.id")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.transactions.bar.sender")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">
            {t("admin_panel.transactions.bar.recipient")}
          </p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.transactions.bar.date")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.transactions.bar.method")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">
            {t("admin_panel.transactions.bar.purpose")}
          </p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.transactions.bar.amount")}</p>
        </div>
        <div className={styles.column}>
          <p className="truncate">{t("admin_panel.transactions.bar.status")}</p>
        </div>
      </div>
      {!!data?.transactions?.length && (
        <Accordion type="single" collapsible>
          <div className={styles.cards}>
            {data?.transactions.map((card, index) => (
              <motion.div
                key={card.id + index}
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.ADMIN_TRANSACTIONS}
                variants={PAGE_ANIMATION.animationUp}
              >
                <TransactionCard
                  card={card}
                  accordionRefs={accordionRefs}
                  index={index}
                />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({
                length: INTERSECTION_ELEMENTS.ADMIN_TRANSACTIONS,
              }).map((_, index) => (
                <SkeletonAdminTransactionCard key={index} />
              ))}
            {!data.isLast && (
              <div className={`${styles.show_more}`} onClick={handleChange}>
                {isLoading ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </div>
  );
};
