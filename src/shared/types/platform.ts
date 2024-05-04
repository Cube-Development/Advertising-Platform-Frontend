import { pageFilter } from "@shared/config/pageFilter";
import {
  platformTypesStr,
  platformTypesNum,
} from "@shared/config/platformTypes";
import { ButtonHTMLAttributes, FC } from "react";
import { IOption } from "./common";

export interface IAddChannelIdentification {
  platform: platformTypesNum;
  url: string;
  verification_code: number;
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

export interface IReadChannelData {
  id: string;
  name: string;
  url: string;
  avatar: string;
  platform: number;
  male: number;
  female: number;
  category: IOption;
  description: string;
  text_limit: number;
  region: IOption[];
  language: IOption[];
  age: IOption[];
  format: IFormat[];
}

export interface IEditChannelData {
  channel_id: string;
  male: number;
  female: number;
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

export interface IFormatPriceProps extends IChannelFormat {
  onChange: (format: IAddFormat) => void;
  defaultValue?: number;
}

export interface IChannelFormat {
  id: number;
  small: string;
  big: string;
}

export interface IAddPlatformBlur {
  link: boolean;
  parameters: boolean;
}

export interface IPlatform {
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

export interface IAddCart {
  channel_id: string;
  format: number;
}

export interface IToCart {
  channel: IAddCart;
  format: IFormat;
}

export interface IChangeCards {
  onChangeCard: (cart: IPlatform) => void;
}

export interface ICatalogCards extends IChangeCards {
  page: number;
  elements: number;
  channels: IPlatform[];
}

export interface IFormatListProps {
  selectedFormat: IFormat;
  changeFormat: (selectedValue: IFormat) => void;
  card: IPlatform;
}

interface Components {
  FormatList: FC<IFormatListProps>;
  changeCard?: () => void;
  page?: pageFilter.cart;
  card: IPlatform;
}

export interface IAddToBasketProps extends IFormatListProps, Components {}

export interface ICatalogCard extends IChangeCards, Components {
  AddToBasketBtn: FC<IAddToBasketProps>;
}

export interface IPlatformLink {
  name: string;
  type: platformTypesStr;
  default_value: string;
  id: platformTypesNum;
}

export interface ICreateOrderBlur {
  post: boolean;
  datetime: boolean;
  payment: boolean;
}

export interface IAddChannelQuery {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  path: string;
}
