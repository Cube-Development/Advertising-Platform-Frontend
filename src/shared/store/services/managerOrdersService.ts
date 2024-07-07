import { authApi } from "@shared/api";
import { MANAGER_PROJECTS } from "@shared/api/tags";
import { languagesNum } from "@shared/config/languages";
import { IAdvSubprojects } from "@shared/types/advProject";
import {
  IManagerNewProjects,
  IManagerProjects,
} from "@shared/types/managerProject";

export interface getProjectsCardReq {
  page: number;
  date_sort?: string;
  elements_on_page?: number;
  status: string;
  language?: number;
}

export interface getProjectSubcardReq {
  project_id: string;
  language: languagesNum;
  page: number;
  elements_on_page?: number;
}

export const managerProjectsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createProjectCart: build.mutation<
      { succsess: boolean },
      { project_id: string }
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
    }),

    getManagerSubprojects: build.query<IAdvSubprojects, getProjectSubcardReq>({
      query: (params) => ({
        url: `/tariff/order`,
        method: `GET`,
        params: params,
      }),
      // providesTags: [ADV_PROJECTS],
    }),

    getManagerProjects: build.query<
      IManagerProjects | IManagerNewProjects,
      getProjectsCardReq
    >({
      query: (params) => ({
        url: `/tariff/`,
        method: `GET`,
        params: params,
      }),
      providesTags: [MANAGER_PROJECTS],
    }),
  }),
});

export const {
  useGetManagerProjectsQuery,
  useApproveProjectMutation,
  useGetManagerSubprojectsQuery,
  useCreateProjectCartMutation,
} = managerProjectsAPI;
