import { addChannelQueries } from "@entities/channel";
import { projectTypesFilter } from "@entities/project";
import {
  BookIcon,
  CalculatorIcon,
  CampaignIcon,
  KeyIcon,
  OfferIcon,
  PlatformIcon,
  TemplateIcon,
  WalletIcon,
} from "@shared/assets";
import { paths } from "@shared/routing";

export const advertiserMenu = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
    },
    subItems: [
      {
        title: "orders_advertiser.type_filter.my_project",
        path: `${paths.orders}?order_type=${projectTypesFilter.myProject}`,
      },
      {
        title: "orders_advertiser.type_filter.manager_project",
        path: `${paths.orders}?order_type=${projectTypesFilter.managerProject}`,
      },
      {
        title: "orders_advertiser.type_filter.saved_project",
        path: `${paths.orders}?order_type=${projectTypesFilter.savedProject}`,
      },
    ],
  },
  {
    item: {
      title: "burger_menu.template",
      path: paths.main,
      img: TemplateIcon,
    },
  },
];

export const managerMenu = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
    },
  },
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];

export const bloggerMenu = [
  {
    item: {
      title: "burger_menu.platforms",
      path: paths.myChannels,
      img: PlatformIcon,
    },
  },
  {
    item: {
      title: "burger_menu.offers",
      path: paths.offers,
      img: OfferIcon,
    },
  },
];

export const commonMenu = [
  {
    item: { title: "burger_menu.wallet", img: WalletIcon },
    subItems: [
      { title: "burger_menu.top_up", path: paths.walletTopUp },
      { title: "burger_menu.withdraw", path: paths.walletWithdraw },
      { title: "burger_menu.history", path: paths.wallethistory },
      { title: "burger_menu.invoice", path: paths.main },
    ],
  },
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];

export const advertiserMenuNotAuth = [
  {
    item: {
      title: "pages.turnkey",
      path: paths.turnkey,
      img: KeyIcon,
    },
  },
  {
    item: {
      title: "pages.catalog",
      path: paths.catalog,
    },
  },
  {
    item: {
      title: "pages.platformOwner",
      path: paths.mainBlogger,
    },
  },
];

export const bloggerMenuNotAuth = [
  {
    item: {
      title: "pages.calculateIncome",
      path: `${paths.mainBlogger}#calculateIncome`,
      img: CalculatorIcon,
    },
  },
  {
    item: {
      title: "pages.addPlatform",
      path: `${paths.addChannel}?add_channel=${addChannelQueries.main}`,
    },
  },
  {
    item: {
      title: "pages.advertiser",
      path: paths.main,
    },
  },
];
