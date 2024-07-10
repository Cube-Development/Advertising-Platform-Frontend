import { IFormat } from "@entities/catalog";
import { IOption } from "@shared/types/common";

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
