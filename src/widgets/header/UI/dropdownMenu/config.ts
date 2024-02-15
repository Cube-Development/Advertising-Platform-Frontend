import { paths } from "@shared/routing";
import { CampaignIcon, TemplateIcon, WalletIcon, BookIcon } from '@shared/assets';

export const advertiserMenu = [
    { item : {title: "burger_menu.orders", path: paths.orders, img: CampaignIcon}},
    { item : {title: "burger_menu.template", path: paths.main, img: TemplateIcon}}
  ];
  
  export const bloggerMenu = [
    { item: {title: "burger_menu.platforms", path: paths.main}},
    { item: {title: "burger_menu.offers", path: paths.offers}},

  ];
  

  export const commonMenu = [
    { item: {title: "burger_menu.wallet", img: WalletIcon },
    subItems: [
      {title: "burger_menu.add_funds", path: paths.main},
      {title: "burger_menu.withdraw", path: paths.main},
      {title: "burger_menu.history", path: paths.main},
      {title: "burger_menu.invoice", path: paths.main},
    ]},
  { item: { title: "burger_menu.base", path: paths.main, img: BookIcon}}
  ]