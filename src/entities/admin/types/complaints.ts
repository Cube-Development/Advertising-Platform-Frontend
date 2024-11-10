import { complaintPriority } from "../config";

export interface IAdminComplaintData {
  id: string;
  theme: string;
  sender: IUser;
  date: string;
  priority: complaintPriority;
}

interface IUser {
  avatar: string;
  email: string;
  userId: string;
}
