import { adminReviewTypesFilter } from "../config";

export interface IAdminReviews {
  page: number;
  elements: number;
  status: adminReviewTypesFilter,
  reviews: IAdminReviewData[];
  isLast?: boolean;
}

export interface IAdminReviewData {
  id: string;
  created: string;
  closeDate?: string;
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

