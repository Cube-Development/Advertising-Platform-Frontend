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
  PAGE_ANIMATION,
} from "@shared/config";
import { useClearCookiesOnPage, useWindowWidth } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { CustomTitle, ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { getAnimationDelay } from "@shared/utils";
import { motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const History: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const language = useFindLanguage();
  const screen = useWindowWidth();
  const [currentPage, setCurrentPage] = useState(1);

  const getParams = useMemo<HistoryReq>(
    () => ({
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      page: currentPage,
      elements_on_page: INTERSECTION_ELEMENTS.HISTORY,
      date_sort: dateSortingTypes.decrease,
    }),
    [language?.id, currentPage],
  );

  const { data, isFetching, refetch, originalArgs } =
    useGetHistoryQuery(getParams);
  const { refetch: views } = useGetViewTransactionsQuery();

  const handleOnChangePage = () => {
    const newPage = Math.floor(
      (data?.transactions?.length || 0) / INTERSECTION_ELEMENTS.HISTORY,
    );
    setCurrentPage(newPage + 1);
    if (data?.transactions?.length === 0) {
      refetch();
    }
  };

  useEffect(() => {
    if (data && data?.transactions?.length === 0 && !data?.isLast) {
      refetch();
    }
  }, [data?.transactions?.length]);

  useEffect(() => {
    views();
  }, [currentPage]);

  let custom = 0;
  const isLoadingMore = isFetching && !originalArgs?.__isWebsocket;

  return (
    <div className={`container ${screen > BREAKPOINT.LG ? "sidebar" : ""}`}>
      <div className={styles.wrapper}>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={custom++}
          variants={PAGE_ANIMATION.animationRight}
        >
          <CustomTitle
            title={t("wallet_history.wallet_history")}
            variant={"primary"}
          />
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
                  custom={getAnimationDelay({
                    index,
                    currentPage,
                    total: data.transactions.length,
                    elements: INTERSECTION_ELEMENTS.HISTORY,
                  })}
                  variants={PAGE_ANIMATION.animationUp}
                >
                  <HistoryCard card={card} />
                </motion.div>
              ))}
              {isLoadingMore &&
                Array.from({ length: INTERSECTION_ELEMENTS.HISTORY }).map(
                  (_, index) => <SkeletonHistoryCard key={index} />,
                )}
              {!data.isLast && (
                <div
                  className={`${styles.show_more}`}
                  onClick={handleOnChangePage}
                >
                  {isLoadingMore ? <SpinnerLoaderSmall /> : <ShowMoreBtn />}
                </div>
              )}
            </div>
          ) : isLoadingMore ? (
            <div className={styles.cards__list}>
              {Array.from({ length: INTERSECTION_ELEMENTS.HISTORY }).map(
                (_, index) => (
                  <SkeletonHistoryCard key={index} />
                ),
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
