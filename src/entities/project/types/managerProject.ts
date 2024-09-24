import { sizeTypes } from "@shared/ui";
import { desireStatus, orderStatus } from "../config";

export interface IManagerProjects {
  page: number;
  elements: number;
  projects: IManagerProjectCard[];
  status?: string;
  isLast?: boolean;
}

export interface IManagerNewProjects {
  page: number;
  elements: number;
  projects: IManagerNewProjectCard[];
  status?: string;
  isLast?: boolean;
}

export interface IManagerNewProjectCard {
  id: string;
  identifier: number;
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
  identifier: number;
  project_id: string;
  project_name: string;
  tariff_name: string;
  tariff_date: string;
  orders: number;
  views: number;
  budget: number;
  remainder?: number;
  is_request_approve?: boolean;
  completed?: number;
  canceled_rejected?: number;
  wait?: number;
  in_progress?: number;
  moderation?: number;
  report?: boolean;
  subcards?: IManagerProjectSubcard[];

  comment?: string;
  links?: string[];
  files?: IFile[];
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
  post_url?: string;
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

export interface IDownloadFileType extends IFile {
  fileName?: string;
  fileSize?: string | number;
  currentSize?: string | number;
  sizeType?: sizeTypes;
  fileType?: string;
}
