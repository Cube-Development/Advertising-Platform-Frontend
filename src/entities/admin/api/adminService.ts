import { dateSortingTypes } from "@entities/platform";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import {
  ADMIN_ACCOUNTING,
  ADMIN_COMPLAINTS,
  ADMIN_REVIEWS,
  authApi,
} from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import {
  ADMIN_ACCOUNTING_TYPE,
  ADMIN_COMPLAINT_STATUS,
  ADMIN_REVIEW_STATUS,
  ADMIN_TRANSACTION_STATUS,
} from "../config";
import {
  IAdminAccounting,
  IAdminAccountingDepositAccept,
  IAdminComplaintInfoData,
  IAdminComplaints,
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
  order_complaint_status: ADMIN_COMPLAINT_STATUS;
  elements_on_page: number;
}

export interface getAdminTransactionsReq {
  page: number;
  status: ADMIN_TRANSACTION_STATUS;
  elements_on_page: number;
}
export interface getAdminAccountingReq {
  page: number;
  from_: string;
  elements_on_page: number;
  type: ADMIN_ACCOUNTING_TYPE;
  wallet: ENUM_WALLETS_TYPE;
  status: number;
  date_sort: dateSortingTypes;
}

export interface getAdminReviewsReq {
  page: number;
  status: ADMIN_REVIEW_STATUS;
  elements_on_page: number;
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
              (response?.page - 1) * INTERSECTION_ELEMENTS.ADMIN_COMPLAINTS,
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
      transformResponse: (response: IAdminTransactions, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.transactions?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.ADMIN_TRANSACTIONS,
        };
      },
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
    getAdminAccounting: build.query<IAdminAccounting, getAdminAccountingReq>({
      query: (body) => ({
        url: `/adv-admin/accountant/transactions`,
        method: `POST`,
        body: body,
      }),
      transformResponse: (response: IAdminAccounting, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          wallet: arg?.wallet,
          type: arg?.type,
          date_sort: arg?.date_sort,
          isLast:
            response?.items?.length < INTERSECTION_ELEMENTS.ADMIN_ACCOUNTING,
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast:
              newItems?.items?.length < INTERSECTION_ELEMENTS.ADMIN_ACCOUNTING,
          };
        }

        const newTransactions = [...currentCache?.items, ...newItems?.items];
        return {
          ...newItems,
          isLast:
            newItems?.items?.length < INTERSECTION_ELEMENTS.ADMIN_ACCOUNTING,
          items: newTransactions,
        };
      },
      serializeQueryArgs: ({
        endpointName,
        queryArgs: { status, wallet, type, date_sort },
      }) => {
        return `${endpointName}/${status}/${wallet}/${type}/${date_sort}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [ADMIN_ACCOUNTING],
    }),

    accountingDepositAccept: build.mutation<
      { account_id: string; balance: number },
      IAdminAccountingDepositAccept
    >({
      query: (params) => ({
        url: `/adv-admin/accept/deposit`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [ADMIN_ACCOUNTING],
    }),

    accountingWithdrawalAccept: build.mutation<
      { success: boolean },
      { batch_id: string }
    >({
      query: (params) => ({
        url: `/adv-admin/accept/withdrawal`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [ADMIN_ACCOUNTING],
    }),

    getAdminTransactionInfo: build.query<IAdminTransactionInfo, { id: string }>(
      {
        query: (params) => ({
          url: `/adv-admin/transactions/${params.id}`,
          method: `GET`,
        }),
      },
    ),
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
              (response?.page - 1) * INTERSECTION_ELEMENTS.ADMIN_REVIEWS,
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
  useGetAdminAccountingQuery,
  useGetAdminTransactionInfoQuery,
  useGetAdminReviewsQuery,
  useAdminAcceptReviewMutation,
  useAdminRejectReviewMutation,
  useAdminChooseComplaintMutation,
  useAdminAcceptComplaintMutation,
  useAdminRejectComplaintMutation,
  useAccountingDepositAcceptMutation,
  useAccountingWithdrawalAcceptMutation,
} = adminAPI;
