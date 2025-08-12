import { IOption } from "@shared/types";

export interface IParameterOption extends IOption {
  multiplier: number;
  count?: number;
}

export interface IProfitCalculator {
  category: IParameterOption;
  platform: IParameterOption;
  format: IParameterOption;
  subscribers: number;
  posts_count: IParameterOption;
}
