import { authApi } from "@shared/api";
import { IViewBloggerChannel, IViewBloggerOrder } from "../types";

export const viewBloggerAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewBloggerOrder: build.query<IViewBloggerOrder, void>({
      query: () => ({
        url: "/view/blogger/order",
        method: "GET",
      }),
    }),
    getViewBloggerChannel: build.query<IViewBloggerChannel, void>({
      query: () => ({
        url: "/view/blogger/channel",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetViewBloggerOrderQuery, useGetViewBloggerChannelQuery } =
  viewBloggerAPI;
