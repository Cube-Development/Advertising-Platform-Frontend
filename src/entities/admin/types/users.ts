import { userStatus } from "../config";

export interface IAdminUserData {
  id: string;
  avatar: string;
  name: string;
  email: string;
  date: string;
  status: userStatus;
}
