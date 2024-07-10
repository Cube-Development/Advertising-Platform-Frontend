import { IChannelFormat } from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import { baseApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";

type GetContentReq = {
  language: languagesNum;
  page: number;
  elements_on_page?: number;
  platform?: platformTypesNum;
};

type GetContentRes = {
  page: number;
  elements: number;
  contents: Content[];
};

type GetformatRes = {
  page: number;
  elements: number;
  contents: IChannelFormat[];
};

type Content = {
  id: number;
  name: string;
};

export const contentAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getChannelCategories: build.query<GetContentRes, GetContentReq>({
      query: (params) =>
        `/content/channel/categories?language=${params.language}&page=${params.page}`,
    }),
    getCompanyCategories: build.query<GetContentRes, GetContentReq>({
      query: (params) =>
        `/content/company/categories?language=${params.language}&page=${params.page}`,
    }),
    getPlatformTypes: build.query<GetContentRes, GetContentReq>({
      query: (params) =>
        `/content/platform/types?language=${params.language}&page=${params.page}`,
    }),
    getChannelRegions: build.query<GetContentRes, GetContentReq>({
      query: (params) =>
        `/content/channel/regions?language=${params.language}&page=${params.page}`,
    }),
    getChannelLanguages: build.query<GetContentRes, GetContentReq>({
      query: (params) =>
        `/content/channel/languages?language=${params.language}&page=${params.page}`,
    }),
    getChannelAges: build.query<GetContentRes, GetContentReq>({
      query: (params) =>
        `/content/channel/ages?language=${params.language}&page=${params.page}`,
    }),
    getChannelFormats: build.query<GetformatRes, GetContentReq>({
      query: (params) =>
        `/content/channel/formats?language=${params.language}&page=${params.page}&platform=${params.platform}`,
    }),
  }),
});

export const {
  useGetChannelAgesQuery,
  useGetChannelCategoriesQuery,
  useGetChannelFormatsQuery,
  useGetChannelLanguagesQuery,
  useGetChannelRegionsQuery,
  useGetCompanyCategoriesQuery,
  useGetPlatformTypesQuery,
} = contentAPI;
