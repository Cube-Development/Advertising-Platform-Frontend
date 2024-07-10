import { IManagerNewProjects, IManagerProjects } from "@entities/project";
import { MANAGER_PROJECTS, authApi } from "@shared/api";

// export interface ICreatePostReq {
//   project_id: string;
//   platform?: number;
//   comment?: string;
//   files?: IFile[];
// }

export interface getManagerProjectsCardReq {
  page: number;
  date_sort?: string;
  elements_on_page?: number;
  status: string;
  language?: number;
}

// export interface getProjectSubcardReq {
//   project_id: string;
//   language: languagesNum;
//   page: number;
//   elements_on_page?: number;
// }

// export interface getProjectOrdersRes {
//   page: number;
//   elements: number;
//   orders: IPostChannel[];
// }

export const managerProjectsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    // createCart: build.mutation<{ project_id: string }, void>({
    //   query: () => ({
    //     url: `/order/`,
    //     method: "POST",
    //   }),
    // }),
    // getUploadLink: build.mutation<
    //   { file_name: string; url: string },
    //   { extension: string; content_type: number }
    // >({
    //   query: (params) => ({
    //     url: `/file/upload_link`,
    //     method: "GET",
    //     params: params,
    //   }),
    // }),
    // createPost: build.mutation<{ success: boolean }, ICreatePostReq>({
    //   query: (body) => ({
    //     url: `/order/post`,
    //     method: "POST",
    //     body: body,
    //   }),
    // }),
    // projectOrders: build.query<getProjectOrdersRes, getProjectSubcardReq>({
    //   query: (params) => ({
    //     url: `/order/datetime-setup`,
    //     method: "GET",
    //     params: params,
    //   }),
    // }),
    // createOrderDates: build.mutation<{ success: boolean }, ICreateDate>({
    //   query: (body) => ({
    //     url: `/order/dates`,
    //     method: "POST",
    //     body: body,
    //   }),
    // }),
    // acceptOrder: build.mutation<{ success: boolean }, { order_id: string }>({
    //   query: (params) => ({
    //     url: `/order/advertiser/accept`,
    //     method: "PUT",
    //     params: params,
    //   }),
    //   invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    // }),
    // rejectOrder: build.mutation<
    //   { success: boolean },
    //   { order_id: string; comment: string }
    // >({
    //   query: (params) => ({
    //     url: `/order/advertiser/reject`,
    //     method: "PUT",
    //     params: params,
    //   }),
    //   invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    // }),
    // addReview: build.mutation<
    //   { success: boolean },
    //   { order_id: string; review: string; grade: number }
    // >({
    //   query: (params) => ({
    //     url: `/order/advertiser/add_review`,
    //     method: "PUT",
    //     params: params,
    //   }),
    //   invalidatesTags: [BLOGGER_OFFERS, ADV_PROJECTS],
    // }),
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
    // getAdvSubprojects: build.query<IAdvSubprojects, getProjectSubcardReq>({
    //   query: (BodyParams) => ({
    //     url: `/order/project/orders`,
    //     method: `POST`,
    //     body: BodyParams,
    //   }),
    //   providesTags: [ADV_PROJECTS],
    // }),
  }),
});

export const { useGetManagerProjectsQuery } = managerProjectsAPI;
