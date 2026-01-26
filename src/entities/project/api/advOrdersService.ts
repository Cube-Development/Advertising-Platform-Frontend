import { dateSortingTypes, PostTypesNum } from "@entities/platform";
import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  IAdvManagerProjectsDev,
  IAdvProjects,
  IAdvSubprojects,
  ICreateDate,
  IFile,
  IOrderReportInfo,
  IPostChannel,
  ENUM_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_AGENCY_PROJECT_STATUS,
  ISavedProjects,
} from "@entities/project";
import {
  ADV_ORDERS,
  ADV_PROJECTS,
  ADV_TARIFF_ORDERS,
  ADV_TARIFF_PROJECTS,
  authApi,
  CREATE_PROJECT_AMOUNT,
  CREATE_PROJECT_DATES,
  CREATE_PROJECT_NAME,
  MANAGER_ORDERS,
  VIEWS_ADVERTISER,
  VIEWS_MANAGER,
} from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";

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
  language?: ENUM_LANGUAGES_NUM;
  page: number;
  status:
    | ENUM_ADV_MANAGER_PROJECT_STATUS
    | ENUM_ADV_MY_PROJECT_STATUS
    | ENUM_MANAGER_PROJECT_STATUS
    | ENUM_AGENCY_PROJECT_STATUS
    | string;
  elements_on_page?: number;
  date_sort?: dateSortingTypes;
  search_string?: string;
  project_id?: string;
}

export interface getSavedProjectsCardReq {
  page: number;
  elements_on_page?: number;
}

