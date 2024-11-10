import { paths } from "@shared/routing";
import {
  CampaignIcon,
  TemplateIcon,
  WalletIcon,
  BookIcon,
  OfferIcon,
} from "@shared/assets";
import { projectTypesFilter } from "@entities/project";
import { IMenuItem } from "../../config";

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

export const managerMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
      openMenu: true,
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
      { title: "burger_menu.history", path: paths.wallethistory },
      { title: "burger_menu.invoice", path: paths.main },
    ],
  },
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];
