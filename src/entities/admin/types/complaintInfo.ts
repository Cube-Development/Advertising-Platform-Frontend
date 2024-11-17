import { complaintPriority, complaintStatus } from "../config";

export interface IAdminComplaintInfoData {
  id: string;
  sender: IUser;
  moderator: IUser;
  datetime: string;
  theme: string;
  priority: complaintPriority;
  status: complaintStatus;
  comment: string;
  offerId: string;
  channel: IChannel;
  owner: IUser;
  post: IPost;
}

interface IUser {
  userId: string;
  avatar: string;
  email?: string;
  name?: string;
}

interface IChannel {
  id: string;
  avatar: string;
  name: string;
  platform: string;
}

interface IPost {
  date: string;
  time: string;
  format: string;
  amount: number;
}
