import { CalculatorIcon, KeyIcon } from "@shared/assets";
import { addChannelQueries } from "@shared/config/addChannelQueries";
import { paths } from "@shared/routing";

export const notAuthAdvertiserNavbar = [
  { text: "pages.turnkey", href: paths.turnkey, img: KeyIcon },
  { text: "pages.catalog", href: paths.catalog },
  { text: "pages.platformOwner", href: paths.mainBlogger },
];

export const notAuthBloggerNavbar = [
  {
    text: "pages.calculateIncome",
    href: `${paths.mainBlogger}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    href: `${paths.addPlatform}?add_channel=${addChannelQueries.main}`,
  },
  { text: "pages.advertiser", href: paths.main },
];

export const advertiserNavbar = [
  { text: "pages.turnkey", href: paths.turnkey, img: KeyIcon },
  { text: "pages.catalog", href: paths.catalog },
];

export const bloggerNavbar = [
  {
    text: "pages.calculateIncome",
    href: `${paths.mainBlogger}#calculateIncome`,
    img: CalculatorIcon,
  },
  {
    text: "pages.addPlatform",
    href: `${paths.addPlatform}?add_channel=${addChannelQueries.main}`,
  },
];
