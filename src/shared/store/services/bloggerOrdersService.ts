import { authApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";
import { offerStatusFilter } from "@shared/config/offerFilter";
import { platformTypesNum } from "@shared/config/platformTypes";
import { IBloggerOffers } from "@shared/types/bloggerOffer";

export interface getOrderssByStatusReq {
  platform: platformTypesNum;
  language: languagesNum;
  page: number;
  date_sort: string;
  elements_on_page?: number;
  status: offerStatusFilter | string;
}

export const bloggerOrdersAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getBloggerOrders: build.query<IBloggerOffers, getOrderssByStatusReq>({
      query: (BodyParams) => ({
        url: `/order/get/blogger`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});

export const { useGetBloggerOrdersQuery } = bloggerOrdersAPI;
