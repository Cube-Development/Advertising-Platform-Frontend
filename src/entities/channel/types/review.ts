import { ratingData } from "../config";

export interface IReviewData {
  avatar: string;
  email: string;
  date: string;
  rate: ratingData;
  text: string;
}
