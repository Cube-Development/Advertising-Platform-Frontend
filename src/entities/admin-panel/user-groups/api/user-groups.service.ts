import { ADMIN_USER_GROUPS, authApi } from "@shared/api";
import {
  ICreateUserGroupReq,
  ICreateUserGroupRes,
  IRenameUserGroupReq,
  IUserGroupDetail,
  IUserGroupMembersReq,
  IUserGroupsRes,
} from "../types";

export const userGroupsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getUserGroups: build.query<IUserGroupsRes, void>({
      query: () => ({
        url: "/adv-admin/user-groups",
        method: "GET",
      }),
      providesTags: [ADMIN_USER_GROUPS],
    }),
    getUserGroup: build.query<IUserGroupDetail, { group_id: string }>({
      query: ({ group_id }) => ({
        url: `/adv-admin/user-group/${group_id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { group_id }) => [
        { type: ADMIN_USER_GROUPS, id: group_id },
        ADMIN_USER_GROUPS,
      ],
    }),
    createUserGroup: build.mutation<ICreateUserGroupRes, ICreateUserGroupReq>({
      query: (body) => ({
        url: "/adv-admin/user-group",
        method: "POST",
        body,
      }),
      invalidatesTags: [ADMIN_USER_GROUPS],
    }),
    renameUserGroup: build.mutation<{ success: boolean }, IRenameUserGroupReq>({
      query: ({ group_id, name }) => ({
        url: `/adv-admin/user-group/${group_id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: (_result, _error, { group_id }) => [
        { type: ADMIN_USER_GROUPS, id: group_id },
        ADMIN_USER_GROUPS,
      ],
    }),
    deleteUserGroup: build.mutation<{ success: boolean }, { group_id: string }>(
      {
        query: ({ group_id }) => ({
          url: `/adv-admin/user-group/${group_id}`,
          method: "DELETE",
        }),
        invalidatesTags: [ADMIN_USER_GROUPS],
      },
    ),
    addUserGroupMembers: build.mutation<
      { success: boolean },
      IUserGroupMembersReq
    >({
      query: ({ group_id, user_ids }) => ({
        url: `/adv-admin/user-group/${group_id}/members`,
        method: "POST",
        body: { user_ids },
      }),
      invalidatesTags: (_result, _error, { group_id }) => [
        { type: ADMIN_USER_GROUPS, id: group_id },
        ADMIN_USER_GROUPS,
      ],
    }),
    removeUserGroupMembers: build.mutation<
      { success: boolean },
      IUserGroupMembersReq
    >({
      query: ({ group_id, user_ids }) => ({
        url: `/adv-admin/user-group/${group_id}/members`,
        method: "DELETE",
        body: { user_ids },
      }),
      invalidatesTags: (_result, _error, { group_id }) => [
        { type: ADMIN_USER_GROUPS, id: group_id },
        ADMIN_USER_GROUPS,
      ],
    }),
  }),
});

export const {
  useGetUserGroupsQuery,
  useGetUserGroupQuery,
  useCreateUserGroupMutation,
  useRenameUserGroupMutation,
  useDeleteUserGroupMutation,
  useAddUserGroupMembersMutation,
  useRemoveUserGroupMembersMutation,
} = userGroupsAPI;
