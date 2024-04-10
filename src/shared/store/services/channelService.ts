import { authApi } from "@shared/api";
import { languagesNum } from "@shared/config/languages";
import {
  platformStatus,
  platformStatusFilter,
} from "@shared/config/platformFilter";
import { platformTypesNum } from "@shared/config/platformTypes";
import {
  IActiveChannelBlogger,
  IBlockedChannelBlogger,
  IInactiveChannelBlogger,
  IModerationChannelBlogger,
  IModerationRejectChannelBlogger,
} from "@shared/types/channelStatus";
import {
  IAddChannelData,
  IAddChannelIdentification,
} from "@shared/types/platform";

export interface getChannelsByStatusReq {
  platform: platformTypesNum;
  language: languagesNum;
  page: number;
  date_sort: string;
  elements_on_page?: number;
  status_type: platformStatus | string;
}

export const channelAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createCode: build.query<{ verification_code: number }, void>({
      query: () => ({
        url: `/channel/create/code`,
        method: `POST`,
      }),
    }),
    channelVerify: build.mutation<
      { insertion_code: string },
      IAddChannelIdentification
    >({
      query: (BodyParams) => ({
        url: `/channel/verify`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    createChannel: build.mutation<{ status: platformStatus }, IAddChannelData>({
      query: (BodyParams) => ({
        url: `/channel/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getChannelsByStatus: build.query<
      | IActiveChannelBlogger
      | IInactiveChannelBlogger
      | IModerationChannelBlogger
      | IModerationRejectChannelBlogger
      | IBlockedChannelBlogger,
      getChannelsByStatusReq
    >({
      query: (params) =>
        // `/channel/blogger?platform=${params.platform}&language=${params.language}&page=${params.page}&date_sort=${params.date_sort}&status_type=${params.status_type}`,
        ({
          url: "/channel/active",
          method: "GET",
          params: params,
        }),
    }),
  }),
});

export const {
  useCreateCodeQuery,
  useChannelVerifyMutation,
  useCreateChannelMutation,
  useGetChannelsByStatusQuery,
} = channelAPI;
