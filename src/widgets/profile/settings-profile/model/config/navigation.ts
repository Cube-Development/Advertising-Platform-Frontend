import { Bell, LockKeyhole, User } from "lucide-react";
import { ENUM_NAVIGATION_CARD_ITEM_TYPE, INavigationCardItem } from "../types";

export const NAVIGATION_CARD_LIST: INavigationCardItem[] = [
  {
    label: "profile.navigation.user_data",
    icon: User,
    type: ENUM_NAVIGATION_CARD_ITEM_TYPE.USER_DATA,
  },
  {
    label: "profile.navigation.change_notifications",
    icon: Bell,
    type: ENUM_NAVIGATION_CARD_ITEM_TYPE.CHANGE_NOTIFICATIONS,
  },
  {
    label: "profile.navigation.change_password",
    icon: LockKeyhole,
    type: ENUM_NAVIGATION_CARD_ITEM_TYPE.CHANGE_PASSWORD,
  },
];
