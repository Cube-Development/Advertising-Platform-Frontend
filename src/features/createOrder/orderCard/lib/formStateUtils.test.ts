import { describe, it, expect } from "vitest";

import type { ICreateDate, IPostChannel } from "@entities/project";
import {
  buildDatetimeAfterTimeChange,
  buildDatetimeAfterDateChange,
  cleanExpiredDates,
} from "./formStateUtils";

// ─── Хелперы ───────────────────────────────────────────

const formatDate = (d: Date): string =>
  d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const parseDate = (s: string): Date => {
  const [day, month, year] = s.split(".");
  return new Date(`${year}/${month}/${day}`);
};

const makeCard = (
  id: string,
  platform: number = 1,
): IPostChannel => ({
  id,
  avatar: "",
  name: "",
  category: "",
  platform,
  post_type: 1 as any,
  channel_url: "",
});

// ─── Тесты ────────────────────────────────────────────

describe("buildDatetimeAfterTimeChange", () => {
  it("сохраняет время в ордер текущей карточки", () => {
    const card = makeCard("order-1");
    const datetime: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026" },
      ],
    };

    const result = buildDatetimeAfterTimeChange(
      datetime,
      card,
      [card],
      ["19:00", "21:00"],
    );

    const order = result.orders.find((o) => o.order_id === "order-1");
    expect(order?.time_from).toBe("19:00");
    expect(order?.time_to).toBe("21:00");
    expect(order?.date).toBe("01.05.2026"); // дата не затёрлась
  });

  it("не перезаписывает время у других ордеров, если у них уже есть время", () => {
    const card1 = makeCard("order-1");
    const card2 = makeCard("order-2");
    const datetime: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026" },
        { order_id: "order-2", date: "01.05.2026", time_from: "10:00", time_to: "12:00" },
      ],
    };

    const result = buildDatetimeAfterTimeChange(
      datetime,
      card1,
      [card1, card2],
      ["19:00", "21:00"],
    );

    const order2 = result.orders.find((o) => o.order_id === "order-2");
    expect(order2?.time_from).toBe("10:00"); // не перезаписано
    expect(order2?.time_to).toBe("12:00");
  });

  it("присваивает время ордерам той же платформы без времени", () => {
    const card1 = makeCard("order-1");
    const card2 = makeCard("order-2");
    const datetime: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026" },
        { order_id: "order-2", date: "01.05.2026" }, // без времени
      ],
    };

    const result = buildDatetimeAfterTimeChange(
      datetime,
      card1,
      [card1, card2],
      ["19:00", "21:00"],
    );

    const order2 = result.orders.find((o) => o.order_id === "order-2");
    expect(order2?.time_from).toBe("19:00"); // подтянулось
    expect(order2?.time_to).toBe("21:00");
  });
});

describe("buildDatetimeAfterDateChange", () => {
  it("сохраняет существующее время при смене даты", () => {
    const card = makeCard("order-1");
    const datetime: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026", time_from: "19:00", time_to: "21:00" },
      ],
    };

    const result = buildDatetimeAfterDateChange(
      datetime,
      card,
      [card],
      [new Date(2026, 4, 2)], // 02.05.2026
      formatDate,
    );

    const order = result.orders.find((o) => o.order_id === "order-1");
    expect(order?.date).toBe("02.05.2026");
    expect(order?.time_from).toBe("19:00"); // время сохранилось!
    expect(order?.time_to).toBe("21:00");
  });

  it("ГЛАВНЫЙ КЕЙС: при stale-стейте теряется время — наш фикс через getValues решает это", () => {
    // Симуляция: пользователь установил время, затем меняет дату.
    // staleState — то, что было бы в formState (без времени).
    // freshState — то, что вернёт getValues() (с временем).

    const card = makeCard("order-1");

    const staleState: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026" }, // ← времени нет (stale)
      ],
    };

    const freshState: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026", time_from: "19:00", time_to: "21:00" },
      ],
    };

    // БАГ: если handleChangeDate берёт staleState — время теряется
    const bugResult = buildDatetimeAfterDateChange(
      staleState,
      card,
      [card],
      [new Date(2026, 4, 2)],
      formatDate,
    );
    const bugOrder = bugResult.orders.find((o) => o.order_id === "order-1");
    expect(bugOrder?.time_from).toBeUndefined(); // время потеряно!

    // ФИКС: если handleChangeDate берёт freshState (через getValues) — время сохраняется
    const fixResult = buildDatetimeAfterDateChange(
      freshState,
      card,
      [card],
      [new Date(2026, 4, 2)],
      formatDate,
    );
    const fixOrder = fixResult.orders.find((o) => o.order_id === "order-1");
    expect(fixOrder?.time_from).toBe("19:00"); // время на месте!
    expect(fixOrder?.time_to).toBe("21:00");
    expect(fixOrder?.date).toBe("02.05.2026");
  });

  it("переключение с одиночной даты на диапазон удаляет поле date", () => {
    const card = makeCard("order-1");
    const datetime: ICreateDate = {
      project_id: "p1",
      orders: [
        { order_id: "order-1", date: "01.05.2026", time_from: "10:00", time_to: "12:00" },
      ],
    };

    const result = buildDatetimeAfterDateChange(
      datetime,
      card,
      [card],
      [new Date(2026, 4, 1), new Date(2026, 4, 5)],
      formatDate,
    );

    const order = result.orders.find((o) => o.order_id === "order-1");
    expect(order?.date).toBeUndefined();
    expect(order?.date_from).toBe("01.05.2026");
    expect(order?.date_to).toBe("05.05.2026");
    expect(order?.time_from).toBe("10:00"); // время не потеряно
  });
});

