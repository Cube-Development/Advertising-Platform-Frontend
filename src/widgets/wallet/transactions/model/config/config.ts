import { paymentTypes } from "@entities/wallet";
import { ITopUpCardType } from "./types";
import payme from "/images/payment/payme.svg";
import click from "/images/payment/click.svg";

export const TOP_UP_CARD_TYPES: ITopUpCardType[] = [
  {
    type: paymentTypes.payme,
    img: payme,
  },
  {
    type: paymentTypes.click,
    img: click,
  },
];
