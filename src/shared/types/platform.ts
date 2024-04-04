import { platformFilter } from "@shared/config/postFilter";
import exp from "constants";
import { FC } from "react";

export interface IPlatform {
  id: string;
  name: string;
  description: string;
  rate: number;
  category: string;
  avatar: string;
  format: IFormat[];
  subscribers: number;
  male: number;
  female: number;
  platform: number;
}

export interface IFormat {
  format: number;
  price: number;
  views: number;
  er: number;
  cpv: number;
}

export interface IAddCart {
  channel_id: string;
  format: number;
}

export interface IToCart {
  channel: IAddCart;
  format: IFormat;
}

export interface IChangeCards {
  onChangeCard: (cart: IToCart) => void;
}

export interface ICatalogCards extends IChangeCards {
  cards: IPlatform[];
}

export interface IFormatListProps {
  formats: IFormat[];
  selectedFormat: IFormat;
  changeFormat: (selectedValue: IFormat) => void;
}

interface Components {
  FormatList: FC<IFormatListProps>;
  сhangeCard?: () => void;
  isCart?: boolean;
}

export interface IAddToBasketProps extends IFormatListProps, Components {
  // selectedFormat: IFormat;
  // formats: IFormat[];
  // changeFormat: (selectedValue: IFormat) => void;
  // AddToBasketBtn?: FC<IAddToBasketProps>;
  // FormatList: FC<IFormatListProps>;
  // onChangeCard?: () => void
  // isCart?: boolean
}

export interface ICatalogCard extends IChangeCards, Components {
  AddToBasketBtn: FC<IAddToBasketProps>;
}

export interface IPlatformLink {
  name: string;
  type: platformFilter;
  default_value: string;
  id: number;
}

export interface IAddPlatformBlur {
  link: boolean;
  parameters: boolean;
}

export interface ICreateOrderBlur {
  post: boolean;
  datetime: boolean;
  payment: boolean;
}
