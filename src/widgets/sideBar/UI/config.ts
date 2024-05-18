import { paths } from "@shared/routing";
import {
  CampaignIcon,
  TemplateIcon,
  WalletIcon,
  BookIcon,
  OfferIcon,
} from "@shared/assets";
import { IMenuItem } from "@shared/types/common";

export const advertiserMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.orders",
      path: paths.orders,
      img: CampaignIcon,
      openMenu: true,
    },
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
      path: paths.platforms,
      img: CampaignIcon,
    },
  },
  { item: { title: "burger_menu.offers", path: paths.offers, img: OfferIcon } },
];

export const commonMenu: IMenuItem[] = [
  {
    item: {
      title: "burger_menu.wallet",
      path: paths.main,
      img: WalletIcon,
      openMenu: true,
    },
  },
  { item: { title: "burger_menu.base", path: paths.faq, img: BookIcon } },
];
