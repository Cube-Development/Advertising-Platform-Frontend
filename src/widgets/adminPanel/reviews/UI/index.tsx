import {
  ADMIN_REVIEW_FORM,
  ADMIN_REVIEW_STATUS,
  getAdminReviewsReq,
  useGetAdminReviewsQuery,
} from "@entities/admin";
import { BarSubfilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { pageFilter } from "@shared/routing";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ReviewsList } from "../reviewsList";
import styles from "./styles.module.scss";

export const Reviews: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { watch, setValue } = useForm<getAdminReviewsReq>({
    defaultValues: {
      page: 1,
      status: ADMIN_REVIEW_STATUS.WAIT,
      elements_on_page: INTERSECTION_ELEMENTS.ADMIN_REVIEWS,
    },
  });
  const formFields = watch();
  const { data, isLoading, isFetching } = useGetAdminReviewsQuery({
    ...formFields,
  });

  const handleOnChangePage = () => {
    setValue(ADMIN_REVIEW_FORM.PAGE, formFields?.page + 1);
  };

  const setComplaintFilter = (filter: ADMIN_REVIEW_STATUS) => {
    setValue(ADMIN_REVIEW_FORM.PAGE, 1);
    setValue(ADMIN_REVIEW_FORM.STATUS, filter);
  };
  console.log(data);
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
              resetValues={() => {}}
              reviewsFilter={formFields?.status}
              changeReviewsFilter={setComplaintFilter}
            />
          </div>
          <ReviewsList
            status={formFields?.status}
            data={(data?.status === formFields.status && data) || undefined}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
