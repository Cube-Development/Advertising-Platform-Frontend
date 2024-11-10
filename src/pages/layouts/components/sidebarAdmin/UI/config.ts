import { paths } from "@shared/routing";
import { IMenuItem } from "../../config";
import {
  ChannelIcon,
  HomeIcon,
  TransactionIcon,
  UserIcon,
} from "@shared/assets";

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
      img: TransactionIcon,
    },
  },
  {
    item: {
      path: paths.adminComplaints,
      img: TransactionIcon,
    },
  },
];
