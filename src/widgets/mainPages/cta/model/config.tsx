import { ENUM_ROLES, TYPE_USER_ROLES } from "@entities/user";
import {
  AiImageIcon,
  AnalyticsGrowthIcon,
  PayoutSystemIcon,
  ShieldCheckIcon,
  TuneControlsIcon,
  UserBusinessIcon,
} from "@shared/assets";
import { ICtaOption } from "./type";

export const ADVERTISER_OPTIONS_LIST = (
  options: { option: string }[],
): ICtaOption[] => {
  return [
    {
      text: options[0].option,
      icon: TuneControlsIcon,
    },
    {
      text: options[1].option,
      icon: AiImageIcon,
    },
    {
      text: options[2].option,
      icon: ShieldCheckIcon,
    },
  ];
};

export const BLOGGER_OPTIONS_LIST = (
  options: { option: string }[],
): ICtaOption[] => {
  return [
    {
      text: options[0].option,
      icon: UserBusinessIcon,
    },
    {
      text: options[1].option,
      icon: AnalyticsGrowthIcon,
    },
    {
      text: options[2].option,
      icon: PayoutSystemIcon,
    },
  ];
};

export const CONFIG: Record<
  TYPE_USER_ROLES,
  {
    text: string;
    background: string;
    options: (options: { option: string }[]) => ICtaOption[];
  }
> = {
  [ENUM_ROLES.ADVERTISER]: {
    text: "main_page_advertiser.cta",
    background: "/images/assets/mainAdv.png",
    options: ADVERTISER_OPTIONS_LIST,
  },
  [ENUM_ROLES.BLOGGER]: {
    text: "main_page_blogger.cta",
    background: "/images/assets/mainBlogger.png",
    options: BLOGGER_OPTIONS_LIST,
  },
};
