import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { IMenuItem } from "../../header/model";
import {
  SIDEBAR_ADVERTISER_MENU,
  SIDEBAR_BLOGGER_MENU,
  SIDEBAR_COMMON_MENU,
  SIDEBAR_MANAGER_MENU,
} from "../model";

export const getData = (
  role: ENUM_ROLES,
): { toRole: ENUM_ROLES; toPage: ENUM_PATHS; SIDEBAR_MENU: IMenuItem[] } => {
  let toRole: ENUM_ROLES;
  let toPage: ENUM_PATHS;
  let SIDEBAR_MENU: IMenuItem[];

  switch (role) {
    case ENUM_ROLES.ADVERTISER:
      toRole = ENUM_ROLES.BLOGGER;
      toPage = ENUM_PATHS.MAIN_BLOGGER;
      SIDEBAR_MENU = [...SIDEBAR_ADVERTISER_MENU, ...SIDEBAR_COMMON_MENU];
      break;
    case ENUM_ROLES.BLOGGER:
      toRole = ENUM_ROLES.ADVERTISER;
      toPage = ENUM_PATHS.MAIN;
      SIDEBAR_MENU = [...SIDEBAR_BLOGGER_MENU, ...SIDEBAR_COMMON_MENU];
      break;
    case ENUM_ROLES.MANAGER:
      toRole = role;
      toPage = ENUM_PATHS.ORDERS;
      SIDEBAR_MENU = SIDEBAR_MANAGER_MENU;
      break;
    default:
      toRole = role;
      toPage = ENUM_PATHS.MAIN;
      SIDEBAR_MENU = [];
  }

  return { toRole, toPage, SIDEBAR_MENU };
};
