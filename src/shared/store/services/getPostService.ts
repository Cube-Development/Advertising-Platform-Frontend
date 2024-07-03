import { authApi } from "@shared/api";
import { PostTypesNum, platformTypesNum } from "@shared/config/platformTypes";

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

export const getPostAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getPost: build.query<GetPostRes, { order_id: string }>({
      query: (params) => ({
        url: "/order/post",
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetPostQuery } = getPostAPI;
