import { paymentTypes } from "@entities/wallet";

export interface ITopUpCardType {
  type: paymentTypes;
  img: string;
}
