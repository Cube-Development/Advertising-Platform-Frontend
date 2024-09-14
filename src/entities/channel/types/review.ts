import { ratingData } from "../config";

export interface IReviewData {
  reviews: IReviewCard[];
  isLast?: boolean;
}

export interface IReviewCard {
  avatar: string;
  email: string;
  date: string;
  rate: ratingData;
  text: string;
  full_created: string;
}
