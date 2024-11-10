export interface IAdminReviewData {
  id: string;
  createdDate: string;
  closeDate?: string;
  platform: IPlatform;
  sender: IUser;
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
  email: string;
  userId: string;
}

interface IReview {
  text: string;
  rate: number;
}
