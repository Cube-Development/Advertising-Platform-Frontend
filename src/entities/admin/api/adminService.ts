import { ADMIN_REVIEWS, authApi } from "@shared/api";
import { adminComplaintTypesFilter, adminReviewTypesFilter } from "../config";
import {
  IAdminChannelInfo,
  IAdminChannels,
  IAdminComplaintInfoData,
  IAdminComplaints,
  IAdminReviews,
  IAdminTransactionInfo,
  IAdminTransactions,
  IAdminUsers,
} from "../types";
import { INTERSECTION_ELEMENTS } from "@shared/config";

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
        return {
          ...newItems,
          isLast: newUsers.length === newItems.elements,
          users: newUsers,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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

        const newChannels = [...currentCache?.channels, ...newItems?.channels];
        return {
          ...newItems,
          isLast: newChannels.length === newItems.elements,
          channels: newChannels,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getAdminChannelInfo: build.query<IAdminChannelInfo, { id: string }>({
      query: (params) => ({
        url: `/adv-admin/channels/${params.id}`,
        method: `GET`,
      }),
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
        const { status } = queryArgs
        return `${endpointName}/${status}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [ADMIN_REVIEWS]
    }),
    adminAcceptReview: build.mutation<{ success: boolean }, {id:string}>({
      query: (body) => ({
        url: `/adv-admin/accept/order-review`,
        method: "POST",
        params: body,
      }),
      invalidatesTags: [ADMIN_REVIEWS],
    }),
    adminRejectReview: build.mutation<{ success: boolean }, {id:string}>({
      query: (body) => ({
        url: `/adv-admin/reject/order-review`,
        method: "POST",
        params: body,
      }),
      invalidatesTags: [ADMIN_REVIEWS],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetAdminOrderComplaintsQuery,
  useGetAdminOrderComplaintInfoQuery,
  useGetAdminTransactionsQuery,
  useGetAdminTransactionInfoQuery,
  useGetAdminChannelsQuery,
  useGetAdminChannelInfoQuery,
  useGetAdminReviewsQuery,
  useAdminAcceptReviewMutation,
  useAdminRejectReviewMutation
} = adminAPI;
