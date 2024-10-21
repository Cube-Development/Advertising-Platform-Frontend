import { dateSortingTypes, PostTypesNum } from "@entities/platform";
import {
  advManagerProjectStatusFilter,
  IAdvManagerProjectsDev,
  IAdvProjects,
  IAdvSubprojects,
  ICreateDate,
  IFile,
  IPostChannel,
  managerProjectStatusFilter,
  myProjectStatusFilter,
} from "@entities/project";
import { ADV_PROJECTS, authApi, BLOGGER_OFFERS } from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";

export interface ICreatePostReq {
  project_id: string;
  post_type: PostTypesNum;
  comment?: string;
  files?: IFile[];
}

export interface ICreateUniquePostReq {
  project_id: string;
  comment?: string;
  files?: IFile[];
  orders: string[];
}

export interface getProjectsCardReq {
  language?: number;
  page: number;
  status:
    | advManagerProjectStatusFilter
    | myProjectStatusFilter
    | managerProjectStatusFilter
    | string;
  elements_on_page?: number;
  date_sort?: dateSortingTypes;
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
    getUploadLink: build.mutation<
      { file_name: string; url: string },
      { extension: string; content_type: number }
    >({
      query: (params) => ({
        url: `/file/upload_link`,
        method: "GET",
        params: params,
      }),
    }),
    projectName: build.mutation<
      { success: boolean },
      { project_id: string; name: string }
    >({
      query: (params) => ({
        url: `/order/project-name`,
        method: "POST",
        params: params,
      }),
    }),
    createPost: build.mutation<{ success: boolean }, ICreatePostReq>({
      query: (body) => ({
        url: `/order/post`,
        method: "POST",
        body: body,
      }),
    }),
    createUniquePost: build.mutation<
      { success: boolean },
      ICreateUniquePostReq
    >({
      query: (body) => ({
        url: `/tariff/order/post-per-order`,
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
    getProjectAmount: build.query<{ amount: number }, { project_id: string }>({
      query: (params) => ({
        url: `/order/project/amount`,
        method: "GET",
        params,
      }),
    }),
    acceptOrder: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/advertiser/accept`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    }),
    rejectOrder: build.mutation<
      { success: boolean },
      { order_id: string; comment: string }
    >({
      query: (params) => ({
        url: `/order/advertiser/reject`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    }),
    getAdvProjects: build.query<IAdvProjects, getProjectsCardReq>({
      query: (BodyParams) => ({
        url: `/order/project/get/advertiser`,
        method: `POST`,
        body: BodyParams,
      }),
      transformResponse: (response: IAdvProjects, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast: response.projects.length !== INTERSECTION_ELEMENTS.advOrders,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status } = queryArgs;
        // console.log( `${endpointName}/${status}/${page}`)
        return `${endpointName}/${status}`;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            status: arg.arg.status,
            isLast:
              newItems.projects.length !== INTERSECTION_ELEMENTS.advOrders,
          };
        }

        return {
          ...newItems,
          projects: [...currentCache.projects, ...newItems.projects],
          status: arg.arg.status,
          isLast: newItems.projects.length !== INTERSECTION_ELEMENTS.advOrders,
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: [ADV_PROJECTS],
    }),
    getAdvSubprojects: build.query<IAdvSubprojects, getProjectSubcardReq>({
      query: (BodyParams) => ({
        url: `/order/project/orders`,
        method: `POST`,
        body: BodyParams,
      }),
      providesTags: [ADV_PROJECTS],
    }),

    getAdvManagerSubprojects: build.query<
      IAdvSubprojects,
      getProjectSubcardReq
    >({
      query: (params) => ({
        url: `/tariff/order`,
        method: `GET`,
        params: params,
      }),
      providesTags: [ADV_PROJECTS],
    }),

    approveAdvManagerProject: build.mutation<
      { success: boolean },
      { project_id: string }
    >({
      query: (params) => ({
        url: `/tariff/project/approve`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [ADV_PROJECTS],
    }),

    getAdvManagerProjects: build.query<
      IAdvManagerProjectsDev | IAdvProjects | any,
      getProjectsCardReq
    >({
      query: (params) => ({
        url: `/tariff/advertiser`,
        method: "GET",
        params: params,
      }),
      transformResponse: (
        response: IAdvManagerProjectsDev | IAdvProjects | any,
        meta,
        arg,
      ) => {
        return {
          ...response,
          status: arg?.status,
          isLast: response.projects.length !== INTERSECTION_ELEMENTS.advOrders,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { language, date_sort, status } = queryArgs;
        return `${endpointName}/${language}/${date_sort}/${status}`;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            status: arg.arg.status,
            isLast:
              newItems.projects.length !== INTERSECTION_ELEMENTS.advOrders,
          };
        }

        return {
          ...newItems,
          projects: [...currentCache.projects, ...newItems.projects],
          status: arg.arg.status,
          isLast: newItems.projects.length !== INTERSECTION_ELEMENTS.advOrders,
        };
      },
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetUploadLinkMutation,
  useProjectOrdersQuery,
  useProjectNameMutation,
  useCreatePostMutation,
  useCreateUniquePostMutation,
  useCreateOrderDatesMutation,
  useGetProjectAmountQuery,
  useAcceptOrderMutation,
  useApproveAdvManagerProjectMutation,
  useRejectOrderMutation,
  useGetAdvProjectsQuery,
  useGetAdvSubprojectsQuery,
  useGetAdvManagerProjectsQuery,
  useGetAdvManagerSubprojectsQuery,
} = advProjectsAPI;
