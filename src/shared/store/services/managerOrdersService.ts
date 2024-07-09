import { authApi } from "@shared/api";
import { MANAGER_PROJECTS } from "@shared/api/tags";
import { languagesNum } from "@shared/config/languages";
import { PostTypesNum, platformTypesNum } from "@shared/config/platformTypes";
import { IAdvSubprojects } from "@shared/types/advProject";
import { IPostChannel } from "@shared/types/createPost";
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

export interface getProjectOrdersReq {
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

export interface getPostsReq {
  project_id: string;
  post_upload_type: number;
  page: number;
  elements_on_page?: number;
}

export interface getPostsRes {
  page: number;
  elements: number;
  posts: GetPostRes[];
}

export interface ITgButtonRes {
  id: string;
  content: string;
  url: string;
}

export interface GetPostRes {
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

    getManagerSubprojects: build.query<IAdvSubprojects, getProjectOrdersReq>({
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

    getManagerProjectOrders: build.query<
      getProjectOrdersRes,
      getProjectOrdersReq
    >({
      query: (params) => ({
        url: `/order/datetime-setup`,
        method: "GET",
        params: params,
      }),
    }),

    getManagerProjectOrdersRereview: build.query<
      getProjectOrdersRes,
      getProjectOrdersReq
    >({
      query: (params) => ({
        url: `/order/datetime`,
        method: "GET",
        params: params,
      }),
    }),

    getPostsRereview: build.query<getPostsRes, getPostsReq>({
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
