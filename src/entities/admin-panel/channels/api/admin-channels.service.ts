import { ADMIN_CHANNELS, authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";

import {
  IAdminBanChannelReq,
  IAdminRejectChannelReq,
  IGetAdminChannelsReq,
  IAdminChannelInfo,
  IAdminChannels,
  IAdminEditChannelData,
} from "../types";

export const adminChannelsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminChannels: build.query<IAdminChannels, IGetAdminChannelsReq>({
      query: (params) => ({
        url: `/adv-admin/channels`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IAdminChannels, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.channels?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.ADMIN_CHANNELS,
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) return newItems;

        const map = new Map(
          currentCache?.channels.map((c) => [c.channel.id, c]),
        );

        newItems.channels.forEach((c) => map.set(c.channel.id, c));

        return {
          ...newItems,
          channels: Array.from(map.values()),
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [ADMIN_CHANNELS],
    }),
    getAdminChannelInfo: build.query<IAdminChannelInfo, { id: string }>({
      query: (params) => ({
        url: `/adv-admin/channels/${params.id}`,
        method: `GET`,
      }),
    }),
    adminChannelEdit: build.mutation<
      { success: boolean },
      IAdminEditChannelData
    >({
      query: (body) => ({
        url: "/adv-admin/channel",
        method: "PUT",
        body: body,
      }),
    }),
    adminChannelAccept: build.mutation<
      { success: boolean },
      { channel_id: string }
    >({
      query: (params) => ({
        url: `/channel/moderation/accept/${params.channel_id}`,
        method: `POST`,
      }),
    }),
    adminChannelReject: build.mutation<
      { success: boolean },
      IAdminRejectChannelReq
    >({
      query: (body) => ({
        url: `/channel/moderation/reject`,
        method: `POST`,
        body: body,
      }),
      invalidatesTags: [ADMIN_CHANNELS],
    }),
    adminChannelAcceptRemoderation: build.mutation<
      { success: boolean },
      { channel_id: string }
    >({
      query: (params) => ({
        url: `/adv-admin/channel/${params.channel_id}/edit/accept`,
        method: `PUT`,
      }),
      invalidatesTags: [ADMIN_CHANNELS],
    }),
    adminChannelUnban: build.mutation<
      { success: boolean },
      { channel_id: string }
    >({
      query: (params) => ({
        url: `/channel/moderation/unban/${params.channel_id}`,
        method: `POST`,
      }),
    }),
    adminChannelBan: build.mutation<{ success: boolean }, IAdminBanChannelReq>({
      query: (params) => ({
        url: `/channel/moderation/ban`,
        method: `POST`,
        body: params,
      }),
      invalidatesTags: [ADMIN_CHANNELS],
    }),
  }),
});

export const {
  useGetAdminChannelsQuery,
  useGetAdminChannelInfoQuery,
  useAdminChannelAcceptMutation,
  useAdminChannelRejectMutation,
  useAdminChannelAcceptRemoderationMutation,
  useAdminChannelBanMutation,
  useAdminChannelUnbanMutation,
  useAdminChannelEditMutation,
} = adminChannelsAPI;
