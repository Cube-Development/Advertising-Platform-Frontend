import { authApi } from "@shared/api";
import { buildAdminUsersParams } from "../lib";
import { IAdminUserInfo, IAdminUsers, IGetAdminUsersReq } from "../types";

export const adminUsersAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminUsers: build.query<IAdminUsers, IGetAdminUsersReq>({
      query: (params) => ({
        url: `/adv-admin/users`,
        method: `GET`,
        params: buildAdminUsersParams(params),
      }),
      transformResponse: (response: IAdminUsers, _meta, arg) => ({
        ...response,
        search: arg?.search ?? null,
        status: arg?.status,
      }),
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.last) {
          return {
            ...newItems,
            isLast:
              (newItems.users?.length ?? 0) === 0 ||
              (newItems.users?.length ?? 0) >= (newItems.elements ?? 0) ||
              !newItems.last,
            users: newItems.users ?? [],
          };
        }

        const newUsers = [...(currentCache?.users ?? []), ...newItems.users];
        const uniqueUsers = Array.from(
          new Map(newUsers.map((user) => [user?.user_id, user])).values(),
        );
        return {
          ...newItems,
          isLast:
            uniqueUsers.length === newItems.elements ||
            newItems.users.length === 0 ||
            !newItems.last,
          users: uniqueUsers,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}/${queryArgs.status ?? "all"}/${queryArgs.search?.trim() ?? ""}`;
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
