import { addChannelQueries } from "@entities/channel";
import { CalculatorIcon, KeyIcon } from "@shared/assets";
import { paths } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";

export const notAuthAdvertiserNavbar = [
  { text: "pages.turnkey", href: paths.turnkey, img: KeyIcon },
  { text: "pages.catalog", href: paths.catalog },
  { text: "pages.platformOwner", href: paths.mainBlogger },
  { text: "pages.faq", href: paths.faq },
];

export const notAuthBloggerNavbar = [
  {
    text: "pages.calculateIncome",
    href: `${paths.mainBlogger}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    // href: `${paths.addChannel}?add_channel=${addChannelQueries.main}`,
    href: buildPathWithQuery(paths.addChannel, {
      [queryParamKeys.addChannel]: addChannelQueries.main,
    }),
  },
  { text: "pages.advertiser", href: paths.main },
  { text: "pages.faq", href: paths.faq },
];

export const advertiserNavbar = [
  { text: "pages.turnkey", href: paths.turnkey, img: KeyIcon },
  { text: "pages.catalog", href: paths.catalog },
  { text: "pages.faq", href: paths.faq },
];

export const managerNavbar = [
  // { text: "pages.platformOwner", href: paths.mainBlogger },
  // { text: "pages.advertiser", href: paths.main },
];

export const bloggerNavbar = [
  {
    text: "pages.calculateIncome",
    href: `${paths.mainBlogger}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    // href: `${paths.addChannel}?add_channel=${addChannelQueries.main}`,
    href: buildPathWithQuery(paths.addChannel, {
      [queryParamKeys.addChannel]: addChannelQueries.main,
    }),
  },
  { text: "pages.faq", href: paths.faq },
];
