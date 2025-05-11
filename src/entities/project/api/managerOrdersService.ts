import { dateSortingTypes } from "@entities/platform";
import {
  IManagerNewProjects,
  IManagerProjects,
  IManagerSubprojects,
  IPostChannel,
} from "@entities/project";
import { MANAGER_PROJECTS, VIEWS_MANAGER, authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
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
  language: ENUM_LANGUAGES_NUM;
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
      { project_id: string; language: ENUM_LANGUAGES_NUM }
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
            response?.elements <=
              response?.projects?.length +
                (response?.page - 1) * INTERSECTION_ELEMENTS.MANAGER_ORDERS ||
            response?.projects?.length === 0,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { language, date_sort, status } = queryArgs;
        return `${endpointName}/${language}/${date_sort}/${status}`;
      },
      merge: (
        currentCache: IManagerProjects | IManagerNewProjects,
        newItems: IManagerProjects | IManagerNewProjects,
        arg,
      ) => {
        const existing = currentCache.projects ?? [];
        const incoming = newItems.projects ?? [];

        // Если это первая страница — добавляем новые в начало
        if (arg.arg.page === 1) {
          const existingIds = new Set(existing.map((el) => el.id));

          // Только те, которых ещё не было
          const uniqueNew = incoming.filter((el) => !existingIds.has(el.id));

          const merged = [...uniqueNew, ...existing];

          // Удалим дубликаты на всякий случай
          const seen = new Set<string>();
          const deduped = merged.filter((el) => {
            if (seen.has(el.id)) return false;
            seen.add(el.id);
            return true;
          });

          return {
            ...newItems,
            isLast: currentCache?.isLast,
            projects: deduped,
          };
        }

        return {
          ...newItems,
          projects: [...currentCache.projects, ...newItems.projects],
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
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
