import {
  IBloggerOffers,
  IGetInvoiceRequest,
  IOrderAcceptFinallyRequest,
  offerStatusFilter,
} from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { IOrderFeature } from "@entities/project";
import {
  ADV_ORDERS,
  ADV_PROJECTS,
  authApi,
  BALANCE,
  BLOGGER_OFFERS,
  VIEWS_BLOGGER_OFFERS,
} from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";

export interface getOrdersByStatusReq {
  language: ENUM_LANGUAGES_NUM;
  page: number;
  date_sort: dateSortingTypes;
  elements_on_page?: number;
  status: offerStatusFilter | string;
  search_string?: string;
  order_id?: string;
}

export const bloggerOffersAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    publishPostBlogger: build.mutation<{ success: boolean }, IOrderFeature>({
      query: (body) => ({
        url: `/order/post/published`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    }),
    acceptOffer: build.mutation<{ success: boolean }, IOrderFeature>({
      query: (body) => ({
        url: `/order/blogger/accept`,
        method: "PUT",
        body: body,
      }),
      // invalidatesTags: [
      //   // BLOGGER_OFFERS,
      //   ADV_PROJECTS,
      //   // VIEWS_BLOGGER_OFFERS,
      //   ADV_ORDERS,
      // ],
    }),
    cancelOffer: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/blogger/cancel`,
        method: "PUT",
        params: params,
      }),
      // invalidatesTags: [
      //   // BLOGGER_OFFERS,
      //   ADV_PROJECTS,
      //   // VIEWS_BLOGGER_OFFERS,
      //   ADV_ORDERS,
      // ],
    }),
    getBloggerOrders: build.query<
      IBloggerOffers,
      getOrdersByStatusReq & { __isWebsocket?: boolean }
    >({
      query: ({ __isWebsocket, ...params }) => ({
        url: `/order/get/blogger`,
        method: `POST`,
        body: params,
      }),
      transformResponse: (response: IBloggerOffers, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.orders?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status } = queryArgs;
        return `${endpointName}/${status}/`;
      },
      merge: (currentCache, newItems, arg) => {
        const newMap = new Map(newItems?.orders?.map((p) => [p?.id, p]));

        // Обновляем старые элементы, если есть новые с тем же id
        const updatedOld =
          currentCache?.orders?.map((old) =>
            newMap?.has(old?.id) ? newMap?.get(old?.id)! : old,
          ) || [];

        // Убираем уже обновленные ID из новых, чтобы они не дублировались
        const newIds = new Set(updatedOld?.map((p) => p.id));
        const onlyNew = newItems?.orders?.filter((p) => !newIds.has(p?.id));

        if (arg.arg.__isWebsocket) {
          return {
            ...currentCache,
            orders: [...onlyNew, ...updatedOld],
          };
          // return {
          //   ...currentCache,
          //   orders: [...newItems.orders, ...filteredOld],
          // };
        } else if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }
        return {
          ...newItems,
          orders: [...updatedOld, ...onlyNew],
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [BLOGGER_OFFERS],
    }),
    getInvoiceInfo: build.mutation<object, IGetInvoiceRequest>({
      query: ({ order_id, doc_type }) => ({
        url: `/order/invoice-info/${order_id}`,
        method: "GET",
        params: { doc_type },
      }),
    }),

    orderAcceptFinally: build.mutation<
      { success: boolean },
      IOrderAcceptFinallyRequest
    >({
      query: (body) => ({
        url: `/order/blogger/accept-finally`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [BLOGGER_OFFERS, BALANCE],
    }),
  }),
});

export const {
  useAcceptOfferMutation,
  useCancelOfferMutation,
  usePublishPostBloggerMutation,
  useGetBloggerOrdersQuery,
  useGetInvoiceInfoMutation,
  useOrderAcceptFinallyMutation,
} = bloggerOffersAPI;
