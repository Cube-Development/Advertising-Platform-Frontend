import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { BarHistory } from "@features/barHistory";
import { HistoryCard } from "@features/historyCard";
import {
  HistoryReq,
  useGetHistoryQuery,
} from "@shared/store/services/walletService";
import { IWalletHistory } from "@shared/types/history";
import { Languages } from "@shared/config/languages";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "@features/showMore";
import { SadSmileIcon } from "@shared/assets";

export const WalletHistory: FC = () => {
  const { t, i18n } = useTranslation();
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  // const {
  //   reset,
  //   setValue,
  //   formState: { errors },
  //   getValues,
  // } = useForm<any>();

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
        <div className={styles.filter}>
          {/* <SelectOptions
            onChange={setValue}
            options={sortingTypes}
            textData="sorting.title"
            single={true}
            type={filterData.sort}
            isFilter={true}
          /> */}
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
