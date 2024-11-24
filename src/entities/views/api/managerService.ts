import { authApi } from "@shared/api";
import { IViewManagerProject } from "../types";

export const viewManagerAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewManagerProject: build.query<IViewManagerProject, void>({
      query: () => ({
        url: "/view/manager/project",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetViewManagerProjectQuery } = viewManagerAPI;
