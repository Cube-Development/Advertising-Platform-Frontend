import { ADMIN_USER_STATUS } from "../config";

export interface IAdminUsers {
  last: string;
  elements: number;
  users: IAdminUserData[];
  isLast?: boolean;
}

export interface IAdminUserData {
  id: string;
  user_id: string;
  avatar: string;
  name: string;
  email: string;
  created: string;
  status: ADMIN_USER_STATUS;
}

export interface IAdminUserInfo {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  phone: string;
  language: number;
  created: string;
}

export enum userField {
  id = "id",
  avatar = "avatar",
  name = "name",
  email = "email",
  phone = "phone",
  language = "language",
  location = "location",
  password = "password",
  telegram = "telegram",
}
