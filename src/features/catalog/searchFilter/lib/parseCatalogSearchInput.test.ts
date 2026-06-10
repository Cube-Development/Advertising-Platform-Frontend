import { describe, test, expect } from "vitest";
import {
  parseCatalogSearchInput,
  formatSearchDisplay,
} from "./parseCatalogSearchInput";

const FULL_URL_LIST = `https://t.me/davletovuz
https://t.me/burgutuzb
https://t.me/r kusherbayev
https://t.me/Davron Fayziev
https://t.me/fayzboguz
https://t.me/nurbekalimov
https://t.me/muhrim
https://t.me/makarenko channel
https://t.me/segmentuz
https://t.me/generalissimo marshal
https://t.me/hokim yordamchilar
https://t.me/the bakiroo
https://t.me/uzbekvideo
https://t.me/TYUZBEK
https://t.me/uzbekistanofficial
https://t.me/MILITSIYA UZB
https://t.me/tezkor24official
https://t.me/xabarlar
https://t.me/axborotofficial
https://t.me/Vachach 
https://t.me/UnchaMuncha
https://t.me/Xabarlar24official
https://t.me/YOL YOLAKAY
https://t.me/BugungiGap
https://t.me/Tezkorxabar official
https://t.me/BORGAPUZ
https://t.me/tezkorozbekiston
https://t.me/Jx uzb`;

const EXPECTED_URLS = [
  "https://t.me/davletovuz",
  "https://t.me/burgutuzb",
  "https://t.me/r kusherbayev",
  "https://t.me/Davron Fayziev",
  "https://t.me/fayzboguz",
  "https://t.me/nurbekalimov",
  "https://t.me/muhrim",
  "https://t.me/makarenko channel",
  "https://t.me/segmentuz",
  "https://t.me/generalissimo marshal",
  "https://t.me/hokim yordamchilar",
  "https://t.me/the bakiroo",
  "https://t.me/uzbekvideo",
  "https://t.me/TYUZBEK",
  "https://t.me/uzbekistanofficial",
  "https://t.me/MILITSIYA UZB",
  "https://t.me/tezkor24official",
  "https://t.me/xabarlar",
  "https://t.me/axborotofficial",
  "https://t.me/Vachach",
  "https://t.me/UnchaMuncha",
  "https://t.me/Xabarlar24official",
  "https://t.me/YOL YOLAKAY",
  "https://t.me/BugungiGap",
  "https://t.me/Tezkorxabar official",
  "https://t.me/BORGAPUZ",
  "https://t.me/tezkorozbekiston",
  "https://t.me/Jx uzb",
];

describe("parseCatalogSearchInput", () => {
  test("возвращает null для пустого ввода", () => {
    expect(parseCatalogSearchInput("")).toBeNull();
    expect(parseCatalogSearchInput("   ")).toBeNull();
  });

  test("обычный текст без триггеров остаётся строкой", () => {
    expect(parseCatalogSearchInput("новости узбекистан")).toBe(
      "новости узбекистан",
    );
  });

  test("парсит полный список t.me URL построчно", () => {
    expect(parseCatalogSearchInput(FULL_URL_LIST)).toEqual(EXPECTED_URLS);
  });

  test("парсит список URL в одну строку (как после paste в input)", () => {
    const singleLine = FULL_URL_LIST.replace(/\n/g, " ");
    expect(parseCatalogSearchInput(singleLine)).toEqual(EXPECTED_URLS);
  });

  test("одиночный URL возвращает массив", () => {
    expect(parseCatalogSearchInput("https://t.me/davletovuz")).toEqual([
      "https://t.me/davletovuz",
    ]);
  });

  test("парсит нумерованный список @username", () => {
    const input = `1. @tyuzbek
2. @kduzb
20. @jx_uzb`;

    expect(parseCatalogSearchInput(input)).toEqual([
      "tyuzbek",
      "kduzb",
      "jx_uzb",
    ]);
  });

  test("парсит @username в одну строку", () => {
    expect(
      parseCatalogSearchInput("1. @tyuzbek 2. @kduzb 20. @jx_uzb"),
    ).toEqual(["tyuzbek", "kduzb", "jx_uzb"]);
  });

  test("одиночный @username возвращает массив", () => {
    expect(parseCatalogSearchInput("@tyuzbek")).toEqual(["tyuzbek"]);
  });

  test("fallback на строку если триггер есть но ничего не распарсилось", () => {
    expect(parseCatalogSearchInput("@ invalid line")).toBe("@ invalid line");
  });
});

describe("formatSearchDisplay", () => {
  test("возвращает пустую строку для undefined", () => {
    expect(formatSearchDisplay(undefined)).toBe("");
  });

  test("возвращает строку как есть", () => {
    expect(formatSearchDisplay("новости")).toBe("новости");
  });

  test("форматирует массив URL и username", () => {
    expect(formatSearchDisplay(["https://t.me/foo", "jx_uzb"])).toBe(
      "https://t.me/foo\n@jx_uzb",
    );
  });
});
