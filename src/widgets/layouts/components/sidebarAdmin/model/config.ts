import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "@shared/types";
import {
  ArrowRightLeft,
  BarChart2,
  Building2,
  Calculator,
  CalendarClock,
  CircleCheck,
  CircleDollarSign,
  ClipboardList,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  OctagonAlert,
  Pencil,
  Send,
  Tv,
  Users,
  Mail,
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
  {
    item: {
      title: "Перенос ордеров",
      path: ENUM_PATHS.ADMIN_ORDER_TRANSFER,
      icon: CalendarClock,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.track_orders",
      path: ENUM_PATHS.ADMIN_TRACK_ORDERS,
      icon: ClipboardList,
    },
  },
  {
    item: {
      title: "admin_panel.burger_menu.common_observe",
      path: ENUM_PATHS.ADMIN_COMMON_OBSERVE,
      icon: BarChart2,
    },
  },
  {
    item: {
      title: "Рассылка",
      path: ENUM_PATHS.ADMIN_MAILING,
      icon: Mail,
    },
  },
  {
    item: {
      title: "Передача канала",
      path: ENUM_PATHS.ADMIN_CHANNEL_OWNER_SWAP,
      icon: ArrowRightLeft,
    },
  },
  {
    item: {
      title: "Изменение ордера",
      path: ENUM_PATHS.ADMIN_ORDER_UPDATE,
      icon: Pencil,
    },
  },
  {
    item: {
      title: "Публикация поста",
      path: ENUM_PATHS.ADMIN_ORDER_PUBLISH,
      icon: Send,
    },
  },
  {
    item: {
      title: "Завершение проекта",
      path: ENUM_PATHS.ADMIN_PROJECT_COMPLETE,
      icon: CircleCheck,
    },
  },
  {
    item: {
      title: "Проекты",
      path: ENUM_PATHS.ADMIN_MANAGE_PROJECTS,
      icon: FolderKanban,
    },
  },
  {
    item: {
      title: "Удаление организации",
      path: ENUM_PATHS.ADMIN_DELETE_ORGANIZATION,
      icon: Building2,
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