describe("cleanExpiredDates", () => {
  it("удаляет устаревшую дату, время остаётся", () => {
    const today = new Date(2026, 4, 1); // 01.05.2026
    today.setHours(0, 0, 0, 0);

    const orders = [
      { order_id: "1", date: "30.04.2026", time_from: "10:00", time_to: "14:00" },
    ];

    const { cleanedOrders, hasChanges } = cleanExpiredDates(orders, today, parseDate);

    expect(hasChanges).toBe(true);
    expect(cleanedOrders[0].date).toBeUndefined();
    expect(cleanedOrders[0].time_from).toBe("10:00"); // время на месте
    expect(cleanedOrders[0].time_to).toBe("14:00");
  });

  it("не трогает актуальную дату", () => {
    const today = new Date(2026, 4, 1);
    today.setHours(0, 0, 0, 0);

    const orders = [
      { order_id: "1", date: "01.05.2026", time_from: "10:00", time_to: "14:00" },
    ];

    const { cleanedOrders, hasChanges } = cleanExpiredDates(orders, today, parseDate);

    expect(hasChanges).toBe(false);
    expect(cleanedOrders[0].date).toBe("01.05.2026");
  });

  it("не трогает будущую дату", () => {
    const today = new Date(2026, 4, 1);
    today.setHours(0, 0, 0, 0);

    const orders = [
      { order_id: "1", date: "05.05.2026" },
    ];

    const { cleanedOrders, hasChanges } = cleanExpiredDates(orders, today, parseDate);

    expect(hasChanges).toBe(false);
    expect(cleanedOrders[0].date).toBe("05.05.2026");
  });

  it("удаляет устаревший диапазон дат (date_from/date_to)", () => {
    const today = new Date(2026, 4, 1);
    today.setHours(0, 0, 0, 0);

    const orders = [
      {
        order_id: "1",
        date_from: "25.04.2026",
        date_to: "28.04.2026",
        time_from: "08:00",
        time_to: "14:00",
      },
    ];

    const { cleanedOrders, hasChanges } = cleanExpiredDates(orders, today, parseDate);

    expect(hasChanges).toBe(true);
    expect(cleanedOrders[0].date_from).toBeUndefined();
    expect(cleanedOrders[0].date_to).toBeUndefined();
    expect(cleanedOrders[0].time_from).toBe("08:00"); // время сохранено
  });

  it("обрабатывает несколько ордеров: удаляет только устаревшие", () => {
    const today = new Date(2026, 4, 1);
    today.setHours(0, 0, 0, 0);

    const orders = [
      { order_id: "1", date: "30.04.2026", time_from: "10:00", time_to: "12:00" },
      { order_id: "2", date: "02.05.2026", time_from: "14:00", time_to: "16:00" },
      { order_id: "3", date: "29.04.2026" },
    ];

    const { cleanedOrders, hasChanges } = cleanExpiredDates(orders, today, parseDate);

    expect(hasChanges).toBe(true);

    // Ордер 1: дата удалена, время осталось
    expect(cleanedOrders[0].date).toBeUndefined();
    expect(cleanedOrders[0].time_from).toBe("10:00");

    // Ордер 2: всё осталось
    expect(cleanedOrders[1].date).toBe("02.05.2026");
    expect(cleanedOrders[1].time_from).toBe("14:00");

    // Ордер 3: дата удалена, времени и не было
    expect(cleanedOrders[2].date).toBeUndefined();
  });
});
