import { authApi, VIEWS_ADVERTISER } from "@shared/api";
import { IViewAdvertiserProject } from "../types";

export const viewAdvertiserAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewAdvertiserProject: build.query<IViewAdvertiserProject, void>({
      query: () => ({
        url: "/view/advertiser/project",
        method: "GET",
      }),
      providesTags: [VIEWS_ADVERTISER],
    }),
  }),
});

export const { useGetViewAdvertiserProjectQuery } = viewAdvertiserAPI;
