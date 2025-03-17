import { IMenuItem } from "@entities/admin/types/sidebar";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import {
  BookIcon,
  CampaignIcon,
  OfferIcon,
  TemplateIcon,
  WalletIcon,
} from "@shared/assets";
import { paths } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";

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
        path: buildPathWithQuery(paths.orders, {
          [queryParamKeys.projectType]: projectTypesFilter.myProject,
          [queryParamKeys.projectStatus]: myProjectStatusFilter.active,
        }),
        // path: `${paths.orders}?${queryParamKeys.projectType}=${projectTypesFilter.myProject}`,
      },
      {
        title: "orders_advertiser.type_filter.manager_project",
        path: buildPathWithQuery(paths.orders, {
          [queryParamKeys.projectType]: projectTypesFilter.managerProject,
          [queryParamKeys.projectStatus]: advManagerProjectStatusFilter.active,
        }),
        // path: `${paths.orders}?${queryParamKeys.projectType}=${projectTypesFilter.managerProject}`,
      },
      {
        title: "orders_advertiser.type_filter.saved_project",
        path: buildPathWithQuery(paths.orders, {
          [queryParamKeys.projectType]: projectTypesFilter.savedProject,
        }),
        // path: `${paths.orders}?${queryParamKeys.projectType}=${projectTypesFilter.savedProject}`,
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
      title: "burger_menu.manager_orders",
      path: paths.orders,
      img: CampaignIcon,
      // openMenu: true,
    },
  },
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];

export const bloggerMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.platforms",
      path: paths.myChannels,
      img: CampaignIcon,
    },
  },
  { item: { title: "burger_menu.offers", path: paths.offers, img: OfferIcon } },
];

export const commonMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.wallet",
      path: paths.wallet,
      img: WalletIcon,
      openMenu: true,
    },
    subItems: [
      { title: "burger_menu.top_up", path: paths.walletTopUp },
      { title: "burger_menu.withdraw", path: paths.walletWithdraw },
      { title: "burger_menu.history", path: paths.walletHistory },
      { title: "burger_menu.invoice", path: paths.main },
    ],
  },
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];
