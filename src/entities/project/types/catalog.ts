import { platformTypesNum } from "@entities/platform";
import { pageFilter } from "@shared/routing";
import { FC } from "react";

export interface ICatalogCards extends IChangeCards {
  page: number;
  elements: number;
  channels: ICatalogChannel[];
}

export interface ICatalogChannel {
  id: string;
  match: number;
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
}

interface Components {
  FormatList: FC<IFormatListProps>;
  changeCard?: () => void;
  page?: pageFilter.cart;
  card: ICatalogChannel;
}

export interface IAddToBasketProps extends IFormatListProps, Components {}

export interface ICatalogCard extends IChangeCards, Components {
  AddToBasketBtn: FC<IAddToBasketProps>;
}
