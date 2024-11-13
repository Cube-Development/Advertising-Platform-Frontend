export interface IAdminReviews {
  page: number;
  elements: number;
  reviews: IAdminReviewData[];
  isLast?: boolean;
}

export interface IAdminReviewData {
  id: string;
  createdDate: string;
  closeDate?: string;
  platform: IPlatform;
  sender: IUser;
  moderator?: IUser;
  review: IReview;
}

interface IPlatform {
  id: string;
  avatar: string;
  name: string;
}

interface IUser {
  id: string;
  avatar: string;
  email?: string;
  name?: string;
  userId: string;
}

interface IReview {
  text: string;
  rate: number;
}
