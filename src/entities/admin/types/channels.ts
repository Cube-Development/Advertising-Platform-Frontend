import { platformTypesNum } from "@entities/platform";
import { IFormat } from "@entities/project";
import { IOption } from "@shared/types";

export interface IAdminChannels {
  page: number;
  elements: number;
  channels: IAdminChannelData[];
  isLast?: boolean;
}

export interface IAdminChannelData {
  id: string;
  avatar: string;
  name: string;
  userId: string;
  platform: platformTypesNum;
  date: string;
  status: number;
  url: string;
  male: number;
  female: number;
  category: number;
  description: string;
  text_limit: number;
  region: IOption[];
  language: IOption[];
  age: IOption[];
  format: IFormat[];
  subscribers: number;
  rate: number;
  complete: number;
  complaints: number;
  on_hold: number;
  cancel: number;
  not_complete: number;
  in_progress: number;
}

export interface IAdminChannelInfo {}
