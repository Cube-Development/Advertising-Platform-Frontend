import {
  ADMIN_CHANNELS,
  ADMIN_COMPLAINTS,
  ADMIN_REVIEWS,
  authApi,
} from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { adminComplaintTypesFilter, adminReviewTypesFilter } from "../config";
import {
  IAdminChannelInfo,
  IAdminChannels,
  IAdminComplaintInfoData,
  IAdminComplaints,
  IAdminEditChannelData,
  IAdminReviews,
  IAdminTransactionInfo,
  IAdminTransactions,
  IAdminUserInfo,
  IAdminUsers,
} from "../types";

export interface getAdminUsersReq {
  elements_on_page: number;
  last?: string;
}

export interface getAdminOrderComplaintsReq {
  page: number;
  order_complaint_status: adminComplaintTypesFilter;
  elements_on_page: number;
}

export interface getAdminTransactionsReq {
  page: number;
  elements_on_page: number;
}

export interface getAdminChannelsReq {
  page: number;
  elements_on_page: number;
}

export interface getAdminReviewsReq {
  page: number;
  status: adminReviewTypesFilter;
  elements_on_page: number;
}

export interface adminRejectChannelReq {
  channel_id: string;
  reason: string;
  finish_date: string;
}

export interface adminBanChannelReq {
  channel_id: string;
  reason: string;
  finish_date: string;
}

export interface adminAcceptComplaintReq {
  order_id: string;
  reason: string;
}

export interface adminRejectComplaintReq {
  order_id: string;
  reason: string;
}

