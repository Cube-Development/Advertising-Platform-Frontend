import { IMenuItem } from "@entities/admin";
import {
  AdminComplaintIcon,
  AdminReviewIcon,
  ChannelIcon,
  HomeIcon,
  TransactionIcon,
  UserIcon,
} from "@shared/assets";
import { paths } from "@shared/routing";

export const adminMenu: IMenuItem[] = [
  {
    item: {
      title: "admin_panel.burger_menu.home",
      path: paths.adminHome,
      img: HomeIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.channels",
      path: paths.adminChannels,
      img: ChannelIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.users",
      path: paths.adminUsers,
      img: UserIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.transactions",
      path: paths.adminTransactions,
      img: TransactionIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.reviews",
      path: paths.adminReviews,
      img: AdminReviewIcon,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.complaints",
      path: paths.adminComplaints,
      img: AdminComplaintIcon,
    },
  },
];
