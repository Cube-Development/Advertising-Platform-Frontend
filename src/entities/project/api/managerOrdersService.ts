import { dateSortingTypes } from "@entities/platform";
import {
  IManagerNewProjects,
  IManagerProjects,
  IManagerSubprojects,
  IPostChannel,
} from "@entities/project";
import { MANAGER_PROJECTS, VIEWS_MANAGER, authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";
import { IManagerProjectPosts } from "../types/managerProject";

export interface getManagerProjectsCardReq {
  page: number;
  date_sort?: dateSortingTypes;
  elements_on_page?: number;
  status: string;
  language?: number;
}

export interface getManagerProjectOrdersReq {
  project_id: string;
  language: languagesNum;
  page: number;
  elements_on_page?: number;
}

export interface getManagerProjectOrdersRes {
  page: number;
  elements: number;
  orders: IPostChannel[];
}

export interface getPostsReq {
  project_id: string;
  page: number;
  elements_on_page?: number;
}

export const managerProjectsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createProjectCart: build.mutation<
      { succsess: boolean },
      { project_id: string; language: languagesNum }
    >({
      query: (params) => ({
        url: `/cart/project/attach/`,
        method: "POST",
        params: params,
      }),
    }),

    approveProject: build.mutation<
      { success: boolean },
      { project_id: string }
    >({
      query: (params) => ({
        url: `/tariff/project/request-approve`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [MANAGER_PROJECTS, VIEWS_MANAGER],
    }),

    launchProject: build.mutation<{ success: boolean }, { project_id: string }>(
      {
        query: (params) => ({
          url: `/tariff/project/launch`,
          method: "PUT",
          params: params,
        }),
        invalidatesTags: [MANAGER_PROJECTS, VIEWS_MANAGER],
      },
    ),

    getManagerSubprojects: build.query<
      IManagerSubprojects,
      getManagerProjectOrdersReq
    >({
      query: (params) => ({
        url: `/tariff/order`,
        method: `GET`,
        params: params,
      }),
      // providesTags: [ADV_PROJECTS],
    }),

    getManagerProjects: build.query<
      IManagerProjects | IManagerNewProjects | any,
      getManagerProjectsCardReq
    >({
      query: (params) => ({
        url: `/tariff/`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (
        response: IManagerProjects | IManagerNewProjects,
        meta,
        arg,
      ) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.projects?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.managerOrders,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { language, date_sort, status } = queryArgs;
        return `${endpointName}/${status}/${date_sort}/${language}`;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }

        return {
          ...newItems,
          projects: [...currentCache.projects, ...newItems.projects],
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: [MANAGER_PROJECTS],
    }),

    getManagerProjectOrders: build.query<
      getManagerProjectOrdersRes,
      getManagerProjectOrdersReq
    >({
      query: (params) => ({
        url: `/order/datetime-setup`,
        method: "GET",
        params: params,
      }),
    }),

    getManagerProjectOrdersRereview: build.query<
      getManagerProjectOrdersRes,
      getManagerProjectOrdersReq
    >({
      query: (params) => ({
        url: `/order/datetime`,
        method: "GET",
        params: params,
      }),
    }),

    getPostsRereview: build.query<IManagerProjectPosts, getPostsReq>({
      query: (params) => ({
        url: `/order/posts`,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const {
  useLaunchProjectMutation,
  useGetManagerProjectsQuery,
  useApproveProjectMutation,
  useGetManagerSubprojectsQuery,
  useCreateProjectCartMutation,
  useGetManagerProjectOrdersQuery,
  useGetManagerProjectOrdersRereviewQuery,
  useGetPostsRereviewQuery,
} = managerProjectsAPI;
