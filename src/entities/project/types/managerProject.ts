import { desireStatus, orderStatus } from "@entities/order";

export interface IManagerProjects {
  page: number;
  elements: number;
  projects: IManagerProjectCard[];
}

export interface IManagerNewProjects {
  page: number;
  elements: number;
  projects: IManagerNewProjectCard[];
}

export interface IManagerNewProjectCard {
  id: string;
  project_id: string;
  tariff_date: string;
  tariff_name: string;
  budget: number;
  comment: string;
  links: string[];
  files: IFile[];
}

interface IFile {
  content: string;
  content_type: number;
}

export interface IManagerProjectCard {
  id: string;
  project_id: string;
  project_name: string;
  tariff_name: string;
  tariff_date: string;
  orders: number;
  views: number;
  budget: number;
  is_request_approve?: boolean;
  completed?: number;
  canceled_rejected?: number;
  wait?: number;
  in_progress?: number;
  moderation?: number;
  report?: boolean;
  subcards?: IManagerProjectSubcard[];
}

export interface IManagerSubprojects {
  page: number;
  elements: number;
  orders: IManagerProjectSubcard[];
}

export interface IManagerProjectSubcard {
  id: string;
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
  desire?: IDesire[];
}

export interface IDesire {
  desire_type: desireStatus;
  comment: string;
}
