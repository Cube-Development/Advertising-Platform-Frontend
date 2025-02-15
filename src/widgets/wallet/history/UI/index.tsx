import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { useGetViewTransactionsQuery } from "@entities/views";
import {
  HistoryCard,
  HistoryReq,
  SkeletonHistoryCard,
  useGetHistoryQuery,
} from "@entities/wallet";
import { BarHistory } from "@features/wallet";
import { SadSmileIcon } from "@shared/assets";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  Languages,
  PAGE_ANIMATION,
} from "@shared/config";
import { useClearCookiesOnPage, useWindowWidth } from "@shared/hooks";
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const History: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const language = useFindLanguage();
  const screen = useWindowWidth();
  const [currentPage, setCurrentPage] = useState(1);

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: dateSortingTypes.decrease,
  };

  const { data, isLoading, isFetching } = useGetHistoryQuery(getParams);
  const { refetch: views } = useGetViewTransactionsQuery();

  const handleOnChangePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    views();
  }, [currentPage]);

  let custom = 0;

  return (
    <div className={`container ${screen > BREAKPOINT.LG ? "sidebar" : ""}`}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.top}
          initial="hidden"
          animate="visible"
          custom={custom++}
          variants={PAGE_ANIMATION.animationRight}
        >
          <p className="gradient_color">{t("wallet_history.wallet_history")}</p>
        </motion.div>
        {screen > BREAKPOINT.MD && (
          <motion.div
            initial="hidden"
            animate="visible"
            custom={custom++}
            variants={PAGE_ANIMATION.animationRight}
          >
            <BarHistory />
          </motion.div>
        )}
        <motion.div
          className={styles.cards}
          initial="hidden"
          animate="visible"
          custom={custom++}
          variants={PAGE_ANIMATION.animationVision}
        >
          {data?.transactions.length ? (
            <div className={styles.cards__list}>
              {data.transactions.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial="hidden"
                  animate="visible"
                  custom={index % INTERSECTION_ELEMENTS.history}
                  variants={PAGE_ANIMATION.animationUp}
                >
                  <HistoryCard card={card} />
                </motion.div>
              ))}
              {(isFetching || isLoading) &&
                Array.from({ length: INTERSECTION_ELEMENTS.history }).map(
                  (_, index) => <SkeletonHistoryCard key={index} />,
                )}
              {!data.isLast && (
                <div
                  className={`${styles.show_more}`}
                  onClick={handleOnChangePage}
                >
                  {isFetching || isLoading ? (
                    <SpinnerLoaderSmall />
                  ) : (
                    <ShowMoreBtn />
                  )}
                </div>
              )}
            </div>
          ) : isLoading || isFetching ? (
            <div className={styles.cards__list}>
              {(isFetching || isLoading) &&
                Array.from({ length: INTERSECTION_ELEMENTS.history }).map(
                  (_, index) => <SkeletonHistoryCard key={index} />,
                )}
            </div>
          ) : (
            <div className={styles.empty__block}>
              <div className={styles.icon}>
                <SadSmileIcon />
              </div>
              <h3 className={styles.title}>{t("cart.empty")}</h3>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
