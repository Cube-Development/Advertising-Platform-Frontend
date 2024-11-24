import { authApi } from "@shared/api";
import { IViewAdvertiserProject } from "../types";

export const viewAdvertiserAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewAdvertiserProject: build.query<IViewAdvertiserProject, void>({
      query: () => ({
        url: "/view/advertiser/project",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetViewAdvertiserProjectQuery } = viewAdvertiserAPI;