export interface getProjectSubcardReq {
  project_id: string;
  language: ENUM_LANGUAGES_NUM;
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
      invalidatesTags: [CREATE_PROJECT_NAME],
    }),
    getProjectName: build.query<{ name: string }, { project_id: string }>({
      query: (params) => ({
        url: `/order/project-name`,
        method: "GET",
        params: params,
      }),
      providesTags: [CREATE_PROJECT_NAME],
      keepUnusedDataFor: 0,
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
        url: `/order/datetime`,
        method: "GET",
        params: params,
      }),
      transformResponse: (response: getProjectOrdersRes) => {
        const sortOrders = response?.orders?.sort((a, b) => {
          if (a.platform !== b.platform) {
            return a.platform - b.platform;
          }
          return a.post_type - b.post_type;
        });
        return {
          ...response,
          orders: sortOrders,
        };
      },
      providesTags: [CREATE_PROJECT_DATES],
      keepUnusedDataFor: 0,
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
      providesTags: [CREATE_PROJECT_AMOUNT],
      keepUnusedDataFor: 0,
    }),
    acceptOrder: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/advertiser/accept`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [
        VIEWS_ADVERTISER,
        VIEWS_MANAGER,
        ADV_ORDERS,
        MANAGER_ORDERS,
      ],
    }),
    rejectOrder: build.mutation<
      { success: boolean },
      { order_id: string; comment: string; theme: string }
    >({
      query: (params) => ({
        url: `/order/advertiser/reject`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [
        VIEWS_ADVERTISER,
        VIEWS_MANAGER,
        ADV_ORDERS,
        MANAGER_ORDERS,
      ],
    }),
    orderReportInfo: build.mutation<IOrderReportInfo, { project_id: string }>({
      query: (params) => ({
        url: `/order/advertiser/report`,
        method: "GET",
        params: params,
      }),
    }),
    getAdvProjects: build.query<
      IAdvProjects,
      getProjectsCardReq & { __isWebsocket?: boolean }
    >({
      query: (BodyParams) => ({
        url: `/order/project/get/advertiser`,
        method: `POST`,
        body: BodyParams,
      }),
      transformResponse: (response: IAdvProjects, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
              response?.projects?.length +
                (response?.page - 1) * INTERSECTION_ELEMENTS.ADV_PROJECTS ||
            response?.projects?.length === 0,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { language, date_sort, status } = queryArgs;
        return `${endpointName}/${language}/${date_sort}/${status}`;
      },
      merge: (currentCache, newItems, arg) => {
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
      providesTags: [ADV_PROJECTS],
    }),
    getAdvSavedProjects: build.query<
      ISavedProjects,
      getSavedProjectsCardReq & { __isWebsocket?: boolean }
    >({
      query: (params) => ({
        url: `/order/projects/saved`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: ISavedProjects) => {
        return {
          ...response,
          isLast:
            response?.elements ===
              response?.projects?.length +
                (response?.page - 1) * INTERSECTION_ELEMENTS.ADV_PROJECTS ||
            response?.projects?.length === 0,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return `${endpointName}`;
      },
      merge: (currentCache, newItems, arg) => {
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
      providesTags: [ADV_PROJECTS],
    }),
    getAdvSubprojects: build.query<IAdvSubprojects, getProjectSubcardReq>({
      query: (BodyParams) => ({
        url: `/order/project/orders`,
        method: `POST`,
        body: BodyParams,
      }),
      providesTags: [ADV_ORDERS],
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
      providesTags: [ADV_TARIFF_ORDERS],
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
      invalidatesTags: [ADV_TARIFF_PROJECTS],
    }),

    saveAdvProject: build.mutation<
      { success: boolean },
      { project_id: string }
    >({
      query: (params) => ({
        url: `/order/project/save`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [ADV_PROJECTS],
    }),

    deleteSavedProject: build.mutation<
      { success: boolean },
      { project_id: string }
    >({
      query: (params) => ({
        url: `/order/project/saved/delete`,
        method: "DELETE",
        params: params,
      }),
      invalidatesTags: [ADV_PROJECTS],
      async onQueryStarted({ project_id }, { dispatch, queryFulfilled }) {
        // Оптимистично обновляем кеш - удаляем проект из всех кешированных запросов
        const patchResult = dispatch(
          advProjectsAPI.util.updateQueryData(
            "getAdvSavedProjects",
            { page: 1 } as getSavedProjectsCardReq,
            (draft) => {
              if (draft?.projects) {
                const originalLength = draft.projects.length;
                draft.projects = draft.projects.filter(
                  (p) => p.id !== project_id,
                );
                if (draft.projects.length < originalLength) {
                  draft.elements = Math.max(0, draft.elements - 1);
                }
              }
            },
          ),
        );

        try {
          await queryFulfilled;
          // Инвалидируем теги для обновления всех активных запросов
          dispatch(advProjectsAPI.util.invalidateTags([ADV_PROJECTS]));
        } catch {
          patchResult.undo();
        }
      },
    }),

    getAdvManagerProjects: build.query<
      IAdvManagerProjectsDev | IAdvProjects | any,
      getProjectsCardReq & { __isWebsocket?: boolean }
    >({
      query: ({ __isWebsocket, ...params }) => ({
        url: `/tariff/advertiser`,
        method: "GET",
        params: params,
      }),
      transformResponse: (
        response: IAdvManagerProjectsDev | IAdvProjects,
        meta,
        arg,
      ) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
              response?.projects?.length +
                (response?.page - 1) * INTERSECTION_ELEMENTS.ADV_PROJECTS ||
            response?.projects?.length === 0,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { language, date_sort, status } = queryArgs;
        return `${endpointName}/${language}/${date_sort}/${status}`;
      },
      merge: (
        currentCache: IAdvManagerProjectsDev | IAdvProjects,
        newItems: IAdvManagerProjectsDev | IAdvProjects,
        arg,
      ) => {
        const newProjectsMap = new Map(
          newItems?.projects?.map((p) => [p?.id, p]),
        );

        // Обновляем старые элементы, если есть новые с тем же id
        const updatedOldProjects =
          currentCache?.projects?.map((old) =>
            newProjectsMap?.has(old?.id) ? newProjectsMap?.get(old?.id)! : old,
          ) || [];

        // Убираем уже обновленные ID из новых, чтобы они не дублировались
        const newIds = new Set(updatedOldProjects?.map((p) => p.id));
        const onlyNewProjects = newItems?.projects?.filter(
          (p) => !newIds.has(p?.id),
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
      providesTags: [ADV_TARIFF_PROJECTS],
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
  useSaveAdvProjectMutation,
  useRejectOrderMutation,
  useGetAdvProjectsQuery,
  useGetAdvSavedProjectsQuery,
  useDeleteSavedProjectMutation,
  useGetAdvSubprojectsQuery,
  useGetAdvManagerProjectsQuery,
  useGetAdvManagerSubprojectsQuery,
  useOrderReportInfoMutation,
  useGetProjectNameQuery,
} = advProjectsAPI;
