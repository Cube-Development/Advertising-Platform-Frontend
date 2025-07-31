import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "@shared/types";
import { Building2 } from "lucide-react";

export const NAVBAR_ADMIN_MENU: IMenuItem[] = [
  {
    item: {
      title: "admin_panel.burger_menu.organization",
      path: ENUM_PATHS.ADMIN_ORGANIZATION,
      icon: Building2,
    },
  },
];
