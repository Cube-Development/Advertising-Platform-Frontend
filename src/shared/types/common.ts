import { IProfileData } from "./profile";

export interface ILogin {
  (vision: boolean, data?: { name: string; email: string }): void;
}

export interface IMenuItems {
  item: IMenuItem;
  toggleMenu?: () => void;
  chapter?: string;
  changeCharper: (title: string, haveSubitems: boolean) => void;
}

interface IMenuItem {
  item: IMenuItemParams;
  subItems?: IMenuItemParams[];
}

interface IMenuItemParams {
  title: string;
  img?: React.FC;
  path?: string;
}

export interface ITypeFilter {
  name: string;
  type: string;
}

export interface IStartProjectProps {
  isZeroProject: boolean;
}

export interface IAdvProjectCard {
  id: number;
  name?: string;
  date: string;
  channels: number;
  views: number;
  cost: number;
  complite: number;
  cancel: number;
  wait: number;
  start: number;
  consideration: number;
  status: number;
  channels_list: IAdvProjectSubcard[];
}

export interface IAdvDevProjectCard {
  id: number;
  name: string;
  date: string;
  tarif: number;
  cost: number;
  status: number;
}

export interface IAdvProjectSubcard {
  img: string;
  name: string;
  category: string;
  date_from: string;
  date_to: string;
  accommodation: string;
  time_from: string;
  time_to: string;
  price: number;
  subs: number;
  views: number;
  ER: number;
  CPV: number;
  sex: number;
  status: number;
}

export interface IChannelChat {
  id: number;
}

export interface IBloggerPlatformCard {
  id: number;
  img: string;
  name: string;
  author?: boolean;
  verified?: boolean;
  partner?: boolean;
  date_event?: string;
  date?: string;
  category: string;
  offers?: number;
  complite?: number;
  cancel?: number;
  wait?: number;
  start?: number;
  status: number;
}

export interface IBloggerOfferCard {
  id: number;
  img: string;
  name: string;
  category: string;
  date: string;
  date_from: string;
  date_to: string;
  accommodation: string;
  time_from: string;
  time_to: string;
  price: number;
  status: number;
}

export interface IOption {
  id: number;
  name: string;
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
  // error: {
  //   required?: string;
  //   date?: string;
  //   PNFL?: string;
  //   INN?: string;
  //   mfo?: string;
  //   account?: string;
  //   card?: string;
  //   contact?: string;
  //   email?: string;
  // };
}

export interface IFilerData {
  name: string;
  img?: JSX.Element;
  type: string;
  platform?: number;
  sort?: number;
}
