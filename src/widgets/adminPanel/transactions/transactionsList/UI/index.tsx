import { IAdminTransactions } from "@entities/admin";
import {
  accordionTypes,
  INTERSECTION_ELEMENTS,
  PAGE_ANIMATION,
} from "@shared/config";
import { Accordion, ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SkeletonAdminTransactionCard, TransactionCard } from "../card";
import styles from "./styles.module.scss";

interface TransactionsListProps {
  data: IAdminTransactions;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: () => void;
}

export const TransactionsList: FC<TransactionsListProps> = ({
  data,
  isLoading,
  isFetching,
  handleChange,
}) => {
  const { t } = useTranslation();
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
  }, [data]);

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
      {data?.transactions?.length ? (
        <Accordion type="single" collapsible>
          <div className={styles.cards}>
            {data?.transactions.map((card, index) => (
              <motion.div
                key={card.id + index}
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.adminTransactions}
                variants={PAGE_ANIMATION.animationUp}
              >
                <TransactionCard
                  card={card}
                  accordionRefs={accordionRefs}
                  index={index}
                />
              </motion.div>
            ))}
            {(isFetching || isLoading) &&
              Array.from({
                length: INTERSECTION_ELEMENTS.adminTransactions,
              }).map((_, index) => (
                <SkeletonAdminTransactionCard key={index} />
              ))}
            {!data.isLast && (
              <div className={`${styles.show_more}`} onClick={handleChange}>
                {isLoading || isFetching ? (
                  <SpinnerLoaderSmall />
                ) : (
                  <ShowMoreBtn />
                )}
              </div>
            )}
          </div>
        </Accordion>
      ) : (
        <div></div>
      )}
    </div>
  );
};
