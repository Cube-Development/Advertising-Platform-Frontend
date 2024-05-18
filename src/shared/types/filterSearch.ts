import { platformTypesNum } from "@shared/config/platformTypes";
import { IOption } from "./common";

export interface IFilterSearch {
  platform: platformTypesNum;
  business: IOption[];
  age: IOption[];
  language: IOption[];
  region: IOption[];
  male: number;
  female: number;
}
