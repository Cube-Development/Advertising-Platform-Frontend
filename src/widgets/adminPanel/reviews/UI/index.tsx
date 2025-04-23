import {
  ADMIN_REVIEW_FILTER_TABS_LIST,
  ADMIN_REVIEW_FORM,
  ADMIN_REVIEW_STATUS,
  getAdminReviewsReq,
  useGetAdminReviewsQuery,
} from "@entities/admin";
import { BarSubFilter } from "@features/other";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
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
  const { data, isLoading, isFetching } = useGetAdminReviewsQuery(
    { ...formFields },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: (data?.status === formFields?.status && data) || undefined,
      }),
    },
  );

  const handleOnChangePage = () => {
    setValue(ADMIN_REVIEW_FORM.PAGE, formFields?.page + 1);
  };

  const changeTab = (filter: ADMIN_REVIEW_STATUS) => {
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
            <BarSubFilter
              tab={formFields?.status}
              changeTab={changeTab}
              tab_list={ADMIN_REVIEW_FILTER_TABS_LIST}
            />
          </div>
          <ReviewsList
            status={formFields?.status}
            data={data}
            isLoading={isLoading}
            isFetching={isFetching}
            handleChange={handleOnChangePage}
          />
        </div>
      </div>
    </div>
  );
};
