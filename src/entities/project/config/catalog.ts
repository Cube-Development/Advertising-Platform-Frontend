import { SortDownIcon, SortUpIcon, TelegramIcon } from "@shared/assets";

export enum catalogBarFilter {
  parameters = "parameters",
  AI = "AI",
}

export const catalogTypes = [
  {
    name: "catalog.search.parameters",
    type: catalogBarFilter.parameters,
  },
  {
    name: "catalog.search.AI",
    type: catalogBarFilter.AI,
  },
];

export const enum CART {
  commission = 3,
}

export const enum DEBOUNCE {
  sex = 500,
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

export const sortingTypes = [
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
    name: "sorting.match",
    type: sortingFilter.match,
    img: SortDownIcon,
    id: 8,
  },
  {
    name: "sorting.rate",
    type: sortingFilter.rate,
    img: SortDownIcon,
    id: 9,
  },
];
