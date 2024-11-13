import { adminReviewTypesFilter, IAdminReviews } from "@entities/admin";
import { dateSortingTypes } from "@entities/platform";
import { HistoryReq, useGetHistoryQuery } from "@entities/wallet";
import { BarSubfilter } from "@features/other";
import { AdminReviews, INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReviewsList } from "../reviewsList";
import styles from "./styles.module.scss";

export const Reviews: FC = () => {
  const { t, i18n } = useTranslation();
  const wait = AdminReviews.filter((item) => !item.closeDate);
  const accept = AdminReviews.filter((item) => item.closeDate);
  const [reviewsFilter, setReviewsFilter] = useState<adminReviewTypesFilter>(
    adminReviewTypesFilter.wait,
  );
  const [reviewsData, setReviewsData] = useState<IAdminReviews>({
    page: 1,
    elements: wait.length,
    reviews: wait.slice(0, INTERSECTION_ELEMENTS.adminReviews),
  });

  useEffect(() => {
    if (reviewsFilter === adminReviewTypesFilter.wait) {
      setReviewsData({
        ...reviewsData,
        elements: wait.length,
        reviews: wait.slice(
          0,
          reviewsData.page * INTERSECTION_ELEMENTS.adminReviews,
        ),
      });
    } else {
      setReviewsData({
        ...reviewsData,
        elements: accept.length,
        reviews: accept,
      });
    }
  }, [reviewsFilter]);

  const handle = () => {};

  ////
  // удалить

  const language = Languages.find((lang) => lang.name === i18n.language);
  const [currentPage, setCurrentPage] = useState(1);

  const getParams: HistoryReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    elements_on_page: INTERSECTION_ELEMENTS.history,
    date_sort: dateSortingTypes.decrease,
  };

  const { data, isLoading, isFetching } = useGetHistoryQuery(getParams);

  const handleOnChangePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setReviewsData({ ...reviewsData, page: reviewsData.page + 1 });
  };

  /////

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h1>{t("admin_panel.pages.reviews")}</h1>
          <p>
            {t("admin_panel.pages.moderation")}
            <span> / {t("admin_panel.pages.reviews")}</span>
          </p>
        </div>
        <div className={styles.table}>
          <div className={styles.filter}>
            <BarSubfilter
              page={pageFilter.adminReviews}
              resetValues={handle}
              reviewsFilter={reviewsFilter}
              changeReviewsFilter={setReviewsFilter}
            />
          </div>
          <ReviewsList
            status={reviewsFilter}
            data={reviewsData}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
