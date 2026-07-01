import { ENUM_OFFER_STATUS_BACKEND } from "@entities/offer";

export interface IUserManagerView {
  id: string;
  email: string;
  tin?: string | null;
  pinfl?: string | null;
  phone?: string | null;
}

export interface IOrderPriceManagerView {
  without_vat: number;
  with_vat: number;
  blogger_commission: number;
  catalog_commission: number;
}

export interface IDatePeriod {
  date_from: string;
  date_to: string;
}

export interface ITimePeriod {
  time_from: string;
  time_to: string;
}

export interface ISelfConnectOrder {
  order_id: string;
  project_id: string;
  executor: IUserManagerView;
  customer: IUserManagerView;
  owner: IUserManagerView;
  order_ident: number;
  url: string;
  name: string;
  avatar: string;
  order_date: string | IDatePeriod;
  order_time: ITimePeriod;
  price: IOrderPriceManagerView;
  api_status: ENUM_OFFER_STATUS_BACKEND;
  status: string;
  post_deeplink?: string | null;
}

export interface ISelfConnectOrdersResponse {
  page: number;
  elements: number;
  orders: ISelfConnectOrder[];
  status?: string;
  isLast?: boolean;
}
