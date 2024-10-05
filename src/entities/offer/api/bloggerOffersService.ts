import { IBloggerOffers, offerStatusFilter } from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { IOrderFeature } from "@entities/project";
import { ADV_PROJECTS, authApi, BLOGGER_OFFERS } from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";

interface OrderDate {
  date: string;
}
interface OrderDates {
  date: [
    {
      date_from: string;
      date_to: string;
    },
  ];
}

export interface getOrdersByStatusReq {
  language: languagesNum;
  page: number;
  date_sort: dateSortingTypes;
  elements_on_page?: number;
  status: offerStatusFilter | string;
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
    checkOrderDates: build.mutation<
      OrderDate | OrderDates,
      { order_id: string }
    >({
      query: (params) => ({
        url: `/order/check/dates`,
        method: "GET",
        params: params,
      }),
    }),
    acceptOffer: build.mutation<{ success: boolean }, IOrderFeature>({
      query: (body) => ({
        url: `/order/blogger/accept`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    }),
    cancelOffer: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/blogger/cancel`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
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
            response.orders.length !== INTERSECTION_ELEMENTS.bloggerOffers,
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
            status: arg.arg.status,
            isLast:
              newItems.orders.length !== INTERSECTION_ELEMENTS.bloggerOffers,
          };
        }
        return {
          ...newItems,
          orders: [...currentCache.orders, ...newItems.orders],
          status: arg.arg.status,
          isLast:
            newItems.orders.length !== INTERSECTION_ELEMENTS.bloggerOffers,
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: [BLOGGER_OFFERS],
    }),
  }),
});

export const {
  useAcceptOfferMutation,
  useCancelOfferMutation,
  useCheckOrderDatesMutation,
  usePublishPostBloggerMutation,
  useGetBloggerOrdersQuery,
} = bloggerOffersAPI;
