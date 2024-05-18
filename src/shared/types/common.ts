import { SVGProps } from "react";
import { IProfileData } from "./profile";
import { ISelectOption } from "./translate";

export interface ILogin {
  (vision: boolean, data?: { name: string; email: string }): void;
}

export interface IMenuItems {
  item: IMenuItem;
  onChange: () => void;
  openTitle: string;
  // toggleMenu?: () => void;
  // chapter?: string;
  // changeCharper: (title: string, haveSubitems: boolean) => void;
}

export interface IMenuItem {
  item: IMenuItemParams;
  subItems?: IMenuItemParams[];
}

interface IMenuItemParams {
  title?: string;
  img?: React.FC<SVGProps<SVGSVGElement>>;
  path?: string;
  openMenu?: boolean;
}

export interface ITypeFilter {
  name: string;
  type: string;
}

export interface IStartProjectProps {
  listLength: boolean;
}

export interface IAddPLatformData {
  category: number[];
  languages: number[];
  region: number[];
  male: number;
  female: number;
  age: number[];
  description: string;
  text_limit: number;
}

export interface IAdvDevProjectCard {
  id: number;
  name: string;
  date: string;
  tarif: number;
  cost: number;
  status: number;
}

export interface IChannelChat {
  id: number;
}

export interface IOption {
  id: number;
  name: string;
  img?: () => JSX.Element;
  type?: string;
}

export interface IOptions {
  category: IOption[];
  languages: IOption[];
  region: IOption[];
  sex?: IOption[];
  age: IOption[];
}

export interface IAccomm {
  accomm: string;
}

export interface IBlockData {
  title: string;
  parameters: IRowData[];
}

export interface IRowData {
  label: string;
  type: keyof IProfileData;
  validate: {
    required: string;
  };
}

export interface IParameterData {
  title: string;
  default_value?: string;
  description: string;
}

export interface IFilter extends ISelectOption {
  types: IOption[];
}
