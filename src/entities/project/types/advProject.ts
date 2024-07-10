import { orderStatus } from "@entities/order";

export interface IAdvProjects {
  page: number;
  elements: number;
  projects: IAdvProjectCard[];
}

export interface IAdvSubprojects {
  page: number;
  elements: number;
  orders: IAdvProjectSubcard[];
}

export interface IAdvProjectCard {
  id: string;
  tarif?: string;
  created: string;
  name: string;
  count_channels: number;
  views: number;
  budget: number;
  completed: number;
  canceled_rejected: number;
  wait?: number;
  in_progress?: number;
  moderation?: number;
  subcard?: IAdvProjectSubcard[];
}

export interface IAdvProjectSubcard {
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
  post_url?: string;
}

export interface IAdvManagerProjectsDev {
  page: number;
  elements: number;
  projects: IAdvManagerProjectsDevCard[];
}

export interface IAdvManagerProjectsDevCard {
  id: string;
  tarif?: string;
  created: string;
  name: string;
  budget: number;
}