export const adminAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminUsers: build.query<IAdminUsers, getAdminUsersReq>({
      query: (params) => ({
        url: `/adv-admin/users`,
        method: `GET`,
        params: params,
      }),
      merge: (currentCache, newItems) => {
        const newUsers = [...currentCache?.users, ...newItems?.users];
        const uniqueUsers = Array.from(
          new Map(newUsers.map((user) => [user?.user_id, user])).values(),
        );
        return {
          ...newItems,
          isLast: uniqueUsers.length === newItems.elements,
          users: uniqueUsers,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getAdminUserInfo: build.query<IAdminUserInfo, { id: string }>({
      query: (params) => ({
        url: `/adv-admin/user/${params.id}`,
        method: `GET`,
      }),
    }),
    getAdminOrderComplaints: build.query<
      IAdminComplaints,
      getAdminOrderComplaintsReq
    >({
      query: (params) => ({
        url: `/adv-admin/order-complaints`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IAdminComplaints, meta, arg) => {
        return {
          ...response,
          order_complaint_status: arg?.order_complaint_status,
          isLast:
            response?.elements ===
            response?.complaints?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.adminComplaints,
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: newItems?.complaints.length === newItems?.elements,
          };
        }

        const newComplaints = [
          ...currentCache?.complaints,
          ...newItems?.complaints,
        ];
        return {
          ...newItems,
          isLast: newComplaints.length === newItems.elements,
          complaints: newComplaints,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { order_complaint_status } = queryArgs;
        return `${endpointName}/${order_complaint_status}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [ADMIN_COMPLAINTS],
    }),
    getAdminOrderComplaintInfo: build.query<
      IAdminComplaintInfoData,
      { id: string }
    >({
      query: (params) => ({
        url: `/adv-admin/order-complaint`,
        method: `GET`,
        params: params,
      }),
    }),
    getAdminTransactions: build.query<
      IAdminTransactions,
      getAdminTransactionsReq
    >({
      query: (params) => ({
        url: `/adv-admin/transactions`,
        method: `GET`,
        params: params,
      }),
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: newItems?.transactions.length === newItems?.elements,
          };
        }

        const newTransactions = [
          ...currentCache?.transactions,
          ...newItems?.transactions,
        ];
        return {
          ...newItems,
          isLast: newTransactions.length === newItems.elements,
          transactions: newTransactions,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getAdminTransactionInfo: build.query<IAdminTransactionInfo, { id: string }>(
      {
        query: (params) => ({
          url: `/adv-admin/transactions/${params.id}`,
          method: `GET`,
        }),
      },
    ),
    getAdminChannels: build.query<IAdminChannels, getAdminChannelsReq>({
      query: (params) => ({
        url: `/adv-admin/channels`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IAdminChannels) => {
        return {
          ...response,
          isLast:
            response?.elements ===
            response?.channels?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.adminChannels,
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: newItems?.channels.length === newItems?.elements,
          };
        }

        const updatedChannelsMap = new Map(
          currentCache?.channels.map((channel) => [
            channel.channel.id,
            channel,
          ]),
        );

        // Обновляем данные каналов, если их ID уже есть в кеше
        newItems.channels.forEach((channel) => {
          updatedChannelsMap.set(channel.channel.id, channel);
        });

        return {
          ...newItems,
          isLast: updatedChannelsMap.size === newItems.elements,
          channels: Array.from(updatedChannelsMap.values()),
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
      invalidatesTags: [ADMIN_CHANNELS],
    }),
    adminChannelAccept: build.mutation<
      { success: boolean },
      { channel_id: string }
    >({
      query: (params) => ({
        url: `/channel/moderation/accept/${params.channel_id}`,
        method: `POST`,
      }),
      invalidatesTags: [ADMIN_CHANNELS],
    }),
    adminChannelReject: build.mutation<
      { success: boolean },
      adminRejectChannelReq
    >({
      query: (params) => ({
        url: `/channel/moderation/accept/${params.channel_id}`,
        method: `POST`,
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
      invalidatesTags: [ADMIN_CHANNELS],
    }),
    adminChannelBan: build.mutation<{ success: boolean }, adminBanChannelReq>({
      query: (params) => ({
        url: `/channel/moderation/ban`,
        method: `POST`,
        body: params,
      }),
      invalidatesTags: [ADMIN_CHANNELS],
    }),
    getAdminReviews: build.query<IAdminReviews, getAdminReviewsReq>({
      query: (params) => ({
        url: `/adv-admin/channel/prepared-reviews`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IAdminReviews, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.reviews?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.adminReviews,
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: newItems?.reviews.length === newItems?.elements,
          };
        }

        const newReviews = [...currentCache?.reviews, ...newItems?.reviews];
        return {
          ...newItems,
          isLast: newReviews.length === newItems.elements,
          reviews: newReviews,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status } = queryArgs;
        return `${endpointName}/${status}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [ADMIN_REVIEWS],
    }),
    adminAcceptReview: build.mutation<{ success: boolean }, { id: string }>({
      query: (body) => ({
        url: `/adv-admin/accept/order-review`,
        method: "POST",
        params: body,
      }),
      invalidatesTags: [ADMIN_REVIEWS],
    }),
    adminRejectReview: build.mutation<{ success: boolean }, { id: string }>({
      query: (body) => ({
        url: `/adv-admin/reject/order-review`,
        method: "DELETE",
        params: body,
      }),
      invalidatesTags: [ADMIN_REVIEWS],
    }),
    adminChooseComplaint: build.mutation<
      { success: boolean },
      { complaint_id: string }
    >({
      query: (body) => ({
        url: `/adv-admin/accept/order-complaint`,
        method: "POST",
        params: body,
      }),
      invalidatesTags: [ADMIN_COMPLAINTS],
    }),
    adminAcceptComplaint: build.mutation<
      { success: boolean },
      adminAcceptComplaintReq
    >({
      query: (body) => ({
        url: `/order/moderation/accept`,
        method: "PUT",
        params: body,
      }),
      invalidatesTags: [ADMIN_COMPLAINTS],
    }),
    adminRejectComplaint: build.mutation<
      { success: boolean },
      adminRejectComplaintReq
    >({
      query: (body) => ({
        url: `/order/moderation/reject`,
        method: "PUT",
        params: body,
      }),
      invalidatesTags: [ADMIN_COMPLAINTS],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetAdminUserInfoQuery,
  useGetAdminOrderComplaintsQuery,
  useGetAdminOrderComplaintInfoQuery,
  useGetAdminTransactionsQuery,
  useGetAdminTransactionInfoQuery,
  useGetAdminChannelsQuery,
  useGetAdminChannelInfoQuery,
  useAdminChannelAcceptMutation,
  useAdminChannelRejectMutation,
  useAdminChannelAcceptRemoderationMutation,
  useAdminChannelBanMutation,
  useAdminChannelUnbanMutation,
  useAdminChannelEditMutation,
  useGetAdminReviewsQuery,
  useAdminAcceptReviewMutation,
  useAdminRejectReviewMutation,
  useAdminChooseComplaintMutation,
  useAdminAcceptComplaintMutation,
  useAdminRejectComplaintMutation,
} = adminAPI;
