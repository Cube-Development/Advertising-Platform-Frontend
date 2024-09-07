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
import { ShowMoreBtn, SpinnerLoaderSmall } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useInfiniteScroll } from "@shared/hooks"; // Импортируем хук

export const History: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => lang.name === i18n.language);
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: "decrease",
  };

  const { data, isLoading, isFetching } = useGetHistoryQuery(getParams);

  const handleOnChangePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Используем хук для управления скроллом
  const { loadMoreRef, isLoadingMore } = useInfiniteScroll({
    isFetching,
    isLast: data?.isLast || false,
    onLoadMore: handleOnChangePage,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <p>{t("wallet_history.wallet_history")}</p>
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

              {!data.isLast && screen <= BREAKPOINT.MD && !isLoadingMore && (
                <div ref={loadMoreRef} className={styles.show_more}></div>
              )}

              {(isFetching || isLoadingMore) && screen <= BREAKPOINT.MD && (
                <div className="pt-[20px]">
                  <SpinnerLoaderSmall />
                </div>
              )}

              {!data.isLast && screen > BREAKPOINT.MD && (
                <div className={styles.show_more} onClick={handleOnChangePage}>
                  {isFetching || isLoadingMore ? (
                    <div className="pt-[20px]">
                      <SpinnerLoaderSmall />
                    </div>
                  ) : (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      custom={
                        (data?.transactions?.length - 1) %
                        INTERSECTION_ELEMENTS.history
                      }
                      variants={PAGE_ANIMATION.animationUp}
                    >
                      <ShowMoreBtn />
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          ) : isLoading || isFetching ? (
            <>
              {Array.from({ length: INTERSECTION_ELEMENTS.history }).map(
                (_, index) => (
                  <SkeletonHistoryCard key={index} />
                ),
              )}
            </>
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
