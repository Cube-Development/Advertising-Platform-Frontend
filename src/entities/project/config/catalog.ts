import {
  ChromeIcon,
  InstagramIcon,
  SortDownIcon,
  SortUpIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@shared/assets";
import { ENUM_CHANNEL_TAG, IChannelTag } from "../types";

export enum CATALOG_FILTER {
  PARAMETERS = "parameters",
  AI = "AI",
}

export const CATALOG_FILTER_TABS_LIST = [
  {
    name: "catalog.search.parameters",
    type: CATALOG_FILTER.PARAMETERS,
  },
  {
    name: "catalog.search.AI",
    type: CATALOG_FILTER.AI,
  },
];

export const enum CART {
  commission = 5,
}

export const enum DEBOUNCE {
  sex = 500,
  search = 500,
  readMessage = 500,
  sidebarHover = 500,
}

export enum sortingFilter {
  price_down = "price_down",
  price_up = "price_up",
  subscribers_down = "subscribers_down",
  subscribers_up = "subscribers_up",
  views_down = "views_down",
  views_up = "views_up",
  cpv = "cpv",
  er = "er",
  match = "match",
  rate = "rate",
}

export const CHANNEL_TAGS = [
  ENUM_CHANNEL_TAG.CREDIT,
  ENUM_CHANNEL_TAG.BNPL,
  ENUM_CHANNEL_TAG.REPOST,
] as const;

export const CHANNEL_TAG_I18N: Record<ENUM_CHANNEL_TAG, string> = {
  [ENUM_CHANNEL_TAG.CREDIT]: "catalog.tags.credit",
  [ENUM_CHANNEL_TAG.BNPL]: "catalog.tags.bnpl",
  [ENUM_CHANNEL_TAG.REPOST]: "catalog.tags.repost",
};

const isChannelTagAllowed = (
  tags: IChannelTag[] | undefined,
  tag: ENUM_CHANNEL_TAG,
): boolean => tags?.find((item) => item.tag === tag)?.state !== true;

export const getChannelTagView = (
  tags?: IChannelTag[],
): { tag: ENUM_CHANNEL_TAG; allowed: boolean }[] =>
  CHANNEL_TAGS.map((tag) => ({
    tag,
    allowed: isChannelTagAllowed(tags, tag),
  }));

export const getChannelTagsSelection = (
  tags?: IChannelTag[],
): ENUM_CHANNEL_TAG[] =>
  CHANNEL_TAGS.filter((tag) => isChannelTagAllowed(tags, tag));

export const toChannelTagsPayload = (
  selected: ENUM_CHANNEL_TAG[],
): ENUM_CHANNEL_TAG[] =>
  CHANNEL_TAGS.filter((tag) => !selected.includes(tag));

export const platformToIcon: any = {
  1: TelegramIcon,
  2: YouTubeIcon,
  3: InstagramIcon,
  4: ChromeIcon,
};

export const sortingTypes = [
  {
    name: "sorting.match",
    type: sortingFilter.match,
    img: SortDownIcon,
    id: 8,
  },
  {
    name: "sorting.views",
    type: sortingFilter.views_down,
    img: SortDownIcon,
    id: 0,
  },
  {
    name: "sorting.views",
    type: sortingFilter.views_up,
    img: SortUpIcon,
    id: 1,
  },
  {
    name: "sorting.subscribers",
    type: sortingFilter.subscribers_down,
    img: SortDownIcon,
    id: 2,
  },
  {
    name: "sorting.subscribers",
    type: sortingFilter.subscribers_up,
    img: SortUpIcon,
    id: 3,
  },
  {
    name: "sorting.price",
    type: sortingFilter.price_down,
    img: SortDownIcon,
    id: 4,
  },
  {
    name: "sorting.price",
    type: sortingFilter.price_up,
    img: SortUpIcon,
    id: 5,
  },
  {
    name: "sorting.cpv",
    type: sortingFilter.cpv,
    img: SortDownIcon,
    id: 6,
  },
  {
    name: "sorting.er",
    type: sortingFilter.er,
    img: SortDownIcon,
    id: 7,
  },
  {
    name: "sorting.rate",
    type: sortingFilter.rate,
    img: SortDownIcon,
    id: 9,
  },
];
