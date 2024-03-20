import { TelegramIcon } from "@shared/assets";
import { IFilerData } from "@shared/types/common";

export enum networkFilter {
  telegram = "telegram",
  instagram = "instagram",
  youtube = "youtube",
}

export const networkTypes = [
  {
    name: "filter.telegram",
    img: TelegramIcon,
    type: networkFilter.telegram,
    platform: 0,
  },
  {
    name: "filter.instagram",
    img: TelegramIcon,
    type: networkFilter.instagram,
    platform: 1,
  },
  {
    name: "filter.youtube",
    img: TelegramIcon,
    type: networkFilter.youtube,
    platform: 2,
  },
];

export const platfromToIcon: { [key: number]: () => JSX.Element } = {
  0: TelegramIcon,
  1: TelegramIcon,
  2: TelegramIcon,
};
