import {
  AGENCY_PROJECTS_CUSTOMER,
  AGENCY_PROJECTS_MANAGER,
  AGENCY_PROJECTS_PUBLISHER,
  authApi,
  baseApi,
} from "@shared/api";
import {
  ENUM_VIEWER_ROLES,
  IAgencyProjectCard,
  IManagerAgencyProjectCard,
  IOrderPrice,
  IOrderReportInfo,
} from "../types";
import { desireStatus, ENUM_MANAGER_PROJECT_STATUS } from "../config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { INTERSECTION_ELEMENTS } from "@shared/config";

export interface IGetAgencyProjectsReq {
  page: number;
  status: Exclude<ENUM_MANAGER_PROJECT_STATUS, ENUM_MANAGER_PROJECT_STATUS.NEW>;
  elements_on_page?: number;
}
export interface IGetAgencyProjectsRes {
  page: number;
  elements: number;
  projects: IManagerAgencyProjectCard[];
  status?: string;
  isLast?: boolean;
}
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
    getAgencyProjects: build.query<
      IGetAgencyProjectsRes,
      IGetAgencyProjectsReq & { __isWebsocket?: boolean }
    >({
      query: ({ __isWebsocket, ...params }) => ({
        url: `/agency/projects`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IGetAgencyProjectsRes, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements <=
              response?.projects?.length +
                (response?.page - 1) * INTERSECTION_ELEMENTS.MANAGER_PROJECTS ||
            response?.projects?.length === 0,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status } = queryArgs;
        return `${endpointName}/${status}`;
      },
      merge: (
        currentCache: IGetAgencyProjectsRes,
        newItems: IGetAgencyProjectsRes,
        arg,
      ) => {
        const newProjectsMap = new Map(
          newItems.projects.map((p: IManagerAgencyProjectCard) => [p.id, p]),
        );

        // Обновляем старые элементы, если есть новые с тем же id
        const updatedOldProjects =
          currentCache?.projects?.map((old: IManagerAgencyProjectCard) =>
            newProjectsMap.has(old.id) ? newProjectsMap.get(old.id)! : old,
          ) || [];

        // Убираем уже обновленные ID из новых, чтобы они не дублировались
        const newIds = new Set(
          updatedOldProjects.map((p: IManagerAgencyProjectCard) => p.id),
        );
        const onlyNewProjects = newItems.projects.filter(
          (p) => !newIds.has(p.id),
        );

        if (arg.arg.__isWebsocket) {
          return {
            ...currentCache,
            projects: [...onlyNewProjects, ...updatedOldProjects],
          };
        } else if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }

        return {
          ...newItems,
          projects: [...updatedOldProjects, ...onlyNewProjects],
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [AGENCY_PROJECTS_MANAGER],
    }),
    createAgencyProject: build.mutation<{ project_id: string }, void>({
      query: () => ({
        url: `/agency/project`,
        method: "POST",
      }),
      invalidatesTags: [AGENCY_PROJECTS_MANAGER],
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
      invalidatesTags: [AGENCY_PROJECTS_MANAGER],
    }),
    launchAgencyProject: build.mutation<void, { project_id: string }>({
      query: (body) => ({
        url: `/agency/project/launch`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [AGENCY_PROJECTS_MANAGER],
    }),
    getProjectAccessCodes: build.query<
      IGetProjectAccessCodesRes,
      { project_id: string }
    >({
      query: (params) => ({
        url: `/agency/project/access`,
        method: "GET",
        params: params,
      }),
    }),
    getTelegramNotificationLink: build.query<{ deeplink_url: string }, void>({
      query: () => ({
        url: `/agency/user/telegram`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAgencyProjectsQuery,
  useCreateAgencyProjectMutation,
  useCreateOrderPricesMutation,
  useGetOrderPricesQuery,
  useRequestApproveMutation,
  useLaunchAgencyProjectMutation,
  useGetProjectAccessCodesQuery,
  useGetTelegramNotificationLinkQuery,
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
      IOrderReportInfo,
      { project_id: string }
    >({
      query: (params) => ({
        url: `/agency/project/request-approve/report`,
        method: "GET",
        params: params,
      }),
    }),
    downloadCompletedReport: build.mutation<
      IOrderReportInfo,
      { project_id: string }
    >({
      query: (params) => ({
        url: `/agency/project/completed/report`,
        method: "GET",
        params: params,
      }),
    }),
    getTelegramRoleNotificationLink: build.query<
      {
        deeplink_url: string;
      },
      {
        project_id: string;
        code: number;
        subrole: ENUM_VIEWER_ROLES;
      }
    >({
      query: (body) => ({
        url: `/agency/actor/telegram`,
        method: "POST",
        body,
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
  useGetTelegramRoleNotificationLinkQuery,
  useLazyGetTelegramRoleNotificationLinkQuery,
} = agencyPublicAPI;
