import { platformTypesNum } from "@entities/platform";
import { CATALOG, baseApi } from "@shared/api";
import { languagesNum } from "@shared/config";
import { sortingFilter } from "../config";
import { ICatalogCards } from "../types";

export interface getCatalogReq {
  user_id?: string;
  guest_id?: string;
  language: languagesNum;
  page: number;
  elements_on_page?: number;
  filter: {
    platform: platformTypesNum;
    business: number[];
    age: number[];
    male?: number;
    female?: number;
    language: number[];
    region: number[];
  };
  sort: sortingFilter;
}

export const catalogAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCatalog: build.query<ICatalogCards, getCatalogReq>({
      query: (BodyParams) => ({
        url: "/sample/",
        method: "POST",
        body: BodyParams,
      }),
      providesTags: [CATALOG],
    }),
  }),
});

export const { useGetCatalogQuery } = catalogAPI;
