import { authApi, VIEWS_BLOGGER_CHANNELS, VIEWS_BLOGGER_OFFERS } from "@shared/api";
import { IViewBloggerChannel, IViewBloggerOrder } from "../types";

export const viewBloggerAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewBloggerOrder: build.query<IViewBloggerOrder, void>({
      query: () => ({
        url: "/view/blogger/order",
        method: "GET",
      }),
      providesTags: [VIEWS_BLOGGER_CHANNELS],
    }),
    getViewBloggerChannel: build.query<IViewBloggerChannel, void>({
      query: () => ({
        url: "/view/blogger/channel",
        method: "GET",
      }),
      providesTags: [VIEWS_BLOGGER_OFFERS],
    }),
  }),
});

export const { useGetViewBloggerOrderQuery, useGetViewBloggerChannelQuery } =
  viewBloggerAPI;
