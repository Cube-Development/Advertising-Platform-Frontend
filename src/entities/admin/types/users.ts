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
