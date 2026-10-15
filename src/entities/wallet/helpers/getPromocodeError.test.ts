import { describe, expect, test } from "vitest";
import {
  ENUM_PROMOCODE_ERROR,
  PROMOCODE_ERROR_DEFAULT,
  PROMOCODE_ERROR_LIST,
} from "../config/promocode";
import { getPromocodeError } from "./getPromocodeError";

describe("getPromocodeError", () => {
  test("мапит каждый текст бэкенда в свой ключ перевода", () => {
    for (const message of [
      ENUM_PROMOCODE_ERROR.NOT_FOUND,
      ENUM_PROMOCODE_ERROR.NOT_ACTIVE,
      ENUM_PROMOCODE_ERROR.EXPIRED,
      ENUM_PROMOCODE_ERROR.EXHAUSTED,
    ]) {
      expect(getPromocodeError(message)).toEqual({
        key: PROMOCODE_ERROR_LIST[message],
      });
    }
  });

  test("достаёт минимальную сумму из конца сообщения", () => {
    expect(
      getPromocodeError("Promocode is available from amount 500000.0"),
    ).toEqual({
      key: PROMOCODE_ERROR_LIST[ENUM_PROMOCODE_ERROR.MIN_AMOUNT],
      amount: (500000).toLocaleString(),
    });
  });

  test("неизвестный текст и пустое сообщение — общая ошибка", () => {
    expect(getPromocodeError("Project already paid")).toEqual({
      key: PROMOCODE_ERROR_DEFAULT,
    });
    expect(getPromocodeError(undefined)).toEqual({
      key: PROMOCODE_ERROR_DEFAULT,
    });
  });
});
