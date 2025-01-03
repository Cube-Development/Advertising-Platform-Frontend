import { authApi, VIEWS_MANAGER } from "@shared/api";
import { IViewManagerProject } from "../types";

export const viewManagerAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getViewManagerProject: build.query<IViewManagerProject, void>({
      query: () => ({
        url: "/view/manager/project",
        method: "GET",
      }),
      providesTags: [VIEWS_MANAGER],
    }),
  }),
});

export const { useGetViewManagerProjectQuery } = viewManagerAPI;
