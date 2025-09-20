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
  subscribers: number;
  order_completed_count: number;
  published_posts: number;
  rate: number;
  common_count: number;
  rating_type: IRatingType[];
  selected_format?: IFormat;
}

export interface IRatingType {
  type: ratingData;
  count: number;
}
