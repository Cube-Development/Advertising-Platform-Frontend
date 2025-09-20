import { authApi } from "@shared/api";
import { IAdminUserInfo, IAdminUsers, IGetAdminUsersReq } from "../types";

export const adminUsersAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminUsers: build.query<IAdminUsers, IGetAdminUsersReq>({
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
          isLast:
            uniqueUsers.length === newItems.elements ||
            newItems.users.length === 0,
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
  }),
});

export const { useGetAdminUsersQuery, useGetAdminUserInfoQuery } =
  adminUsersAPI;
