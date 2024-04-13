import { authApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";
import { IAdvProjects, IAdvSubprojects } from "@shared/types/advProject";

export interface getProjectsCardReq {
  page: number;
  date_sort: string;
  elements_on_page?: number;
  status: string;
}

export interface getProjectSubcardReq {
  project_id: string;
  language: languagesNum;
  page: number;
  elements_on_page?: number;
}

export const advProjectsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAdvProjects: build.query<IAdvProjects, getProjectsCardReq>({
      query: (BodyParams) => ({
        url: `/order/project/get/advertiser`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getAdvSubprojects: build.mutation<IAdvSubprojects, getProjectSubcardReq>({
      query: (BodyParams) => ({
        url: `/order/project/orders`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});

export const { useGetAdvProjectsQuery, useGetAdvSubprojectsMutation } =
  advProjectsAPI;
