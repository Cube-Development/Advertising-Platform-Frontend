import { addChannelQueries } from "@entities/channel";
import { CalculatorIcon, KeyIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";

export const notAuthAdvertiserNavbar = [
  { text: "pages.turnkey", href: ENUM_PATHS.TURNKEY, img: KeyIcon },
  { text: "pages.catalog", href: ENUM_PATHS.CATALOG },
  { text: "pages.platformOwner", href: ENUM_PATHS.MAIN_BLOGGER },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];

export const notAuthBloggerNavbar = [
  {
    text: "pages.calculateIncome",
    href: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    // href: `${paths.addChannel}?add_channel=${addChannelQueries.main}`,
    href: buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
      [queryParamKeys.addChannel]: addChannelQueries.main,
    }),
  },
  { text: "pages.advertiser", href: ENUM_PATHS.MAIN },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];

export const advertiserNavbar = [
  { text: "pages.turnkey", href: ENUM_PATHS.TURNKEY, img: KeyIcon },
  { text: "pages.catalog", href: ENUM_PATHS.CATALOG },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];

export const managerNavbar = [
  // { text: "pages.platformOwner", href: paths.mainBlogger },
  // { text: "pages.advertiser", href: paths.main },
];

export const bloggerNavbar = [
  {
    text: "pages.calculateIncome",
    href: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    // href: `${paths.addChannel}?add_channel=${addChannelQueries.main}`,
    href: buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
      [queryParamKeys.addChannel]: addChannelQueries.main,
    }),
  },
  { text: "pages.faq", href: ENUM_PATHS.FAQ },
];
