import { platformTypesNum } from "@entities/platform";
import { desireStatus, orderStatus, projectStatus } from "../config";

export interface IAdvProjects {
  page: number;
  elements: number;
  projects: IAdvProjectCard[];
  isLast?: boolean;
  status?: string;
}

export interface IAdvSubprojects {
  page: number;
  elements: number;
  orders: IAdvProjectSubcard[];
}

export interface IAdvProjectCard {
  id: string;
  identifier: number;
  tariff_name?: string;
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
  moderation?: number;
  subcard?: IAdvProjectSubcard[];
}

export interface IAdvProjectSubcard {
  id: string;
  identifier: number;
  channel_id?: string;
  date_coming: string;
  name: string;
  category: string;
  avatar: string;
  order_status: string;
  api_status: orderStatus;
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
  is_review: boolean;
  grade?: number;
}

interface IDesire {
  desire_type: desireStatus;
  comment: string;
}

export interface IAdvManagerProjectsDev {
  page: number;
  elements: number;
  projects: IAdvManagerProjectsDevCard[];
  isLast?: boolean;
  status?: string;
}

export interface IAdvManagerProjectsDevCard {
  id: string;
  identifier: number;
  tariff_id: string;
  project_name: string;
  tariff_name: string;
  created: string;
  budget: number;
}

export interface IAdvTemplateProjects {
  page: number;
  elements: number;
  projects: IAdvTemplateProjectsCard[];
}

export interface IAdvTemplateProjectsCard {
  id: string;
  identifier: number;
  count: number;
  created: string;
  name: string;
  budget: number;
}

export interface IOrderReportInfo {
  id: string;
  project_id: string;
  file_name: string;
  url: string;
  created: string;
}
