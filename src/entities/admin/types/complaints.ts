import { ADMIN_COMPLAINT_STATUS, ADMIN_COMPLAINT_PRIORITY } from "../config";

export interface IAdminComplaints {
  page: number;
  elements: number;
  complaints: IAdminComplaintData[];
  order_complaint_status?: ADMIN_COMPLAINT_STATUS;
  isLast?: boolean;
}

export interface IAdminComplaintData {
  id: string;
  theme: string;
  sender: IUser;
  moderator: IUser;
  created: string;
  completed: string;
  priority: ADMIN_COMPLAINT_PRIORITY;
}

interface IUser {
  avatar: string;
  email: string;
  name: string;
  id: string;
}
