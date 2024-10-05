import { platformTypesNum } from "@entities/platform";
import { offerStatus } from "../config";

export interface IBloggerOfferCard {
  id: string;
  platform: platformTypesNum;
  identifier: number;
  created: string;
  date_accept: string;
  name: string;
  category: string;
  avatar: string;
  order_status: string;
  api_status: offerStatus;
  publish_date:
    | {
        date_from: string;
        date_to: string;
      }
    | string;
  publish_time: {
    time_from: string;
    time_to: string;
  };
  format: {
    small: string;
    big: string;
  };
  price: number;
}

export interface IBloggerOffers {
  page: number;
  elements: number;
  orders: IBloggerOfferCard[];
  status?: string;
  isLast?: boolean;
}
