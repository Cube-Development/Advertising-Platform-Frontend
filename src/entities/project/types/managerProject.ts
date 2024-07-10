import { orderStatus } from "@entities/order";

export interface IManagerProjects {
  page: number;
  elements: number;
  tariffs: IManagerProjectCard[];
}

export interface IManagerNewProjects {
  page: number;
  elements: number;
  tariffs: IManagerNewProjectCard[];
}

// export interface IManagerNewProjectCard {
//   id: number;
//   date: string;
//   tarif: string;
//   price: number;
//   comment: string;
//   url: string[];
//   file: string[];
// }

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
  created: string;
  tarif: string;
  name: string;
  count_channels: number;
  views: number;
  budget: number;
  completed: number;
  canceled_rejected: number;
  wait?: number;
  in_progress?: number;
  moderation?: number;
  report?: boolean;
  subcards?: IManagerProjectSubcard[];
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
}
