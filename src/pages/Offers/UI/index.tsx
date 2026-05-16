import { channelData } from "@entities/channel";
import {
  getOrdersByStatusReq,
  ENUM_OFFER_STATUS,
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
import React, { FC, Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import styles from "./styles.module.scss";
import { UnrealizedWallet } from "@features/wallet";
// TEMPORARY — удалить импорт вместе с папкой `pages/Offers/temporary/`
import {
  sortOrdersByPublishDate,
  TEMPORARY_FETCH_ALL_ORDERS,
} from "../temporary/allOrdersWithoutPagination";

// Ленивый импорт компонента MyOffers
const MyOffers = React.lazy(() =>
  import("@widgets/offer")
    .then((module) => ({ default: module.MyOffers }))
    .catch(() => {
      // При ошибке перезагружаем страницу
      window.location.reload();
      return { default: () => null };
    }),
);

export const OffersPage: FC = () => {
  useClearCookiesOnPage();
  const page = ENUM_PAGE_FILTER.OFFER;
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { offer_status, order_id } = QueryParams();

  const startStatus =
    offer_status &&
    !!Object.values(ENUM_OFFER_STATUS).includes(
      offer_status as ENUM_OFFER_STATUS,
    )
      ? offer_status
      : ENUM_OFFER_STATUS.ACTIVE;

  const startOrderId = isValidUUID(order_id || "") ? order_id : undefined;

  const { setValue, watch } = useForm<getOrdersByStatusReq>({
    defaultValues: {
      status: startStatus,
      page: 1,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      // ORIGINAL pagination — раскомментировать при откате TEMPORARY
      // elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
      date_sort: dateSortingTypes.decrease,
      ...(startOrderId ? { search_string: startOrderId } : {}),
    },
  });
  const formState = watch();

  const changeStatus = (status: string) => {
    setValue("page", 1);
    setValue("status", status);
  };
  const {
    search_string,
    elements_on_page,
    page: formPage,
    ...params
  } = formState;
  const getParams: getOrdersByStatusReq = {
    ...params,
    // TEMPORARY — всегда page 1, без elements_on_page
    page: TEMPORARY_FETCH_ALL_ORDERS ? 1 : formPage,
    ...(TEMPORARY_FETCH_ALL_ORDERS
      ? {}
      : {
          elements_on_page:
            elements_on_page ?? INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
        }),
    // ORIGINAL pagination — раскомментировать при откате TEMPORARY
    // ...params,
    // page,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { order_id: search_string }
        : { search_string }
      : {}),
  };
  const { data, isFetching, refetch, originalArgs } = useGetBloggerOrdersQuery(
    getParams,
    {
      selectFromResult: ({ data, ...rest }) => {
        const matched =
          (data?.status === formState?.status && data) || undefined;

        if (!matched) {
          return { ...rest, data: undefined };
        }

        // TEMPORARY — клиентская сортировка + скрытие «показать ещё»
        if (TEMPORARY_FETCH_ALL_ORDERS) {
          return {
            ...rest,
            data: {
              ...matched,
              orders: sortOrdersByPublishDate(matched.orders ?? []),
              isLast: true,
            },
          };
        }

        return { ...rest, data: matched };
      },
    },
  );
  const { refetch: views } = useGetViewBloggerOrderQuery();

 // ORIGINAL pagination — раскомментировать при откате TEMPORARY
  // const handleOnChangePage = () => {
  //   const newPage = Math.floor(
  //     (data?.orders?.length || 0) / INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
  //   );
  //   setValue("page", newPage + 1);
  //
  //   if (data?.orders?.length === 0) {
  //     refetch();
  //   }
  // };
  const handleOnChangePage = () => {};

  // ORIGINAL pagination — раскомментировать при откате TEMPORARY
  // useEffect(() => {
  //   if (data && data?.orders?.length === 0 && !data?.isLast) {
  //     refetch();
  //   }
  // }, [data?.orders?.length]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.status, formState.search_string]);

  useEffect(() => {
    views();
  }, [formState.page, formState.status]);

  useEffect(() => {
    setValue("search_string", "");
    const newPath = buildPathWithQuery(ENUM_PATHS.OFFERS, {
      [queryParamKeys.offerStatus]: formState.status,
      ...(startOrderId ? { [queryParamKeys.orderId]: startOrderId } : {}),
    });
    navigate(newPath, { replace: true });
  }, [formState.status]);

  const isLoadingMore =
    !TEMPORARY_FETCH_ALL_ORDERS && isFetching && !originalArgs?.__isWebsocket;

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <div className="container">
        <div className={styles.wrapper}>
          <BarFilter
            page={page}
            listLength={!!data?.orders?.length}
            changeStatus={changeStatus}
            statusFilter={formState.status}
          />
          <SearchFilter
            type={channelData.search}
            onChange={setValue}
            value={formState.search_string}
          />
          <UnrealizedWallet />
          <MyOffers
            statusFilter={formState.status as ENUM_OFFER_STATUS}
            offers={data?.orders || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={TEMPORARY_FETCH_ALL_ORDERS ? true : data?.isLast || false}
            currentPage={TEMPORARY_FETCH_ALL_ORDERS ? 1 : formState?.page}
          />
        </div>
      </div>
    </Suspense>
  );
};
