import { adminComplaintTypesFilter, complaintPriority } from "../config";

export interface IAdminComplaints {
  page: number;
  elements: number;
  complaints: IAdminComplaintData[];
  order_complaint_status?: adminComplaintTypesFilter;
  isLast?: boolean;
}

export interface IAdminComplaintData {
  id: string;
  theme: string;
  sender: IUser;
  moderator: IUser;
  created: string;
  completed: string;
  priority: complaintPriority;
}

interface IUser {
  avatar: string;
  email: string;
  name: string;
  id: string;
}
