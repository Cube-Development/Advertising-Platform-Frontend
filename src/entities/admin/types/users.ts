import { userStatus } from "../config";

export interface IAdminUsers {
  last: string;
  elements: number;
  users: IAdminUserData[];
  isLast?: boolean;
}

export interface IAdminUserData {
  id: string;
  avatar: string;
  name: string;
  email: string;
  created: string;
  status: userStatus;
}

export interface IAdminEditUser {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  location: string;
  password: string;
  telegram: string;
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
