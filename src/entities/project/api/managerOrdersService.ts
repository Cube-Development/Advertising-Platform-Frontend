import { PostTypesNum, platformTypesNum } from "@entities/platform";
import {
  IManagerNewProjects,
  IManagerProjects,
  IManagerSubprojects,
  IPostChannel,
  ITgButtonRes,
} from "@entities/project";
import { MANAGER_PROJECTS, authApi } from "@shared/api";
import { languagesNum } from "@shared/config";

export interface getManagerProjectsCardReq {
  page: number;
  date_sort?: string;
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
  post_upload_type: number;
  page: number;
  elements_on_page?: number;
}

export interface getManagerPostsRes {
  page: number;
  elements: number;
  posts: GetManagerPostRes[];
}

export interface GetManagerPostRes {
  id: string;
  platform: platformTypesNum;
  comment?: string;
  photo: string[];
  video: string[];
  files: string[];
  buttons: ITgButtonRes[];
  text: string[];
  post_type: PostTypesNum;
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
      IManagerProjects | IManagerNewProjects,
      getManagerProjectsCardReq
    >({
      query: (params) => ({
        url: `/tariff/`,
        method: `GET`,
        params: params,
      }),
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

    getPostsRereview: build.query<getManagerPostsRes, getPostsReq>({
      query: (params) => ({
        url: `/order/posts`,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const {
  useGetManagerProjectsQuery,
  useApproveProjectMutation,
  useGetManagerSubprojectsQuery,
  useCreateProjectCartMutation,
  useGetManagerProjectOrdersQuery,
  useGetManagerProjectOrdersRereviewQuery,
  useGetPostsRereviewQuery,
} = managerProjectsAPI;
