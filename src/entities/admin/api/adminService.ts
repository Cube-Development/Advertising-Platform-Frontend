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
  ExecutorType,
} from "../config";
import { buildManageProjectsBody } from "../lib";
import {
  IAdminAccounting,
  IAdminAccountingDepositAccept,
  IAdminComplaintInfoData,
  IAdminComplaints,
  IAdminReviews,
  IAdminOrdersPayoutReq,
  ICommonObserveReq,
  ICommonObserveResponse,
} from "../types";

export interface getAdminOrderComplaintsReq {
  page: number;
  order_complaint_status: ADMIN_COMPLAINT_STATUS;
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

export interface adminUpdateOrderDateReq {
  order_ident: number;
  order_date: string;
  time_from: string;
  time_to: string;
}

export interface adminMailingReq {
  subject: string;
  text: string;
  role: string;
  users: string[];
}

export interface adminSwapChannelOwnerReq {
  channel_id: string;
  owner_email: string;
  new_owner_email: string;
}

export interface adminUpdateOrderReq {
  order_ident: string;
  amount?: number;
  executor?: string;
  channel_id?: string;
}

export interface adminPublishOrderReq {
  order_id: string;
  url: string;
}

export interface adminCompleteProjectReq {
  project_id: string;
}

export interface IAdminManageProjectOrder {
  order_id: string;
  url: string;
  order_date: string | { date_from: string; date_to: string };
  order_time: {
    time_from: string;
    time_to: string;
  };
  order_completed_count: number;
  price: {
    without_vat: number;
    with_vat: number;
    blogger_commission: number;
    catalog_commission: number;
  };
  status: number;
}

export interface IAdminManageProjectsReq {
  page: number;
  elements_on_page: number;
  status: number[];
  project_id?: string;
  url?: string;
  executor_type?: ExecutorType;
}

export interface IAdminManageProjects {
  page: number;
  elements: number;
  orders: IAdminManageProjectOrder[];
  isLast?: boolean;
}

export const adminAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
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
    accountingDepositReject: build.mutation<
      { success: boolean },
      { batch_id: string }
    >({
      query: (params) => ({
        url: `/adv-admin/reject/deposit`,
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
    accountingWithdrawalReject: build.mutation<
      { success: boolean },
      { batch_id: string }
    >({
      query: (params) => ({
        url: `/adv-admin/reject/withdrawal`,
        method: `POST`,
        params: params,
      }),
      invalidatesTags: [ADMIN_ACCOUNTING],
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
    adminUpdateOrderDate: build.mutation<
      { success: boolean },
      adminUpdateOrderDateReq
    >({
      query: (body) => ({
        url: `/adv-admin/order/date`,
        method: "PUT",
        body,
      }),
    }),
    adminSendMailing: build.mutation<{ success: boolean }, adminMailingReq>({
      query: (body) => ({
        url: `/adv-admin/mailing`,
        method: "POST",
        body,
      }),
    }),
    adminSwapChannelOwner: build.mutation<
      { success: boolean },
      adminSwapChannelOwnerReq
    >({
      query: (params) => ({
        url: `/adv-admin/swap/channel-owner`,
        method: "POST",
        params,
      }),
    }),
    adminUpdateOrder: build.mutation<{ success: boolean }, adminUpdateOrderReq>(
      {
        query: (body) => ({
          url: `/adv-admin/order/update`,
          method: "POST",
          body,
        }),
      },
    ),
    adminPublishOrder: build.mutation<
      { success: boolean },
      adminPublishOrderReq
    >({
      query: (body) => ({
        url: `/adv-admin/order/publish`,
        method: "POST",
        body,
      }),
    }),
    adminCompleteProject: build.mutation<
      { success: boolean },
      adminCompleteProjectReq
    >({
      query: (params) => ({
        url: `/adv-admin/project/complete`,
        method: "POST",
        params,
      }),
    }),
    getAdminManageProjects: build.query<
      IAdminManageProjects,
      IAdminManageProjectsReq
    >({
      query: (body) => ({
        url: `/manage/projects`,
        method: "POST",
        body: buildManageProjectsBody(body),
      }),
      transformResponse: (response: IAdminManageProjects, _meta, arg) => {
        const pageSize =
          arg?.elements_on_page ?? INTERSECTION_ELEMENTS.ADMIN_MANAGE_PROJECTS;
        const batchLength = response?.orders?.length ?? 0;
        const accumulated = batchLength + (response?.page - 1) * pageSize;

        return {
          ...response,
          isLast:
            batchLength < pageSize || accumulated >= (response?.elements ?? 0),
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page: _page, ...filters } = queryArgs;
        return `${endpointName}-${JSON.stringify(filters)}`;
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) return newItems;

        const getKey = (order: IAdminManageProjectOrder) =>
          order.order_id ||
          `${order.url}|${JSON.stringify(order.order_date)}|${order.order_time.time_from}|${order.order_time.time_to}|${order.status}`;

        const map = new Map(
          currentCache?.orders?.map((order) => [getKey(order), order]),
        );
        newItems.orders?.forEach((order) => map.set(getKey(order), order));

        return {
          ...newItems,
          orders: Array.from(map.values()),
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    adminDeleteOrganization: build.mutation<
      { success: boolean },
      { email: string }
    >({
      query: (params) => ({
        url: `/adv-admin/delete-organization`,
        method: "POST",
        params,
      }),
    }),
    getCommonObserve: build.query<ICommonObserveResponse, ICommonObserveReq>({
      query: (body) => ({
        url: `/adv-admin/common/observe`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ICommonObserveResponse) => ({
        data: response?.data ?? [],
        totals: response?.totals ?? {
          projects: 0,
          common_orders: 0,
          publisher_orders: 0,
          self_connect_orders: 0,
          turnover: 0,
        },
      }),
    }),
    getAdminOrdersPayout: build.query<Blob, IAdminOrdersPayoutReq>({
      query: ({ date_from, date_to }) => ({
        url: `/adv-admin/orders/admin-payout`,
        method: "GET",
        params: { date_from, date_to },
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useGetAdminOrderComplaintsQuery,
  useGetAdminOrderComplaintInfoQuery,
  useGetAdminAccountingQuery,
  useGetAdminReviewsQuery,
  useAdminAcceptReviewMutation,
  useAdminRejectReviewMutation,
  useAdminChooseComplaintMutation,
  useAdminAcceptComplaintMutation,
  useAdminRejectComplaintMutation,
  useAccountingDepositAcceptMutation,
  useAccountingDepositRejectMutation,
  useAccountingWithdrawalAcceptMutation,
  useAccountingWithdrawalRejectMutation,
  useAdminUpdateOrderDateMutation,
  useAdminSendMailingMutation,
  useAdminSwapChannelOwnerMutation,
  useAdminUpdateOrderMutation,
  useAdminPublishOrderMutation,
  useAdminCompleteProjectMutation,
  useGetAdminManageProjectsQuery,
  useAdminDeleteOrganizationMutation,
  useGetCommonObserveQuery,
  useLazyGetAdminOrdersPayoutQuery,
} = adminAPI;
