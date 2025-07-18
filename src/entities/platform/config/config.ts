import {
  ChromeIcon,
  InstagramIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@shared/assets";

export enum dateSortingTypes {
  increase = "increase",
  decrease = "decrease",
}

export enum platformTypesStr {
  telegram = "telegram",
  instagram = "instagram",
  youtube = "youtube",
  site = "site",
}

export enum platformTypesNum {
  telegram = 1,
  instagram = 3,
  youtube = 2,
  site = 4,
}

export enum PostTypesNum {
  FullHd_horizontal = 1,
  FullHd_vertical = 2,
  feed = 3,
  default = 4,
  site = 5,
  siteAndTelegram = 6,
  siteAndInstagram = 7,
}

export enum MatchTypesNum {
  universal = 1,
  unique = 2,
}

export const platformTypes = [
  {
    name: "filter.telegram",
    id: platformTypesNum.telegram,
    type: platformTypesStr.telegram,
    img: TelegramIcon,
    default_value: "platform_types.telegram.default_value",
    post_types: [
      {
        id: PostTypesNum.default,
        name: "create_order.create.post_types.telegram.default",
      },
    ],
  },
  {
    name: "filter.instagram",
    id: platformTypesNum.instagram,
    type: platformTypesStr.instagram,
    img: InstagramIcon,
    default_value: "platform_types.instagram.default_value",
    post_types: [
      {
        id: PostTypesNum.FullHd_vertical,
        name: "create_order.create.post_types.instagram.stories",
      },
      {
        id: PostTypesNum.feed,
        name: "create_order.create.post_types.instagram.feed",
      },
    ],
  },
  {
    name: "filter.youtube",
    id: platformTypesNum.youtube,
    type: platformTypesStr.youtube,
    img: YouTubeIcon,
    default_value: "platform_types.youtube.default_value",
    post_types: [
      {
        id: PostTypesNum.FullHd_horizontal,
        name: "create_order.create.post_types.youtube.videos",
      },
      {
        id: PostTypesNum.FullHd_vertical,
        name: "create_order.create.post_types.youtube.shorts",
      },
    ],
  },
  {
    name: "filter.site",
    id: platformTypesNum.site,
    type: platformTypesStr.site,
    img: ChromeIcon,
    default_value: "platform_types.site.default_value",
    post_types: [
      {
        id: PostTypesNum.site,
        name: "create_order.create.post_types.site.default",
      },
      {
        id: PostTypesNum.siteAndTelegram,
        name: "create_order.create.post_types.site.telegram",
      },
      {
        id: PostTypesNum.siteAndInstagram,
        name: "create_order.create.post_types.site.instagram",
      },
    ],
  },
];
