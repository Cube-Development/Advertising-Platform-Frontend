import { complaintPriority, complaintStatus } from "../config";

export interface IAdminComplaints {
  page: number;
  elements: number;
  complaints: IAdminComplaintData[];
  isLast?: boolean;
}

export interface IAdminComplaintData {
  id: string;
  theme: string;
  sender: IUser;
  date: string;
  priority: complaintPriority;
  status: complaintStatus;
}

interface IUser {
  avatar: string;
  email: string;
  userId: string;
}
