import { PostTypesNum, platformTypesNum } from "@entities/platform";
import { authApi } from "@shared/api";
import { IFile } from "../types";

export interface IFileRes {
  id: string;
  content: string;
  url: string;
}

export interface GetPostRes {
  id: string;
  platform: platformTypesNum;
  comment?: string;
  // photo: string[];
  // video: string[];
  // files: string[];
  // buttons: IFileRes[];
  // text: string[];
  files: IFile[];
  post_type: PostTypesNum;
}

export const getPostAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query<GetPostRes, { order_id: string }>({
      query: (params) => ({
        url: "/post/order",
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetPostQuery } = getPostAPI;
