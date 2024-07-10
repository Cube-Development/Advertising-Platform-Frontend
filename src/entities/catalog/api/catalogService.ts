import { ICatalogCards, sortingFilter } from "@entities/catalog";
import { platformTypesNum } from "@entities/platform";
import { baseApi } from "@shared/api";
import { CATALOG } from "@shared/api/tags";
import { languagesNum } from "@shared/config/languages";

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
