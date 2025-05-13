import { channelData } from "@entities/channel";
import {
  getOrdersByStatusReq,
  offerStatusFilter,
  useGetBloggerOrdersQuery,
} from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { useFindLanguage } from "@entities/user";
import { useGetViewBloggerOrderQuery } from "@entities/views";
import { SearchFilter } from "@features/catalog";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { useClearCookiesOnPage } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import React, { FC, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import styles from "./styles.module.scss";

// Ленивый импорт компонента MyOffers
const MyOffers = React.lazy(() =>
  import("@widgets/offer").then((module) => ({ default: module.MyOffers })),
);

export const OffersPage: FC = () => {
  useClearCookiesOnPage();
  const page = ENUM_PAGE_FILTER.OFFER;
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { offer_status, order_id } = QueryParams();

  const startStatus =
    offer_status &&
    !!Object.values(offerStatusFilter).includes(
      offer_status as offerStatusFilter,
    )
      ? offer_status
      : offerStatusFilter.active;

  const startOrderId = isValidUUID(order_id || "") ? order_id : undefined;

  const { setValue, watch } = useForm<getOrdersByStatusReq>({
    defaultValues: {
      status: startStatus,
      page: 1,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
      date_sort: dateSortingTypes.decrease,
      ...(startOrderId ? { search_string: startOrderId } : {}),
    },
  });
  const formState = watch();

  const changeStatus = (status: string) => {
    setValue("page", 1);
    setValue("status", status);
  };
  const { search_string, ...params } = formState;
  const getParams: getOrdersByStatusReq = {
    ...params,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { order_id: search_string }
        : { search_string }
      : {}),
  };
  const { data, isFetching, refetch } = useGetBloggerOrdersQuery(getParams, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: (data?.status === formState?.status && data) || undefined,
    }),
  });
  const { refetch: views } = useGetViewBloggerOrderQuery();

  const handleOnChangePage = () => {
    const newPage = Math.floor(
      (data?.orders?.length || 0) / INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    );
    console.log("newPage", newPage);
    setValue("page", newPage + 1);

    if (data?.orders?.length === 0) {
      refetch();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.status, formState.search_string]);

  useEffect(() => {
    views();
  }, [formState.page, formState.status]);

  useEffect(() => {
    const newPath = buildPathWithQuery(ENUM_PATHS.OFFERS, {
      [queryParamKeys.offerStatus]: formState.status,
      ...(startOrderId ? { [queryParamKeys.orderId]: startOrderId } : {}),
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
          <SearchFilter
            type={channelData.search}
            onChange={setValue}
            value={formState.search_string}
          />
          <MyOffers
            statusFilter={formState.status as offerStatusFilter}
            offers={data?.orders || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isLast={data?.isLast || false}
            currentPage={formState?.page}
          />
        </div>
      </div>
    </Suspense>
  );
};
