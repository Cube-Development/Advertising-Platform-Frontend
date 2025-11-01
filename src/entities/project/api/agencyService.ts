import {
  AGENCY_PROJECTS_CUSTOMER,
  AGENCY_PROJECTS_PUBLISHER,
  authApi,
  baseApi,
} from "@shared/api";
import { ENUM_VIEWER_ROLES, IAgencyProjectCard, IOrderPrice } from "../types";
import { desireStatus } from "../config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";

export interface ICreateOrderPricesReq {
  orders: {
    order_id: string;
    price: number;
  }[];
}
export interface IGetOrderPricesRes {
  items: IOrderPrice[];
}
export interface IGetProjectAccessCodesRes {
  access: {
    role: ENUM_VIEWER_ROLES;
    code: number;
  }[];
}

export const agencyAuthAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createAgencyProject: build.mutation<{ project_id: string }, void>({
      query: () => ({
        url: `/agency/project`,
        method: "POST",
      }),
    }),
    createOrderPrices: build.mutation<void, ICreateOrderPricesReq>({
      query: (body) => ({
        url: `/agency/project/prices`,
        method: "POST",
        body: body,
      }),
    }),
    getOrderPrices: build.query<IGetOrderPricesRes, { project_id: string }>({
      query: (params) => ({
        url: `/agency/project/prices`,
        method: "GET",
        params: params,
      }),
    }),
    requestApprove: build.mutation<void, { project_id: string }>({
      query: (body) => ({
        url: `/agency/project/request-approve`,
        method: "POST",
        body: body,
      }),
    }),
    launchAgencyProject: build.mutation<void, { project_id: string }>({
      query: (body) => ({
        url: `/agency/project/launch`,
        method: "POST",
        body: body,
      }),
    }),
    getProjectAccessCodes: build.mutation<
      IGetProjectAccessCodesRes,
      { project_id: string }
    >({
      query: (params) => ({
        url: `/agency/project/access`,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const {
  useCreateAgencyProjectMutation,
  useCreateOrderPricesMutation,
  useGetOrderPricesQuery,
  useRequestApproveMutation,
  useLaunchAgencyProjectMutation,
  useGetProjectAccessCodesMutation,
} = agencyAuthAPI;

export interface IAgencyProjectChangeReq {
  code: number;
  order_id: string;
  desire: desireStatus;
  comment: string;
}
export interface IPublishPostReq {
  project_id: string;
  order_id: string;
  post_url: string;
  published: string;
  code: number;
}
export interface ICancelOrderReq {
  project_id: string;
  order_id: string;
  code: number;
}
export interface IGetProjectReq {
  project_id: string;
  code: number;
  language: ENUM_LANGUAGES_NUM;
}

export const agencyPublicAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // custom endpoints
    agencyProjectChange: build.mutation<void, IAgencyProjectChangeReq>({
      query: (body) => ({
        url: `/agency/project/change`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [AGENCY_PROJECTS_CUSTOMER],
    }),
    agencyApproveProject: build.mutation<
      void,
      { project_id: string; code: number }
    >({
      query: (body) => ({
        url: `/agency/project/approve`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [AGENCY_PROJECTS_CUSTOMER],
    }),

    // published endpoints
    publishPost: build.mutation<void, IPublishPostReq>({
      query: (body) => ({
        url: `/agency/project/order/publish`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [AGENCY_PROJECTS_PUBLISHER],
    }),
    cancelOrder: build.mutation<void, ICancelOrderReq>({
      query: (body) => ({
        url: `/agency/project/order/cancel`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [AGENCY_PROJECTS_PUBLISHER],
    }),

    // all roles
    getProject: build.query<IAgencyProjectCard, IGetProjectReq>({
      query: (params) => ({
        url: `/agency/project/page`,
        method: "GET",
        params: params,
      }),
      providesTags: [AGENCY_PROJECTS_CUSTOMER, AGENCY_PROJECTS_PUBLISHER],
    }),
    downloadRequestApproveReport: build.mutation<
      string,
      { project_id: string }
    >({
      query: (params) => ({
        url: `/agency/project/request-approve/report`,
        method: "GET",
        params: params,
      }),
    }),
    downloadCompletedReport: build.mutation<string, { project_id: string }>({
      query: (params) => ({
        url: `/agency/project/completed/report`,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const {
  useAgencyProjectChangeMutation,
  useAgencyApproveProjectMutation,
  usePublishPostMutation,
  useCancelOrderMutation,
  useGetProjectQuery,
  useDownloadRequestApproveReportMutation,
  useDownloadCompletedReportMutation,
} = agencyPublicAPI;
