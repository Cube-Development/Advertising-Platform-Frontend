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
import { pageFilter } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

// Ленивый импорт компонента MyOffers
const MyOffers = React.lazy(() =>
  import("@widgets/offer").then((module) => ({ default: module.MyOffers })),
);

export const OffersPage: FC = () => {
  useClearCookiesOnPage();
  const page = pageFilter.offer;
  const language = useFindLanguage();

  const { setValue, watch } = useForm<getOrdersByStatusReq>({
    defaultValues: {
      // platform: platformTypes[0].id,
      status: offerStatusFilter.active,
      page: 1,
      language: language?.id || Languages[0].id,
      elements_on_page: INTERSECTION_ELEMENTS.bloggerOffers,
      date_sort: dateSortingTypes.decrease,
    },
  });
  const formState = watch();

  const changeStatus = (status: any) => {
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
