import { authApi, POST_TEMPLATES } from "@shared/api";
import { IPostData } from "../types";
import { IPostTemplate } from "../types";

interface IGetTemplatesListReq {
  page: number;
  elements_on_page?: number;
}
interface IGetTemplatesListRes {
  page: number;
  elements: number;
  posts: IPostTemplate[];
}

interface IAddTemplateReq {
  name: string;
  files: IPostData[];
}
interface IAddTemplateRes {
  success: boolean;
}

interface IDeleteTemplateReq {
  id: string;
}
interface IDeleteTemplateRes {
  success: boolean;
}

export const postTemplateAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getTemplatesList: build.query<IGetTemplatesListRes, IGetTemplatesListReq>({
      query: (params) => ({
        url: `/post/templates`,
        method: "GET",
        params: params,
      }),
      providesTags: [POST_TEMPLATES],
    }),
    addTemplate: build.mutation<IAddTemplateRes, IAddTemplateReq>({
        query: (body) => ({
          url: `/post/template`,
          method: "POST",
          body: body,
      }),
      invalidatesTags: [POST_TEMPLATES],
    }),
    deleteTemplate: build.mutation<IDeleteTemplateRes, IDeleteTemplateReq>({
        query: (params) => ({
          url: `/post/template`,
          method: "DELETE",
          params: params,
      }),
      invalidatesTags: [POST_TEMPLATES],
    }),
  }),
});

export const { useGetTemplatesListQuery, useAddTemplateMutation, useDeleteTemplateMutation } =
  postTemplateAPI;
