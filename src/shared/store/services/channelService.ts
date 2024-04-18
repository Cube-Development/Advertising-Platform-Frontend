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
  status: platformStatusFilter | string;
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
      query: (params) => ({
        url: "/channel/blogger",
        method: "GET",
        params: params,
      }),
    }),
    activateChannel: build.mutation<void, string>({
      query: (channel_id) => ({
        url: `/channel/activate/${channel_id}`,
        method: `PUT`,
      }),
    }),
    deactivateChannel: build.mutation<void, string>({
      query: (channel_id) => ({
        url: `/channel/deactivate/${channel_id}`,
        method: `PUT`,
      }),
    }),
  }),
});

export const {
  useCreateCodeQuery,
  useChannelVerifyMutation,
  useCreateChannelMutation,
  useGetChannelsByStatusQuery,
  useActivateChannelMutation,
  useDeactivateChannelMutation,
} = channelAPI;
