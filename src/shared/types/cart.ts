import { IPlatform } from "./platform";

export interface ICart {
  count: number;
  coverage: number;
  amount: number;
  channels: IPlatform[];
}
