import { ENUM_ROLES } from "@entities/user";
import {
  IMenuItem,
  MENU_ADVERTISER,
  MENU_ADVERTISER_NOT_AUTH,
  MENU_BLOGGER,
  MENU_BLOGGER_NOT_AUTH,
  MENU_COMMON,
  MENU_MANAGER,
  SERVICE_MENU_ADVERTISER,
  SERVICE_MENU_BLOGGER,
  SERVICE_MENU_FAQ,
  SERVICE_MENU_MANAGER,
} from "../../model";

interface Props {
  isAuth?: boolean;
  role?: ENUM_ROLES;
}

export const getMenu = ({ isAuth, role }: Props) => {
  let SERVICE_MENU: IMenuItem[] =
    role === ENUM_ROLES.ADVERTISER
      ? SERVICE_MENU_ADVERTISER
      : role === ENUM_ROLES.MANAGER
        ? SERVICE_MENU_MANAGER
        : SERVICE_MENU_BLOGGER;

  SERVICE_MENU = isAuth ? SERVICE_MENU : [...SERVICE_MENU, ...SERVICE_MENU_FAQ];

  const MENU_COMBINED: IMenuItem[] = isAuth
    ? role === ENUM_ROLES.ADVERTISER
      ? [...MENU_ADVERTISER, ...MENU_COMMON, ...SERVICE_MENU_FAQ]
      : role === ENUM_ROLES.BLOGGER
        ? [...MENU_BLOGGER, ...MENU_COMMON, ...SERVICE_MENU_FAQ]
        : role === ENUM_ROLES.MANAGER
          ? [...MENU_MANAGER, ...SERVICE_MENU_FAQ]
          : []
    : role === ENUM_ROLES.ADVERTISER
      ? MENU_ADVERTISER_NOT_AUTH
      : MENU_BLOGGER_NOT_AUTH;

  return {
    SERVICE_MENU,
    MENU_COMBINED,
  };
};
