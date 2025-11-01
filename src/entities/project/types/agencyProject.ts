import { orderStatus, projectStatus } from "../config";
import { platformTypesNum } from "@entities/platform";
import { IDesire } from "./managerProject";

export enum ENUM_VIEWER_ROLES {
  PUBLISHER = "publisher",
  CUSTOMER = "customer",
}

export interface IAgencyProjectCard {
  id: string;
  identifier: number;
  created: string;
  project_name: string;
  count_channels: number;
  is_request_approve?: projectStatus;
  views: number;
  budget: number;
  remainder?: number;
  completed: number;
  canceled_rejected?: number;
  canceled?: number;
  wait?: number;
  in_progress?: number;
  viewer: ENUM_VIEWER_ROLES;
  orders?: IAgencyOrderCard[];
}

export interface IAgencyOrderCard {
  id: string;
  identifier: number;
  channel_id?: string;
  url: string;
  date_coming: string;
  name: string;
  category: string;
  avatar: string;
  order_status: string;
  api_status: Exclude<
    orderStatus,
    | orderStatus.in_progress
    | orderStatus.rejected
    | orderStatus.post_matched
    | orderStatus.date_interval
    | orderStatus.date_constant
    | orderStatus.post_review
    | orderStatus.moderation
    | orderStatus.adv_accept
  >;
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
  subscribers: number;
  views: number;
  er: number;
  cpv: number;
  male: number;
  female: number;
  post_url?: string;
  desire: IDesire[];
  platform: platformTypesNum;
  rate?: number;
  post_deeplink: string;
}
