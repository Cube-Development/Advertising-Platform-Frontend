/** Тексты ошибок бэкенда (400, поле message) — кодов ошибок у промокода нет */
export enum ENUM_PROMOCODE_ERROR {
  NOT_FOUND = "Promocode not found",
  NOT_ACTIVE = "Promocode is not active",
  EXPIRED = "Promocode is expired",
  EXHAUSTED = "Promocode uses are exhausted",
  // в конце сообщения — минимальная сумма: "Promocode is available from amount 500000.0"
  MIN_AMOUNT = "Promocode is available from amount",
}

export const PROMOCODE_ERROR_LIST: Record<ENUM_PROMOCODE_ERROR, string> = {
  [ENUM_PROMOCODE_ERROR.NOT_FOUND]: "toasts.cart.promocode.not_found",
  [ENUM_PROMOCODE_ERROR.NOT_ACTIVE]: "toasts.cart.promocode.not_active",
  [ENUM_PROMOCODE_ERROR.EXPIRED]: "toasts.cart.promocode.expired",
  [ENUM_PROMOCODE_ERROR.EXHAUSTED]: "toasts.cart.promocode.exhausted",
  [ENUM_PROMOCODE_ERROR.MIN_AMOUNT]: "toasts.cart.promocode.min_amount",
};

export const PROMOCODE_ERROR_DEFAULT = "toasts.cart.promocode.error";
