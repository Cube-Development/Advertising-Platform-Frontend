import { authApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";
import { IAdvProjects, IAdvSubprojects } from "@shared/types/advProject";
import {
  ICreateDate,
  ICreatePost,
  IPostChannel,
} from "@shared/types/createPost";

export interface getProjectsCardReq {
  page: number;
  date_sort: string;
  elements_on_page?: number;
  status: string;
}

export interface getProjectSubcardReq {
  project_id: string;
  language: languagesNum;
  page: number;
  elements_on_page?: number;
}

export interface getProjectOrdersRes {
  page: number;
  elements: number;
  orders: IPostChannel[];
}

export const advProjectsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createCart: build.mutation<{ project_id: string }, void>({
      query: () => ({
        url: `/order/`,
        method: "POST",
      }),
    }),
    createPost: build.mutation<{ success: boolean }, ICreatePost>({
      query: (body) => ({
        url: `/order/post`,
        method: "POST",
        body: body,
      }),
    }),
    projectOrders: build.query<getProjectOrdersRes, getProjectSubcardReq>({
      query: (params) => ({
        url: `/order/datetime-setup`,
        method: "GET",
        params: params,
      }),
    }),
    createOrderDates: build.mutation<{ success: boolean }, ICreateDate>({
      query: (body) => ({
        url: `/order/dates`,
        method: "POST",
        body: body,
      }),
    }),
    acceptOrder: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/advertiser/accept`,
        method: "PUT",
        params: params,
      }),
    }),
    rejectOrder: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/advertiser/reject`,
        method: "PUT",
        params: params,
      }),
    }),
    getAdvProjects: build.query<IAdvProjects, getProjectsCardReq>({
      query: (BodyParams) => ({
        url: `/order/project/get/advertiser`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getAdvSubprojects: build.mutation<IAdvSubprojects, getProjectSubcardReq>({
      query: (BodyParams) => ({
        url: `/order/project/orders`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});

export const {
  useAcceptOrderMutation,
  useCreateCartMutation,
  useProjectOrdersQuery,
  useCreatePostMutation,
  useCreateOrderDatesMutation,
  useRejectOrderMutation,
  useGetAdvProjectsQuery,
  useGetAdvSubprojectsMutation,
} = advProjectsAPI;
