import { baseApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";
import { sortingFilter } from "@shared/config/platformData";
import { platformTypesNum } from "@shared/config/platformTypes";
import { ICatalogCards } from "@shared/types/platform";

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
    }),
  }),
});

export const { useGetCatalogQuery } = catalogAPI;
