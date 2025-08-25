import { dateSortingTypes } from "@entities/platform";
import {
  IManagerNewProjects,
  IManagerProjects,
  IManagerSubprojects,
  IPostChannel,
} from "@entities/project";
import {
  MANAGER_ORDERS,
  MANAGER_PROJECTS,
  VIEWS_MANAGER,
  CREATE_PROJECT_NAME,
  CREATE_PROJECT_POSTS,
  CREATE_PROJECT_DATES,
  CREATE_PROJECT_AMOUNT,
  authApi,
} from "@shared/api";
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
      invalidatesTags: [
        MANAGER_PROJECTS,
        VIEWS_MANAGER,
        CREATE_PROJECT_NAME,
        CREATE_PROJECT_POSTS,
        CREATE_PROJECT_DATES,
        CREATE_PROJECT_AMOUNT,
      ],
    }),

    launchProject: build.mutation<{ success: boolean }, { project_id: string }>(
      {
        query: (params) => ({
          url: `/tariff/project/launch`,
          method: "PUT",
          params: params,
        }),
        // invalidatesTags: [MANAGER_PROJECTS, VIEWS_MANAGER],
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
      providesTags: [MANAGER_ORDERS],
    }),

    getManagerProjects: build.query<
      IManagerProjects | IManagerNewProjects | any,
      getManagerProjectsCardReq & { __isWebsocket?: boolean }
    >({
      query: ({ __isWebsocket, ...params }) => ({
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
                (response?.page - 1) * INTERSECTION_ELEMENTS.MANAGER_PROJECTS ||
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
        const newProjectsMap = new Map(newItems.projects.map((p) => [p.id, p]));

        // Обновляем старые элементы, если есть новые с тем же id
        const updatedOldProjects =
          currentCache?.projects?.map((old) =>
            newProjectsMap.has(old.id) ? newProjectsMap.get(old.id)! : old,
          ) || [];

        // Убираем уже обновленные ID из новых, чтобы они не дублировались
        const newIds = new Set(updatedOldProjects.map((p) => p.id));
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
      providesTags: [CREATE_PROJECT_POSTS],
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
