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
  IEditChannelData,
  IReadChannelData,
} from "@shared/types/platform";
import { BLOGGER_CHANNELS } from "../../api/tags";

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
    createCode: build.query<{ verification_code: number }, string>({
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
      providesTags: [BLOGGER_CHANNELS],
    }),
    getChannelById: build.query<
      IReadChannelData,
      { channel_id: string; language: languagesNum }
    >({
      query: (params) => ({
        url: "/channel/",
        method: "GET",
        params: params,
      }),
    }),
    activateChannel: build.mutation<void, string>({
      query: (channel_id) => ({
        url: `/channel/activate/${channel_id}`,
        method: `PUT`,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
    }),
    deactivateChannel: build.mutation<void, string>({
      query: (channel_id) => ({
        url: `/channel/deactivate/${channel_id}`,
        method: `PUT`,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
    }),
    editChannel: build.mutation<{ status: platformStatus }, IEditChannelData>({
      query: (body) => ({
        url: "/channel/edit",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
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
  useEditChannelMutation,
  useGetChannelByIdQuery,
} = channelAPI;
