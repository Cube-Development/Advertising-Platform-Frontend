export interface IUserGroupListItem {
  id: string;
  name: string;
  members_count: number;
  created: string;
  updated: string;
}

export interface IUserGroupsRes {
  groups: IUserGroupListItem[];
}

export interface IUserGroupMember {
  user_id: string;
  email: string;
  created: string;
}

export interface IUserGroupPrice {
  channel_id: string;
  channel_name: string;
  channel_url: string;
  format: number;
  blogger_price: number;
  price: number;
}

export interface IUserGroupDetail {
  id: string;
  name: string;
  created: string;
  updated: string;
  members: IUserGroupMember[];
  prices: IUserGroupPrice[];
}

export interface ICreateUserGroupReq {
  name: string;
}

export interface ICreateUserGroupRes {
  id: string;
}

export interface IRenameUserGroupReq {
  group_id: string;
  name: string;
}

export interface IUserGroupMembersReq {
  group_id: string;
  user_ids: string[];
}
