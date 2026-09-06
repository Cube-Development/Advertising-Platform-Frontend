import { ADMIN_USER_STATUS } from "../config";

export interface IGetAdminUsersReq {
  elements_on_page: number;
  last?: string;
  search?: string | null;
  status?: ADMIN_USER_STATUS;
}

export interface IAdminUsers {
  last: string | null;
  elements: number;
  users: IAdminUserData[];
  search?: string | null;
  status?: ADMIN_USER_STATUS;
  isLast?: boolean;
}

export interface IAdminUserData {
  id: number;
  user_id: string;
  avatar: string;
  name: string;
  email: string;
  created: string;
  status: ADMIN_USER_STATUS;
}

export interface IAdminUserOrg {
  tin: string | null;
  pinfl: string | null;
  type: number | null;
  status: string | null;
}

export interface IAdminUserChannel {
  id: string;
  url: string;
  name: string;
  status: number;
  completed_count: number;
}

export interface IAdminUserInfo {
  id: string;
  first_name: string | null;
  surname: string | null;
  email: string;
  phone: string | null;
  language: number;
  created: string;
  organization?: IAdminUserOrg | null;
  channels: IAdminUserChannel[];
}
