import { IBloggerOffers, offerStatusFilter } from "@entities/offer";
import { platformTypesNum } from "@entities/platform";
import { IOrderFeature } from "@entities/project";
import { authApi, ADV_PROJECTS, BLOGGER_OFFERS } from "@shared/api";
import { languagesNum } from "@shared/config";

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
  platform: platformTypesNum;
  language: languagesNum;
  page: number;
  date_sort: string;
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
