import { platformTypesNum } from "@entities/platform";
import { ENUM_OFFER_STATUS_BACKEND } from "../config";
import { ENUM_INVOICE_TYPE } from "./invoice.enum";

export interface IBloggerOfferCard {
  id: string;
  channel_id?: string;
  platform: platformTypesNum;
  identifier: number;
  created: string;
  date_accept: string;
  name: string;
  category: string;
  avatar: string;
  order_status: string;
  api_status: ENUM_OFFER_STATUS_BACKEND;
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
  project_name?: string;
  post_link?: string;
  post_deeplink: string;
  cancel_reason?: string;
}

export interface IBloggerOffers {
  page: number;
  elements: number;
  orders: IBloggerOfferCard[];
  status?: string;
  isLast?: boolean;
}

export interface IGetInvoiceRequest {
  order_id: string;
  doc_type: ENUM_INVOICE_TYPE;
}

export interface IOrderAcceptFinallyRequest {
  order_id: string;
  invoice_doc_id: string;
  act_doc_id?: string;
}
