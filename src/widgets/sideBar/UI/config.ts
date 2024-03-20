import { paths } from "@shared/routing";
import {
  CampaignIcon,
  TemplateIcon,
  WalletIcon,
  BookIcon,
} from "@shared/assets";

export const advertiserMenu = [
  { item: { path: paths.orders, img: CampaignIcon } },
  { item: { path: paths.main, img: TemplateIcon } },
];

export const bloggerMenu = [
  { item: { path: paths.platforms, img: CampaignIcon } },
  { item: { path: paths.offers, img: TemplateIcon } },
];

export const commonMenu = [
  { item: { path: paths.main, img: WalletIcon } },
  { item: { path: paths.main, img: BookIcon } },
];
