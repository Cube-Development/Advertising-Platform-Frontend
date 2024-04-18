import { SortUpIcon, TelegramIcon } from "@shared/assets";

export enum platformData {
  platform = "platform",
  link = "link",
  category = "category",
  age = "age",
  language = "language",
  region = "region",
  format = "format",
  business = "business",
}

export enum filterData {
  platform = "platform",
  sort = "sort",
}

export enum networkFilter {
  telegram = "telegram",
  instagram = "instagram",
  youtube = "youtube",
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

export const platformToIcon: { [key: number]: () => JSX.Element } = {
  0: TelegramIcon,
  1: TelegramIcon,
  2: TelegramIcon,
};

export const sortToIcon: { [key: number]: () => JSX.Element } = {
  0: SortUpIcon,
  1: SortUpIcon,
  2: SortUpIcon,
  3: SortUpIcon,
  4: SortUpIcon,
  5: SortUpIcon,
  6: SortUpIcon,
  7: SortUpIcon,
  8: SortUpIcon,
  9: SortUpIcon,
};

export const networkTypes = [
  {
    name: "filter.telegram",
    id: 1,
    type: networkFilter.telegram,
    img: TelegramIcon,
  },
  {
    name: "filter.instagram",
    id: 3,
    type: networkFilter.instagram,
    img: TelegramIcon,
  },
  {
    name: "filter.youtube",
    id: 2,
    type: networkFilter.youtube,
    img: TelegramIcon,
  },
];

export const sortingTypes = [
  {
    name: "sorting.views",
    type: sortingFilter.views_down,
    img: SortUpIcon,
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
    img: SortUpIcon,
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
    img: SortUpIcon,
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
    img: SortUpIcon,
    id: 6,
  },
  {
    name: "sorting.er",
    type: sortingFilter.er,
    img: SortUpIcon,
    id: 7,
  },
  {
    name: "sorting.match",
    type: sortingFilter.match,
    img: SortUpIcon,
    id: 8,
  },
  {
    name: "sorting.rate",
    type: sortingFilter.rate,
    img: SortUpIcon,
    id: 9,
  },
];
