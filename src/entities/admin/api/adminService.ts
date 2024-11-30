import { authApi } from "@shared/api";
import { adminComplaintTypesFilter } from "../config";
import { IAdminComplaints, IAdminUsers } from "../types";

export interface getAdminUsersReq {
  elements_on_page: number;
  last?: string;
}

export interface getAdminOrderComplaintsReq {
  page: number;
  order_complaint_status: adminComplaintTypesFilter;
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
        };
      },
      merge: (currentCache, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
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
  }),
});

export const { useGetAdminUsersQuery, useGetAdminOrderComplaintsQuery } =
  adminAPI;
