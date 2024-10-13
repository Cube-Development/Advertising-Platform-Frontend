import { notificationsTypes } from "../config";

export interface INotifications {
  page: number;
  elements: number;
  notifications: INotificationCard[];
  isLast?: boolean;
}

export interface INotificationCard {
  id: string;
  text: string;
  method: notificationsTypes;
  created_date: string;
  created_time: string;
  is_read: boolean;
  data: INotificationData;
}

interface INotificationData {
  text: string;
  method: notificationsTypes;
  order_id: string;
}
