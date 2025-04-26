import { platformTypesNum } from "@entities/platform";
import { languagesNum } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { FC } from "react";

export interface ITargetAudienceCard {
  category: number[];
  region: number[];
  language: number[];
  age: number[];
  male: number;
  female: number;
}

export interface IThreadData {
  thread_id: string;
  category: number[];
  region: number[];
  language: number[];
  male: number;
  female: number;
  age: number[];
}

export interface ICatalogCards extends IChangeCards {
  page: number;
  elements: number;
  channels: ICatalogChannel[];
  isLast?: boolean;
}

export interface IRecommendCards {
  channels: ICatalogChannel[];
}

export interface ICatalogChannel {
  id: string;
  match?: number;
  name: string;
  description: string;
  rate: number;
  category: string;
  avatar: string;
  subscribers: number;
  male: number;
  female: number;
  format: IFormat[];
  selected_format?: IFormat;
  platform?: platformTypesNum;
  channel_languages: languagesNum[];
}

export interface IFormat {
  format: number;
  format_name: {
    small: string;
    big: string;
  };
  price: number;
  views?: number;
  er?: number;
  cpv?: number;
}

export interface IChangeCards {
  onChangeCard: (cart: ICatalogChannel) => void;
}

export interface IFormatListProps {
  selectedFormat: IFormat;
  changeFormat: (selectedValue: IFormat) => void;
  card: ICatalogChannel;
  isSmall?: boolean;
  isBig?: boolean;
  isSmallCatalogCard?: boolean;
  isChannelPage?: boolean;
}

interface Components {
  FormatList: FC<IFormatListProps>;
  changeCard?: () => void;
  page?: pageFilter.cart;
  card: ICatalogChannel;
}

export interface IAddToBasketProps extends IFormatListProps, Components {
  isSmallCatalogCard?: boolean;
}

export interface ICatalogCard extends IChangeCards, Components {
  AddToBasketBtn: FC<IAddToBasketProps>;
}
