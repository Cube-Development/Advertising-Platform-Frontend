import { offerStatus } from "@shared/config/offerFilter";

export interface IBloggerOfferCard {
  id: string;
  date_coming: string;
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
}
