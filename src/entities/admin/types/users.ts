import { userStatus } from "../config";

export interface IAdminUsers {
  page: number;
  elements: number;
  users: IAdminUserData[];
  isLast?: boolean;
}

export interface IAdminUserData {
  id: string;
  avatar: string;
  name: string;
  email: string;
  date: string;
  status: userStatus;
}
