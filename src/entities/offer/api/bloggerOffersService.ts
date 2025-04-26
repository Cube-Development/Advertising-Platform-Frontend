import { IBloggerOffers, offerStatusFilter } from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { IOrderFeature } from "@entities/project";
import {
  ADV_ORDERS,
  ADV_PROJECTS,
  authApi,
  BLOGGER_OFFERS,
  VIEWS_BLOGGER_OFFERS,
} from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";

export interface getOrdersByStatusReq {
  language: languagesNum;
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
      invalidatesTags: [
        BLOGGER_OFFERS,
        ADV_PROJECTS,
        VIEWS_BLOGGER_OFFERS,
        ADV_ORDERS,
      ],
    }),
    cancelOffer: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/blogger/cancel`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [
        BLOGGER_OFFERS,
        ADV_PROJECTS,
        VIEWS_BLOGGER_OFFERS,
        ADV_ORDERS,
      ],
    }),
    getBloggerOrders: build.query<IBloggerOffers, getOrdersByStatusReq>({
      query: (BodyParams) => ({
        url: `/order/get/blogger`,
        method: `POST`,
        body: BodyParams,
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
        if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }
        return {
          ...newItems,
          orders: [...currentCache.orders, ...newItems.orders],
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [BLOGGER_OFFERS],
    }),
  }),
});

export const {
  useAcceptOfferMutation,
  useCancelOfferMutation,
  usePublishPostBloggerMutation,
  useGetBloggerOrdersQuery,
} = bloggerOffersAPI;
