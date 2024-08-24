import { platformTypesNum } from "@entities/platform";
import { CATALOG, baseApi } from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";
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
      transformResponse: (response: ICatalogCards) => {
        return {
          ...response,
          isLast: response.channels.length !== INTERSECTION_ELEMENTS.catalog,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        return {
          ...newItems,
          channels: [...currentCache.channels, ...newItems.channels],
          isLast: newItems.channels.length !== INTERSECTION_ELEMENTS.catalog,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [CATALOG],
    }),
  }),
});

export const { useGetCatalogQuery } = catalogAPI;
