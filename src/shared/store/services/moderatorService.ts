import { authApi } from "@shared/api";

export const moderatorAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    // orders
    orderAccept: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/moderation/accept`,
        method: "PUT",
        params: params,
      }),
    }),
    orderReject: build.mutation<{ success: boolean }, { order_id: string }>({
      query: (params) => ({
        url: `/order/moderation/reject`,
        method: "PUT",
        params: params,
      }),
    }),

    // channels
    channelAccept: build.mutation<{ success: boolean }, { channel_id: string }>(
      {
        query: (params) => ({
          url: `/channel/moderation/accept/${params.channel_id}`,
          method: "POST",
        }),
      },
    ),
    channelReject: build.mutation<
      { success: boolean },
      { channel_id: string; reason: string }
    >({
      query: (body) => ({
        url: `/channel/moderation/reject`,
        method: "POST",
        body: body,
      }),
    }),
    channelBan: build.mutation<
      { success: boolean },
      { channel_id: string; reason: string }
    >({
      query: (body) => ({
        url: `/channel/moderation/ban`,
        method: "POST",
        body: body,
      }),
    }),
    channelUnban: build.mutation<{ success: boolean }, { channel_id: string }>({
      query: (params) => ({
        url: `/channel/moderation/unban/${params.channel_id}`,
        method: "POST",
      }),
    }),

    // legals
  }),
});

export const {
  useOrderAcceptMutation,
  useOrderRejectMutation,
  useChannelAcceptMutation,
  useChannelBanMutation,
  useChannelRejectMutation,
  useChannelUnbanMutation,
} = moderatorAPI;
