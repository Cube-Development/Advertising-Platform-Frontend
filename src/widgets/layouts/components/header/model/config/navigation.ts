import { addChannelQueries } from "@entities/channel";
import { CalculatorIcon, KeyIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";

export const NAVBAR_ADVERTISER_NOT_AUTH_MENU = [
  { text: "pages.turnkey", href: ENUM_PATHS.TURNKEY, img: KeyIcon },
  { text: "pages.catalog", href: ENUM_PATHS.CATALOG },
  { text: "pages.platformOwner", href: ENUM_PATHS.MAIN_BLOGGER },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];

export const NAVBAR_BLOGGER_NOT_AUTH_MENU = [
  {
    text: "pages.calculateIncome",
    href: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    href: buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
      [queryParamKeys.addChannel]: addChannelQueries.main,
    }),
  },
  { text: "pages.advertiser", href: ENUM_PATHS.MAIN },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];

export const NAVBAR_ADVERTISER_MENU = [
  { text: "pages.turnkey", href: ENUM_PATHS.TURNKEY, img: KeyIcon },
  { text: "pages.catalog", href: ENUM_PATHS.CATALOG },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];

export const NAVBAR_MANAGER_MENU = [
  { text: "pages.catalog", href: ENUM_PATHS.CATALOG, img: undefined },
  { text: "pages.faq", href: ENUM_PATHS.FAQ, img: undefined },
];

export const NAVBAR_BLOGGER_MENU = [
  {
    text: "pages.calculateIncome",
    href: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    href: buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
      [queryParamKeys.addChannel]: addChannelQueries.main,
    }),
  },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];
