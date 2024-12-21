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
  channel: IChannel;
  owner_id: number;
  created: string;
  status: number;
}

interface IChannel {
  id: string;
  avatar: string;
  name: string;
  platform: platformTypesNum;
}

export interface IAdminChannelInfo {
  description: string;
  category: IOption;
  url: string;
  male: number;
  female: number;
  text_limit: number;
  language: IOption[];
  age: IOption[];
  region: IOption[];
  format: IFormat[];
  grade: number;
  complete: number;
  complaints: number;
  on_hold: number;
  cancel: number;
  not_complete: number;
  in_progress: number;
  tags: string[];
}
