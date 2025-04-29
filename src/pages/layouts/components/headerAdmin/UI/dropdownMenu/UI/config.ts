import { IMenuItem } from "@entities/admin";
import {
  AdminComplaintIcon,
  AdminReviewIcon,
  ChannelIcon,
  HomeIcon,
  TransactionIcon,
  UserIcon,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";

export const adminMenu: IMenuItem[] = [
  {
    item: {
      title: "admin_panel.burger_menu.home",
      path: ENUM_PATHS.ADMIN_HOME,
      img: HomeIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.channels",
      path: ENUM_PATHS.ADMIN_CHANNELS,
      img: ChannelIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.users",
      path: ENUM_PATHS.ADMIN_USERS,
      img: UserIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.transactions",
      path: ENUM_PATHS.ADMIN_TRANSACTIONS,
      img: TransactionIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.reviews",
      path: ENUM_PATHS.ADMIN_REVIEWS,
      img: AdminReviewIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.complaints",
      path: ENUM_PATHS.ADMIN_COMPLAINTS,
      img: AdminComplaintIcon,
    },
  },
];
