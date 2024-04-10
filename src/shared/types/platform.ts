import {
  platformTypesStr,
  platformTypesNum,
} from "@shared/config/platformTypes";
import { FC } from "react";

export interface IAddChannelIdentification {
  platform: platformTypesNum;
  url: string;
  verification_code: number;
}

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
  selected_format?: number;
  inCart?: boolean;
}

export interface IAddChannelData {
  insertion_code: string;
  male: number;
  female: number;
  category: number;
  description: string;
  text_limit: number;
  region: number[];
  language: number[];
  age: number[];
  format: IAddFormat[];
}

export interface IAddFormat {
  name: number;
  price: number;
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
  inCart?: boolean;
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
  type: platformTypesStr;
  default_value: string;
  id: platformTypesNum;
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

export interface IChannelFormat {
  id: number;
  small: string;
  big: string;
}
