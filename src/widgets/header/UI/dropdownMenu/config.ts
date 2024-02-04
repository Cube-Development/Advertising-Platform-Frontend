import { paths } from "@shared/routing";
import { CampaignIcon } from '@shared/assets/icons/campaign';
import { TemplateIcon } from '@shared/assets/icons/template';
import { WalletIcon } from '@shared/assets/icons/wallet';
import { BookIcon } from '@shared/assets/icons/book';

export const advertiserMenu = [
    { item : {title: "burger_menu.services"}, 
    subItems: [
      { title: "burger_menu.catalog", path: paths.main},
      { title: "burger_menu.turnkey", path: paths.main}
      ]},

    { item : {title: "burger_menu.campaign", path: paths.main, img: CampaignIcon}},
    { item : {title: "burger_menu.saved", path: paths.main}},
    { item : {title: "burger_menu.manager", path: paths.main}},
    { item : {title: "burger_menu.template", path: paths.main, img: TemplateIcon}}
  ];
  
  export const bloggerMenu = [
      { item: {title: "burger_menu.services"}, 
      subItems: [
        { title: "burger_menu.addPlatform", path: paths.main},
        { title: "burger_menu.calculateIncome", path: paths.main}
        ]},
    { item: {title: "burger_menu.channels", path: paths.main}},
    { item: {title: "burger_menu.offers", path: paths.main}},

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