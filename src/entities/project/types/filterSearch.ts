import { platformTypesNum } from "@entities/platform";
import { IOption } from "@shared/types";

export interface IFilterSearch {
  platform: platformTypesNum;
  business: IOption[];
  age: IOption[];
  language: IOption[];
  region: IOption[];
  male: number;
  female: number;
}
