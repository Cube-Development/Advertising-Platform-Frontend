import { ICatalogChannel } from "./catalog";

export interface ICart {
  count: number;
  coverage: number;
  amount: number;
  channels: ICatalogChannel[];
}
