import { ENUM_ROLES } from "@entities/user";
import { IDropdownSwitcher } from "./types";
import { ENUM_PATHS } from "@shared/routing";

export const DROPDOWN_SWITCHER = [
  {
    type: ENUM_ROLES.ADVERTISER,
    path: ENUM_PATHS.MAIN,
    name: "roles.advertiser",
  },
  {
    type: ENUM_ROLES.BLOGGER,
    path: ENUM_PATHS.MAIN_BLOGGER,
    name: "roles.blogger",
  },
];
