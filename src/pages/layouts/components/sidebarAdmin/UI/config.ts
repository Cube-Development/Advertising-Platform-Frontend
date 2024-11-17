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
      path: paths.adminHome,
      img: HomeIcon,
    },
  },
  {
    item: {
      path: paths.adminChannels,
      img: ChannelIcon,
    },
  },
  {
    item: {
      path: paths.adminUsers,
      img: UserIcon,
    },
  },
  {
    item: {
      path: paths.adminTransactions,
      img: TransactionIcon,
    },
  },
  {
    item: {
      path: paths.adminReviews,
      img: AdminReviewIcon,
    },
  },
  {
    item: {
      path: paths.adminComplaints,
      img: AdminComplaintIcon,
    },
  },
];
