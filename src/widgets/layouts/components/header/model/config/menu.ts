import { addChannelQueries } from "@entities/channel";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
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
import { ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { IMenuItem } from "./types";
import { FileText } from "lucide-react";

export const SERVICE_MENU_ADVERTISER: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.catalog",
      path: ENUM_PATHS.CATALOG,
      img: CatalogIcon,
    },
  },
  {
    item: {
      title: "burger_menu.turnkey",
      path: ENUM_PATHS.TURNKEY,
      img: KeyIcon,
    },
  },
];

export const SERVICE_MENU_BLOGGER: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.calculateIncome",
      path: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
      img: CalculatorIcon,
    },
  },
  {
    item: {
      title: "burger_menu.addPlatform",
      path: ENUM_PATHS.ADD_CHANNEL,
      img: AddChannelIcon,
      isDialog: true,
    },
  },
];

export const SERVICE_MENU_FAQ = [
  { item: { title: "burger_menu.base", path: ENUM_PATHS.FAQ, img: BookIcon } },
];

export const MENU_ADVERTISER: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.orders",
      path: ENUM_PATHS.ORDERS,
      img: CampaignIcon,
      type: viewsTypes.advertiserProjects,
    },
    subItems: [
      {
        title: "orders_advertiser.type_filter.my_project",
        path: buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: projectTypesFilter.myProject,
          [queryParamKeys.projectStatus]: myProjectStatusFilter.active,
        }),
        type: projectTypesFilter.myProject,
      },
      {
        title: "orders_advertiser.type_filter.manager_project",
        path: buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: projectTypesFilter.managerProject,
          [queryParamKeys.projectStatus]: advManagerProjectStatusFilter.active,
        }),
        type: projectTypesFilter.managerProject,
      },
      {
        title: "orders_advertiser.type_filter.saved_project",
        path: buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: projectTypesFilter.savedProject,
        }),
        type: projectTypesFilter.savedProject,
      },
    ],
  },
  {
    item: {
      title: "burger_menu.template",
      path: ENUM_PATHS.MAIN,
      img: TemplateIcon,
    },
  },
];

export const MENU_MANAGER: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.manager_orders",
      path: ENUM_PATHS.ORDERS,
      img: CampaignIcon,
      type: viewsTypes.managerProjects,
    },
  },
];

export const MENU_BLOGGER: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.platforms",
      path: ENUM_PATHS.MY_CHANNELS,
      img: PlatformIcon,
      type: viewsTypes.bloggerChannels,
    },
  },
  {
    item: {
      title: "burger_menu.offers",
      path: ENUM_PATHS.OFFERS,
      img: OfferIcon,
      type: viewsTypes.bloggerOffers,
    },
  },
];

export const MENU_COMMON: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.wallet",
      img: WalletIcon,
      type: viewsTypes.wallet,
    },
    subItems: [
      { title: "burger_menu.top_up", path: ENUM_PATHS.WALLET_TOP_UP },
      { title: "burger_menu.withdraw", path: ENUM_PATHS.WALLET_WITHDRAW },
      {
        title: "burger_menu.history",
        path: ENUM_PATHS.WALLET_HISTORY,
        type: walletTypesFilter.transactions,
      },
      { title: "burger_menu.invoice", path: ENUM_PATHS.MAIN },
    ],
  },
  {
    item: {
      title: "burger_menu.documents",
      img: FileText,
      path: ENUM_PATHS.DOCUMENTS,
    },
  },
];

export const MENU_ADVERTISER_NOT_AUTH: IMenuItem[] = [
  {
    item: {
      title: "pages.turnkey",
      path: ENUM_PATHS.TURNKEY,
      img: KeyIcon,
    },
  },
  {
    item: {
      title: "pages.catalog",
      path: ENUM_PATHS.CATALOG,
    },
  },
  {
    item: {
      title: "pages.platformOwner",
      path: ENUM_PATHS.MAIN_BLOGGER,
    },
  },
];

export const MENU_BLOGGER_NOT_AUTH: IMenuItem[] = [
  {
    item: {
      title: "pages.calculateIncome",
      path: `${ENUM_PATHS.MAIN_BLOGGER}#calculateIncome`,
      img: CalculatorIcon,
    },
  },
  {
    item: {
      title: "pages.addPlatform",
      path: buildPathWithQuery(ENUM_PATHS.ADD_CHANNEL, {
        [queryParamKeys.addChannel]: addChannelQueries.main,
      }),
    },
  },
  {
    item: {
      title: "pages.advertiser",
      path: ENUM_PATHS.MAIN,
    },
  },
];
