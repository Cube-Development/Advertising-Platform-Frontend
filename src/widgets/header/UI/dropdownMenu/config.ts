import { paths } from "@shared/routing";
import {
  CampaignIcon,
  TemplateIcon,
  WalletIcon,
  BookIcon,
} from "@shared/assets";

export const advertiserMenu = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
    },
    subItems: [
      { title: "orders_advertiser.type_filter.my_project", path: paths.orders },
      {
        title: "orders_advertiser.type_filter.manager_project",
        path: paths.orders,
      },
      {
        title: "orders_advertiser.type_filter.saved_project",
        path: paths.orders,
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

export const bloggerMenu = [
  {
    item: {
      title: "burger_menu.platforms",
      path: paths.platforms,
      img: CampaignIcon,
    },
  },
  {
    item: {
      title: "burger_menu.offers",
      path: paths.offers,
      img: TemplateIcon,
    },
  },
];

export const commonMenu = [
  {
    item: { title: "burger_menu.wallet", img: WalletIcon },
    subItems: [
      { title: "burger_menu.add_funds", path: paths.wallet },
      { title: "burger_menu.withdraw", path: paths.wallet },
      { title: "burger_menu.history", path: paths.wallet },
      { title: "burger_menu.invoice", path: paths.wallet },
    ],
  },
  { item: { title: "burger_menu.base", path: paths.main, img: BookIcon } },
];
