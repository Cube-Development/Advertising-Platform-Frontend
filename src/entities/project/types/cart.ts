import { ICatalogChannel } from "./catalog";

export interface ICart {
  count: number;
  coverage: number;
  amount: number;
  subscribers: number;
  channels: ICatalogChannel[];
}
