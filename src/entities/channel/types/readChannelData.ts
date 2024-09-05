import { IFormat } from "@entities/project";
import { IOption } from "@shared/types";
import { ratingData } from "../config";

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

export interface IChannelStatistics {
  orders: number;
  subs: number;
  views: number;
  posts: number;
  er: number;
  cpv: number;
}

export interface IChannelRate {
  rate: number;
  count: number;
  rating_type: IRatingType[];
}

export interface IRatingType {
  type: ratingData;
  count: number;
}
