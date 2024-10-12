import { platformTypesNum } from "@entities/platform";
import { CATALOG, baseApi } from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";
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
  search_string?: string | null;
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
  language: languagesNum;
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
          isLast: response.channels.length !== INTERSECTION_ELEMENTS.catalog,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: newItems.channels.length !== INTERSECTION_ELEMENTS.catalog,
          };
        }
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
    }),
  }),
});

export const {
  useGetCatalogQuery,
  useGetAIParametersQuery,
  useGetTAParametersQuery,
  useGetRecommedChannelsQuery,
} = catalogAPI;
