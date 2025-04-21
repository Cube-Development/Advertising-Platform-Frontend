import { roles } from "@entities/user";
import { ADMIN_COMPLAINT_PRIORITY, ADMIN_COMPLAINT_STATUS } from "../config";

export interface IAdminComplaintInfoData {
  id: string;
  sender: IUser;
  moderator: IUser;
  created: string;
  theme: string;
  priority: ADMIN_COMPLAINT_PRIORITY;
  status: ADMIN_COMPLAINT_STATUS;
  comment: string;
  order_id: string;
  channel: IChannel;
  owner: IUser;
  post: IPost;
  role?: roles;
  reason: string;
}

interface IUser {
  id: string;
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
  published_date: string;
  published_time: string;
  format: IFormat;
  amount: number;
  post_url: string;
}

interface IFormat {
  big: string;
  small: string;
}
