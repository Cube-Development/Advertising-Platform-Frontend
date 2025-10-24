import { IMenuItem } from "../../header/model/config/types";
import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
} from "@entities/project";
import {
  BookIcon,
  CampaignIcon,
  OfferIcon,
  TemplateIcon,
  WalletIcon,
} from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";
import { FileText } from "lucide-react";

export const SIDEBAR_ADVERTISER_MENU: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.orders",
      path: ENUM_PATHS.ORDERS,
      img: CampaignIcon,
    },
    subItems: [
      {
        title: "orders_advertiser.type_filter.my_project",
        path: buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: ENUM_PROJECT_TYPES.MY_PROJECT,
          [queryParamKeys.projectStatus]: ENUM_ADV_MY_PROJECT_STATUS.ACTIVE,
        }),
      },
      {
        title: "orders_advertiser.type_filter.manager_project",
        path: buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: ENUM_PROJECT_TYPES.MANAGER_PROJECT,
          [queryParamKeys.projectStatus]:
            ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE,
        }),
      },
      {
        title: "orders_advertiser.type_filter.saved_project",
        path: buildPathWithQuery(ENUM_PATHS.ORDERS, {
          [queryParamKeys.projectType]: ENUM_PROJECT_TYPES.SAVED_PROJECT,
        }),
      },
    ],
  },
  {
    item: {
      title: "burger_menu.template",
      path: ENUM_PATHS.POST_TEMPLATES,
      img: TemplateIcon,
    },
  },
];

export const SIDEBAR_MANAGER_MENU: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.manager_orders",
      path: ENUM_PATHS.ORDERS,
      img: CampaignIcon,
    },
  },
  { item: { title: "burger_menu.base", path: ENUM_PATHS.FAQ, img: BookIcon } },
];

export const SIDEBAR_BLOGGER_MENU: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.platforms",
      path: ENUM_PATHS.MY_CHANNELS,
      img: CampaignIcon,
    },
  },
  {
    item: {
      title: "burger_menu.offers",
      path: ENUM_PATHS.OFFERS,
      img: OfferIcon,
    },
  },
];

export const SIDEBAR_COMMON_MENU: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.wallet",
      path: ENUM_PATHS.WALLET,
      img: WalletIcon,
      openMenu: true,
    },
    subItems: [
      { title: "burger_menu.top_up", path: ENUM_PATHS.WALLET_TOP_UP },
      { title: "burger_menu.withdraw", path: ENUM_PATHS.WALLET_WITHDRAW },
      { title: "burger_menu.history", path: ENUM_PATHS.WALLET_HISTORY },
      // { title: "burger_menu.invoice", path: ENUM_PATHS.MAIN },
    ],
  },
  {
    item: {
      title: "burger_menu.invoice",
      path: ENUM_PATHS.DOCUMENTS,
      img: FileText,
    },
  },
  { item: { title: "burger_menu.base", path: ENUM_PATHS.FAQ, img: BookIcon } },
];
