import {
  HistoryCard,
  HistoryReq,
  IWalletHistory,
  useGetHistoryQuery,
} from "@entities/wallet";
import { SkeletonHistoryCard } from "@entities/wallet/ui/history/skeleton";
import { BarHistory } from "@features/wallet";
import { SadSmileIcon } from "@shared/assets";
import {
  BREAKPOINT,
  INTERSECTION_ELEMENTS,
  Languages,
  MAIN_PAGE_ANIMATION,
} from "@shared/config";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const History: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: "decrease",
  };

  const { data, isLoading, isFetching, isSuccess } =
    useGetHistoryQuery(getParams);

  const [transactions, setTransactions] = useState<IWalletHistory[]>(
    data?.transactions ? data?.transactions : [],
  );

  useEffect(() => {
    if (data && currentPage !== 1) {
      setTransactions([...transactions, ...data.transactions]);
    } else {
      data && setTransactions(data.transactions);
    }
  }, [data]);

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
        <div className={styles.top}>
          <p>{t("wallet_history.wallet_history")}</p>
        </div>
        {screen > BREAKPOINT.MD && <BarHistory />}
        <div className={styles.cards}>
          {transactions?.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={MAIN_PAGE_ANIMATION.viewport}
              variants={MAIN_PAGE_ANIMATION.animationVision}
              className={styles.cards__list}
            >
              {transactions?.map((card, index) => (
                <motion.div
                  key={index}
                  custom={index % INTERSECTION_ELEMENTS.history}
                  initial="hidden"
                  animate="visible"
                  variants={MAIN_PAGE_ANIMATION.animationUp}
                >
                  <HistoryCard card={card} />
                </motion.div>
              ))}

              {(isFetching || isLoading) &&
                Array.from({ length: INTERSECTION_ELEMENTS.history }).map(
                  (_, index) => <SkeletonHistoryCard key={index} />,
                )}
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isFetching || isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            </motion.div>
          ) : (
            <div className={styles.empty__block}>
              <div className={styles.icon}>
                <SadSmileIcon />
              </div>
              <h3 className={styles.title}>{t("cart.empty")}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
