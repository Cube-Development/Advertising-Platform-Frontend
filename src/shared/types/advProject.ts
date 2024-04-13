<<<<<<< HEAD
import { orderStatus } from "@shared/config/orderFilter";

=======
>>>>>>> e799383 (feat: project rtk)
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
<<<<<<< HEAD
=======
  // id: number;
  // name?: string;
  // date: string;
  // channels: number;
  // views: number;
  // cost: number;
  // complite: number;
  // cancel: number;
  // wait: number;
  // start: number;
  // consideration: number;
  // status: number;
  // channels_list: IAdvProjectSubcard[];

>>>>>>> e799383 (feat: project rtk)
  id: string;
  created: string;
  name: string;
  count_channels: number;
  views: number;
  budget: number;
  completed: number;
  canceled_rejected: number;
<<<<<<< HEAD
  wait?: number;
  in_progress?: number;
  moderation?: number;
}

export interface IAdvProjectSubcard {
=======
  wait: number;
  in_progress: number;
  moderation: number;
}

export interface IAdvProjectSubcard {
  //   img: string;
  //   name: string;
  //   category: string;
  //   date_from: string;
  //   date_to: string;
  //   accommodation: string;
  //   time_from: string;
  //   time_to: string;
  //   price: number;
  //   subs: number;
  //   views: number;
  //   ER: number;
  //   CPV: number;
  //   sex: number;
  //   status: number;

>>>>>>> e799383 (feat: project rtk)
  id: string;
  date_coming: string;
  name: string;
  category: string;
  avatar: string;
<<<<<<< HEAD
  order_status: orderStatus;
=======
  order_status: string;
>>>>>>> e799383 (feat: project rtk)
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
<<<<<<< HEAD
  subscribers: number;
  views: number;
  er: number;
  cpv: number;
  male: number;
  female: number;
=======
>>>>>>> e799383 (feat: project rtk)
}
