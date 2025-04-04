import {
  getOrdersByStatusReq,
  offerStatusFilter,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { useGetViewBloggerOrderQuery } from "@entities/views";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { pageFilter, paths } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

// Ленивый импорт компонента MyOffers
const MyOffers = React.lazy(() =>
  import("@widgets/offer").then((module) => ({ default: module.MyOffers })),
);

export const OffersPage: FC = () => {
  useClearCookiesOnPage();
  const page = pageFilter.offer;
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { offer_status } = QueryParams();

  const { setValue, watch } = useForm<getOrdersByStatusReq>({
    defaultValues: {
      status:
        offer_status &&
        !!Object.values(offerStatusFilter).includes(
          offer_status as offerStatusFilter,
        )
          ? offer_status
          : offerStatusFilter.active,
      page: 1,
      language: language?.id || Languages[0].id,
      elements_on_page: INTERSECTION_ELEMENTS.bloggerOffers,
      date_sort: dateSortingTypes.decrease,
    },
  });
  const formState = watch();

  const changeStatus = (status: string) => {
    setValue("page", 1);
    setValue("status", status);
  };

  const { data, isFetching } = useGetBloggerOrdersQuery(formState);
  const { refetch: views } = useGetViewBloggerOrderQuery();

  const handleOnChangePage = () => {
    setValue("page", formState.page + 1);
  };

  useEffect(() => {
    views();
  }, [formState.page, formState.status]);

  useEffect(() => {
    const newPath = buildPathWithQuery(paths.offers, {
      [queryParamKeys.offerStatus]: formState.status,
    });
    navigate(newPath, { replace: true });
  }, [formState.status]);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
        <div className={styles.wrapper}>
          <BarFilter
            page={page}
            listLength={!!data?.orders?.length}
            setValue={setValue}
            changeStatus={changeStatus}
            statusFilter={formState.status}
          />

          <MyOffers
            statusFilter={formState.status as offerStatusFilter}
            offers={(data?.status === formState.status && data?.orders) || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isLast={data?.isLast || false}
          />
        </div>
      </div>
    </Suspense>
  );
};
