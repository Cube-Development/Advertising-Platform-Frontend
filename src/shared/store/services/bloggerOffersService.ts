import { authApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";
import { offerStatusFilter } from "@shared/config/offerFilter";
import { platformTypesNum } from "@shared/config/platformTypes";
import { IBloggerOffers } from "@shared/types/bloggerOffer";

export interface PublishPostReq {
  order_id: string;
  url: string;
}

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

interface AcceptOrderReq {
  order_id: string;
  date?: string;
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
    publishPostBlogger: build.mutation<{ success: boolean }, PublishPostReq>({
      query: (body) => ({
        url: `/order/post/published`,
        method: "POST",
        body: body,
      }),
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
    acceptOffer: build.mutation<{ success: boolean }, AcceptOrderReq>({
      query: (body) => ({
        url: `/order/blogger/accept`,
        method: "PUT",
        body: body,
      }),
    }),
    cancelOffer: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/blogger/cancel`,
        method: "PUT",
        params: params,
      }),
    }),
    rejectOffer: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/blogger/reject`,
        method: "PUT",
        params: params,
      }),
    }),
    getBloggerOrders: build.query<IBloggerOffers, getOrdersByStatusReq>({
      query: (BodyParams) => ({
        url: `/order/get/blogger`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});

export const {
  useAcceptOfferMutation,
  useCancelOfferMutation,
  useCheckOrderDatesMutation,
  usePublishPostBloggerMutation,
  useRejectOfferMutation,
  useGetBloggerOrdersQuery,
} = bloggerOffersAPI;
