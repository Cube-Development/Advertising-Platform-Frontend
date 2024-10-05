import { InstagramIcon, TelegramIcon, YouTubeIcon } from "@shared/assets";

export enum dateSortingTypes {
  increase = "increase",
  decrease = "decrease",
}

export enum platformTypesStr {
  telegram = "telegram",
  instagram = "instagram",
  youtube = "youtube",
}

export enum platformTypesNum {
  telegram = 1,
  instagram = 3,
  youtube = 2,
}

export enum PostTypesNum {
  FullHd_horizontal = 1,
  FullHd_vertical = 2,
  feed = 3,
  default = 4,
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
];
