import { InstagramIcon, SortUpIcon, TelegramIcon } from "@shared/assets";

export enum platformData {
  platform = "platform",
  link = "link",
  category = "category",
  age = "age",
  languages = "languages",
  region = "region",
  format = "format",
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
  dateUp = "dateUp",
  dateDown = "dateDown",
  subsUp = "subsUp",
  subsDown = "subsDown",
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
};

export const networkTypes = [
  {
    name: "filter.telegram",
    id: 0,
    type: networkFilter.telegram,
    img: TelegramIcon,
  },
  {
    name: "filter.instagram",
    id: 1,
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
    name: "sorting.date",
    type: sortingFilter.dateUp,
    img: SortUpIcon,
    id: 0,
  },
  {
    name: "sorting.date",
    type: sortingFilter.dateDown,
    img: SortUpIcon,
    id: 1,
  },
  {
    name: "sorting.subscribers",
    type: sortingFilter.subsUp,
    img: SortUpIcon,
    id: 2,
  },
  {
    name: "sorting.subscribers",
    type: sortingFilter.subsDown,
    img: SortUpIcon,
    id: 3,
  },
];
