import { platformTypesNum } from "@entities/platform";
import { ButtonHTMLAttributes } from "react";

export interface IAddChannelData {
  insertion_code?: string;
  category: number;
  language: number[];
  region: number[];
  male: number;
  female: number;
  description: string;
  text_limit: number;
  age: number[];
  format: IAddFormat[];
}

export interface IAddChannelIdentification {
  platform: platformTypesNum;
  url: string;
  verification_code: number;
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

export interface IAddChannelQuery {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  path: string;
}
