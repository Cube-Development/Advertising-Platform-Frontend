import { ADMIN_REVIEW_STATUS } from "../config";

export interface IAdminReviews {
  page: number;
  elements: number;
  status: ADMIN_REVIEW_STATUS;
  reviews: IAdminReviewData[];
  isLast?: boolean;
}

export interface IAdminReviewData {
  id: string;
  created: string;
  completed?: string;
  channel: IChannel;
  sender: IUser;
  moderator?: IUser;
  review: string;
  rate: number;
}

interface IChannel {
  id: string;
  avatar: string;
  name: string;
}

interface IUser {
  id: string;
  avatar: string;
  email?: string;
  name?: string;
  // userId: string;
}
