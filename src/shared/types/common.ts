export interface ILogin {
    (vision: boolean, data?: { name: string; email: string }): void;
  }
  

export interface IMenuItems {
  item: IMenuItem;
  toggleMenu?: ()=> void;
  chapter?: string;
  changeCharper: (title: string, haveSubitems: boolean) => void
}

interface IMenuItem{
  item: IMenuItemParams;
  subItems?: IMenuItemParams[];
}

interface IMenuItemParams{
  title: string;
  img?: React.FC;
  path?: string;
}


export interface ITypeFilter{
  name: string;
  type: string;
}


export interface IStartProjectProps {
  isZeroProject: boolean;
}


export interface IAdvProjectCard {
  id: number
  name?: string
  date: string
  channels: number
  views: number
  cost: number
  complite: number
  cancel: number
  wait: number
  start: number
  consideration: number
  status: number
  channels_list: IAdvProjectSubcard[]
}

export interface IAdvDevProjectCard {
  id: number
  name: string
  date: string
  tarif: number
  cost: number
  status: number
}


export interface IAdvProjectSubcard {
  img: string
  name: string
  category: string
  date_from: string
  date_to: string
  accommodation: string
  time_from: string
  time_to: string
  price: number
  subs: number
  views: number
  ER: number
  CPV: number
  sex: number
  status: number
}


export interface IChannelChat {
  id: number
}


export interface IBloggerPlatformCard {
  id: number
  img: string
  name: string
  author?: boolean
  verified?: boolean
  partner?: boolean
  date_event?: string
  date?: string
  category: string
  offers?: number
  complite?: number
  cancel?: number
  wait?: number
  start?: number
  status: number
}


// export interface IBloggerModPlatformCard {
//   id: number
//   img: string
//   name: string
//   date: string
//   category: string
//   status: number
// }


export interface IBloggerOfferCard {
  id: number
  img: string
  name: string
  category: string
  date: string
  date_from: string
  date_to: string
  accommodation: string
  time_from: string
  time_to: string
  price: number
  status: number
}



export interface IOption {
  label: string;
  value: string;
}

export interface IOptions {
  category: IOption[];
  languages: IOption[];
  region: IOption[];
  sex: IOption[];
  age: IOption[];
}


export interface IAccomm{
  accomm: string
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

export interface IBlockData{
    title: string;
    parameters: IRowData[]
}

export interface IRowData {
  data: string,
  type: keyof IAddProfileData; 
}

export interface IParameterData{
  title: string;
  default_value?: string;
  text: string;
}

export interface IAddProfileData {
  type_legal: number;
  name: string;
  address: string;
  INN: number;
  checking_account: string;
  bank_name: string;
  bank_mfo: number;
  phone: string;
  email: string;
  PNFL: number;
  registration_number: number;
  registration_date: string;
  transit_account: string;
  card_number: number;
  card_date_year: number;
  card_date_month: number;
}
