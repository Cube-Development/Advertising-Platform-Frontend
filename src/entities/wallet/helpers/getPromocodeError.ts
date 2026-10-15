import {
  ENUM_PROMOCODE_ERROR,
  PROMOCODE_ERROR_DEFAULT,
  PROMOCODE_ERROR_LIST,
} from "../config/promocode";

interface IPromocodeError {
  /** Ключ перевода для toast */
  key: string;
  /** Минимальная сумма — только для ENUM_PROMOCODE_ERROR.MIN_AMOUNT */
  amount?: string;
}

/** Сообщение бэкенда → ключ перевода; неизвестный текст — общая ошибка */
export const getPromocodeError = (message?: string | null): IPromocodeError => {
  const error = Object.values(ENUM_PROMOCODE_ERROR).find((value) =>
    message?.startsWith(value),
  );

  if (!error) return { key: PROMOCODE_ERROR_DEFAULT };

  if (error === ENUM_PROMOCODE_ERROR.MIN_AMOUNT) {
    const amount = Number(message?.slice(error.length).trim());
    return {
      key: PROMOCODE_ERROR_LIST[error],
      amount: Number.isFinite(amount) ? amount.toLocaleString() : undefined,
    };
  }

  return { key: PROMOCODE_ERROR_LIST[error] };
};
