import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import {
  HistoryReq,
  useGetHistoryQuery,
} from "@shared/store/services/walletService";
import { IWalletHistory } from "@shared/types/history";
import { Languages } from "@shared/config/languages";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SadSmileIcon } from "@shared/assets";
import { HistoryCard } from "@entities/wallet";
import { BarHistory } from "@features/wallet";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";

export const History: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.hisory,
    date_sort: "increase",
  };

  const { data, isFetching } = useGetHistoryQuery(getParams);

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

  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <p>{t("wallet_history.wallet_history")}</p>
        </div>
        <BarHistory />
        <div className={styles.cards}>
          {transactions?.length > 0 ? (
            <div className={styles.cards__list}>
              {transactions?.map((card, index) => (
                <HistoryCard card={card} key={index} />
              ))}
              {data &&
                data?.transactions?.length === INTERSECTION_ELEMENTS.hisory && (
                  <div
                    className={styles.show_more}
                    onClick={handleOnChangePage}
                  >
                    {isFetching ? <SpinnerLoader /> : <ShowMoreBtn />}
                  </div>
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
        </div>
      </div>
    </div>
  );
};
