import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Мокаем barrel-импорт, чтобы не тянуть react-pdf через цепочку зависимостей
vi.mock("@entities/communication", () => ({
  DAY_OF_WEEK: { Ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"] },
}));

import { CheckDate } from "./checkDate";

/**
 * Хелпер: устанавливает фейковое "сейчас" в таймзоне Asia/Tashkent (UTC+5).
 * Vitest fake timers перехватывают Date, поэтому toLocaleString внутри CheckDate
 * вернёт время на основе этого фейкового момента.
 *
 * @param tashkentISO — строка вида "2026-05-06T20:00:00" (локальное время Ташкента)
 */
function setTashkentNow(tashkentISO: string) {
  // Ташкент = UTC+5, значит UTC = localTashkent - 5h
  const utcMs = new Date(tashkentISO + "+05:00").getTime();
  vi.setSystemTime(utcMs);
}

describe("CheckDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ─── Диапазон дат (основной фикс) ───────────────────────────

  describe("Диапазон дат date_from – date_to", () => {
    it("true — текущая дата внутри диапазона (середина)", () => {
      // Диапазон: 06.05 – 08.05, время 08:00–21:10
      // Сейчас: 07.05 15:00 — попадает
      setTashkentNow("2026-05-07T15:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(true);
    });

    it("true — текущая дата = date_from, время в пределах окна", () => {
      // Сейчас: 06.05 10:00 — первый день, внутри time_from–time_to
      setTashkentNow("2026-05-06T10:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(true);
    });

    it("true — текущая дата = date_to, время в пределах окна", () => {
      // Сейчас: 08.05 20:00 — последний день, внутри time
      setTashkentNow("2026-05-08T20:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(true);
    });

    it("false — текущая дата до date_from", () => {
      // Сейчас: 05.05 15:00 — до начала диапазона
      setTashkentNow("2026-05-05T15:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(false);
    });

    it("false — текущая дата после date_to", () => {
      // Сейчас: 09.05 10:00 — после диапазона
      setTashkentNow("2026-05-09T10:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(false);
    });
  });

  // ─── Временные границы ───────────────────────────────────────

  describe("Временные границы (time_from / time_to)", () => {
    it("false — в первый день, до time_from", () => {
      // Сейчас: 06.05 07:59 — раньше чем 08:00
      setTashkentNow("2026-05-06T07:59:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(false);
    });

    it("true — ровно на time_from в первый день", () => {
      setTashkentNow("2026-05-06T08:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(true);
    });

    it("true — ровно на time_to в последний день (без offset)", () => {
      setTashkentNow("2026-05-08T21:10:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(true);
    });

    it("false — после time_to в последний день (без offset)", () => {
      setTashkentNow("2026-05-08T21:11:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(false);
    });
  });

  // ─── Offset ──────────────────────────────────────────────────

  describe("offsetMinutes", () => {
    it("true — в пределах offset после time_to", () => {
      // time_to = 21:10, offset = 30 → граница = 21:40
      // Сейчас: 08.05 21:30 — попадает
      setTashkentNow("2026-05-08T21:30:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10", 30)).toBe(true);
    });

    it("true — ровно на границе offset", () => {
      setTashkentNow("2026-05-08T21:40:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10", 30)).toBe(true);
    });

    it("false — после offset", () => {
      setTashkentNow("2026-05-08T21:41:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10", 30)).toBe(false);
    });

    it("offset = 0 по умолчанию — граница ровно на time_to", () => {
      setTashkentNow("2026-05-08T21:10:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(true);
      setTashkentNow("2026-05-08T21:11:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10")).toBe(false);
    });
  });

  // ─── Один день (date_from === date_to) ───────────────────────

  describe("Один день (date_from === date_to)", () => {
    it("true — внутри временного окна", () => {
      setTashkentNow("2026-05-06T12:00:00");
      expect(CheckDate("06.05.2026", "06.05.2026", "08:00", "21:10")).toBe(true);
    });

    it("false — до time_from", () => {
      setTashkentNow("2026-05-06T07:00:00");
      expect(CheckDate("06.05.2026", "06.05.2026", "08:00", "21:10")).toBe(false);
    });

    it("false — после time_to", () => {
      setTashkentNow("2026-05-06T22:00:00");
      expect(CheckDate("06.05.2026", "06.05.2026", "08:00", "21:10")).toBe(false);
    });
  });

  // ─── Без time_from / time_to ─────────────────────────────────

  describe("Без time_from / time_to (дефолты 00:00 – 23:59)", () => {
    it("true — начало дня date_from", () => {
      setTashkentNow("2026-05-06T00:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026")).toBe(true);
    });

    it("true — конец дня date_to", () => {
      setTashkentNow("2026-05-08T23:59:00");
      expect(CheckDate("06.05.2026", "08.05.2026")).toBe(true);
    });

    it("false — после 23:59 date_to", () => {
      setTashkentNow("2026-05-09T00:00:00");
      expect(CheckDate("06.05.2026", "08.05.2026")).toBe(false);
    });
  });

  // ─── Невалидный ввод ─────────────────────────────────────────

  describe("Невалидный ввод", () => {
    it("false — date_from некорректный формат", () => {
      setTashkentNow("2026-05-07T12:00:00");
      expect(CheckDate("2026-05-06", "08.05.2026", "08:00", "21:10")).toBe(false);
    });

    it("false — date_to некорректный формат", () => {
      setTashkentNow("2026-05-07T12:00:00");
      expect(CheckDate("06.05.2026", "invalid", "08:00", "21:10")).toBe(false);
    });

    it("false — оба невалидные", () => {
      setTashkentNow("2026-05-07T12:00:00");
      expect(CheckDate("", "", "08:00", "21:10")).toBe(false);
    });
  });

  // ─── Реальный кейс из бага ───────────────────────────────────

  describe("Кейс из бага: 06.05–08.05, время 08:00–21:10, сейчас 06.05 20:07", () => {
    it("true — кнопка SendLink должна быть активна", () => {
      setTashkentNow("2026-05-06T20:07:00");
      expect(CheckDate("06.05.2026", "08.05.2026", "08:00", "21:10", 30)).toBe(true);
    });
  });
});
