import { desireStatus } from "../config";

export interface IChangeOrder {
  order_id: string;
  desire: desireStatus;
  comment: string;
}
