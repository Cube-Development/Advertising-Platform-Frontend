import { createListenerMiddleware } from "@reduxjs/toolkit";
import { IPromocodeState } from "../types/promocode.types";
import { writePromocode } from "./promocodeStorage";

export const promocodeListener = createListenerMiddleware<{
  promocode: IPromocodeState;
}>();

/**
 * Промокод пишется в sessionStorage при каждом изменении:
 * после перезагрузки и возврата с внешней оплаты он на месте
 */
promocodeListener.startListening({
  predicate: (_, currentState, previousState) =>
    currentState.promocode !== previousState.promocode,
  effect: (_, { getState }) => {
    writePromocode(getState().promocode);
  },
});
