import {
  AdminComplaintIcon,
  AdminReviewIcon,
  ChannelIcon,
  HomeIcon,
  TransactionIcon,
  UserIcon,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "../../header/model";
import { FileText } from "lucide-react";

export const SIDEBAR_ADMIN_MENU: IMenuItem[] = [
  {
    item: {
      path: ENUM_PATHS.ADMIN_HOME,
      img: HomeIcon,
    },
  },
  {
    item: {
      path: ENUM_PATHS.ADMIN_CHANNELS,
      img: ChannelIcon,
    },
  },
  {
    item: {
      path: ENUM_PATHS.ADMIN_USERS,
      img: UserIcon,
    },
  },
  {
    item: {
      path: ENUM_PATHS.ADMIN_TRANSACTIONS,
      img: TransactionIcon,
    },
  },
  {
    item: {
      path: ENUM_PATHS.ADMIN_REVIEWS,
      img: AdminReviewIcon,
    },
  },
  {
    item: {
      path: ENUM_PATHS.ADMIN_COMPLAINTS,
      img: AdminComplaintIcon,
    },
  },
];

export const SIDEBAR_ADMIN_MENU_ORGANIZATION: IMenuItem[] = [
  {
    item: {
      path: ENUM_PATHS.ADMIN_DOCUMENTS,
      img: FileText,
    },
  },
];
