import { IMenuItem } from "@entities/admin";
import { addChannelQueries } from "@entities/channel";
import { projectTypesFilter } from "@entities/project";
import { viewsTypes } from "@entities/views";
import { walletTypesFilter } from "@entities/wallet";
import {
  AddChannelIcon,
  BookIcon,
  CalculatorIcon,
  CampaignIcon,
  CatalogIcon,
  KeyIcon,
  OfferIcon,
  PlatformIcon,
  TemplateIcon,
  WalletIcon,
} from "@shared/assets";
import { paths } from "@shared/routing";

export const advertiserServiceMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.catalog",
      path: paths.catalog,
      img: CatalogIcon,
    },
  },
  {
    item: {
      title: "burger_menu.turnkey",
      path: paths.turnkey,
      img: KeyIcon,
    },
  },
];

export const bloggerServiceMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.calculateIncome",
      path: `${paths.mainBlogger}#calculateIncome`,
      img: CalculatorIcon,
    },
  },
  {
    item: {
      title: "burger_menu.addPlatform",
      path: paths.addChannel,
      img: AddChannelIcon,
      isDialog: true,
    },
  },
];

export const faqServiceMenu = [
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];

export const advertiserMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
      type: viewsTypes.advertiserProjects,
    },
    subItems: [
      {
        title: "orders_advertiser.type_filter.my_project",
        path: `${paths.orders}?order_type=${projectTypesFilter.myProject}`,
        type: projectTypesFilter.myProject,
      },
      {
        title: "orders_advertiser.type_filter.manager_project",
        path: `${paths.orders}?order_type=${projectTypesFilter.managerProject}`,
        type: projectTypesFilter.managerProject,
      },
      {
        title: "orders_advertiser.type_filter.saved_project",
        path: `${paths.orders}?order_type=${projectTypesFilter.savedProject}`,
        type: projectTypesFilter.savedProject,
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

export const managerMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
      type: viewsTypes.managerProjects,
    },
  },
];

export const bloggerMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.platforms",
      path: paths.myChannels,
      img: PlatformIcon,
      type: viewsTypes.bloggerChannels,
    },
  },
  {
    item: {
      title: "burger_menu.offers",
      path: paths.offers,
      img: OfferIcon,
      type: viewsTypes.bloggerOffers,
    },
  },
];

export const commonMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.wallet",
      img: WalletIcon,
      type: viewsTypes.wallet,
    },
    subItems: [
      { title: "burger_menu.top_up", path: paths.walletTopUp },
      { title: "burger_menu.withdraw", path: paths.walletWithdraw },
      {
        title: "burger_menu.history",
        path: paths.walletHistory,
        type: walletTypesFilter.transactions,
      },
      { title: "burger_menu.invoice", path: paths.main },
    ],
  },
];

export const advertiserMenuNotAuth: IMenuItem[] = [
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

export const bloggerMenuNotAuth: IMenuItem[] = [
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
