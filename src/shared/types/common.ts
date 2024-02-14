export interface ILogin {
    (vision: boolean, data?: { name: string; email: string }): void;
  }
  


export interface IMenuItems {
  item: IMenuItem;
  subItems?: IMenuSubItem[];
}

interface IMenuItem{
  title: string;
  img?: React.FC;
  path?: string;
}

interface IMenuSubItem{
  title: string;
  path: string;
}

export interface ITypeFilter{
  name: string;
  type: string;
}


export interface IStartProjectProps {
  isZeroProject: boolean;
}


export interface IItemCard {
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
  channels_list: ISubitemCard[]
}

export interface IDevItemCard {
  id: number
  name: string
  date: string
  tarif: number
  cost: number
  status: number
}


export interface ISubitemCard {
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