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

export interface IFormatListProps {
  selectedFormat: IFormat;
  formats: IFormat[];
  changeFormat: (selectedValue: IFormat) => void;
}

export interface IAddToBasketProps {
  selectedFormat: IFormat;
  formats: IFormat[];
  FormatList: FC<IFormatListProps>;
  changeFormat: (selectedValue: IFormat) => void;
}
