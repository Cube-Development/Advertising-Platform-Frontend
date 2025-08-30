import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "@shared/types";
import {
  Calculator,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  OctagonAlert,
  Tv,
  Users,
} from "lucide-react";

export const ADMIN_MENU: IMenuItem[] = [
  {
    item: {
      title: "admin_panel.burger_menu.home",
      path: ENUM_PATHS.ADMIN_HOME,
      icon: LayoutDashboard,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.channels",
      path: ENUM_PATHS.ADMIN_CHANNELS,
      icon: Tv,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.users",
      path: ENUM_PATHS.ADMIN_USERS,
      icon: Users,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.transactions",
      path: ENUM_PATHS.ADMIN_TRANSACTIONS,
      icon: CircleDollarSign,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.reviews",
      path: ENUM_PATHS.ADMIN_REVIEWS,
      icon: MessageSquareText,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.complaints",
      path: ENUM_PATHS.ADMIN_COMPLAINTS,
      icon: OctagonAlert,
    },
  },
];

export const ADMIN_MENU_ORGANIZATION: IMenuItem[] = [
  {
    item: {
      title: "admin_panel.burger_menu.invoice",
      path: ENUM_PATHS.ADMIN_DOCUMENTS,
      icon: FileText,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.accounting",
      path: ENUM_PATHS.ADMIN_ACCOUNTING,
      icon: Calculator,
    },
  },
];
