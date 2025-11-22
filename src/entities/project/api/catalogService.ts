import { platformTypesNum } from "@entities/platform";
import { CATALOG, baseApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { sortingFilter } from "../config";
import {
  ICatalogCards,
  IRecommendCards,
  ITargetAudienceCard,
  IThreadData,
} from "../types";

export interface getCatalogReq {
  user_id?: string;
  guest_id?: string;
  project_id?: string;
  language: ENUM_LANGUAGES_NUM;
  page: number;
  elements_on_page?: number;
  filter: ICatalogFilter;
  sort: sortingFilter;
  search_string?: string | undefined;
}

export interface ICatalogFilter {
  platform?: platformTypesNum;
  business: number[];
  age: number[];
  male?: number;
  female?: number;
  language: number[];
  region: number[];
}

export interface getAIParametersReq {
  prompt: string;
  thread_id?: string;
}

export interface getTAParametersReq {
  category: number[];
  region: number[];
  language: number[];
}

export interface getRecommendChannels {
  language: ENUM_LANGUAGES_NUM;
  channels: string[];
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
          isLast:
            response?.elements ===
            response?.channels?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.CATALOG,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }
        if (
          currentCache.channels.length >=
          arg.arg.page * INTERSECTION_ELEMENTS.CATALOG
        ) {
          return currentCache;
        }
        return {
          ...newItems,
          channels: [...currentCache.channels, ...newItems.channels],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [CATALOG],
    }),
    getRecommedChannels: build.query<IRecommendCards, getRecommendChannels>({
      query: (BodyParams) => ({
        url: "/sample/recommended",
        method: "POST",
        body: BodyParams,
      }),
    }),
    getAIParameters: build.query<IThreadData, getAIParametersReq>({
      query: (params) => ({
        url: "/sample/ai/parameters",
        method: "GET",
        params: params,
      }),
    }),
    getTAParameters: build.query<ITargetAudienceCard[], getTAParametersReq>({
      query: (BodyParams) => ({
        url: "/sample/target-audience",
        method: "POST",
        body: BodyParams,
      }),
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
    }),
  }),
});

export const {
  useGetCatalogQuery,
  useGetAIParametersQuery,
  useGetTAParametersQuery,
  useGetRecommedChannelsQuery,
} = catalogAPI;
