import { SortUpIcon } from "@shared/assets";

export enum sortingFilter {
  dateUp = "dateUp",
  dateDown = "dateDown",
  subsUp = "subsUp",
  subsDown = "subsDown",
}

export const sortingTypes = [
  {
    name: "sorting.date",
    type: sortingFilter.dateUp,
    img: SortUpIcon,
    sort: 0,
  },
  {
    name: "sorting.date",
    type: sortingFilter.dateDown,
    img: SortUpIcon,
    sort: 1,
  },
  {
    name: "sorting.subscribers",
    type: sortingFilter.subsUp,
    img: SortUpIcon,
    sort: 2,
  },
  {
    name: "sorting.subscribers",
    type: sortingFilter.subsDown,
    img: SortUpIcon,
    sort: 3,
  },
];

export const sortToIcon: { [key: number]: () => JSX.Element } = {
  0: SortUpIcon,
  1: SortUpIcon,
  2: SortUpIcon,
  3: SortUpIcon,
};
