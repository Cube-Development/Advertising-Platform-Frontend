import { describe, expect, test } from "vitest";
import { ENUM_PROMOCODE_ERROR } from "../config/promocode";
import { isPromocodeRejected } from "./isPromocodeRejected";

describe("isPromocodeRejected", () => {
  test.each(Object.values(ENUM_PROMOCODE_ERROR))(
    "отказ по известной причине: %s",
    (message) => {
      expect(isPromocodeRejected({ status: 400, data: { message } })).toBe(
        true,
      );
    },
  );

  test.each([
    ["незнакомый текст 400", { status: 400, data: { message: "Limit" } }],
    ["404", { status: 404, data: {} }],
    ["422", { status: 422, data: { detail: [] } }],
  ])("отказ: %s", (_, error) => {
    expect(isPromocodeRejected(error)).toBe(true);
  });

  test.each([
    ["сеть", { status: "FETCH_ERROR", error: "TypeError: Failed to fetch" }],
    ["таймаут", { status: "TIMEOUT_ERROR", error: "AbortError" }],
    ["5xx", { status: 500, data: { message: "Internal Server Error" } }],
    ["401", { status: 401, data: {} }],
    ["429", { status: 429, data: {} }],
    ["пусто", undefined],
    ["null", null],
  ])("не отказ: %s", (_, error) => {
    expect(isPromocodeRejected(error)).toBe(false);
  });
});
