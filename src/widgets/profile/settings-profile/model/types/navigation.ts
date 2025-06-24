import { LucideIcon } from "lucide-react";

export enum ENUM_NAVIGATION_CARD_ITEM_TYPE {
  USER_DATA = "user_data",
  CHANGE_PASSWORD = "change_password",
  CHANGE_NOTIFICATIONS = "change_notifications",
}

export interface INavigationCardItem {
  label: string;
  icon: LucideIcon;
  type: ENUM_NAVIGATION_CARD_ITEM_TYPE;
}
