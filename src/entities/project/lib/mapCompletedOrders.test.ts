import { describe, expect, test } from "vitest";
import type { ICompletedOrderResponse } from "../types";
import {
  buildChartFromPoints,
  buildViewsChart,
  mapCompletedOrder,
  mapCompletedOrders,
} from "./mapCompletedOrders";

const PUBLISHED = "2026-11-03T16:00:00";

const order = (
  overrides: Partial<ICompletedOrderResponse> = {},
): ICompletedOrderResponse =>
  ({
    id: "order-1",
    name: "Channel",
    real_views: 500,
    views_dynamics: null,
    ...overrides,
  }) as ICompletedOrderResponse;

describe("buildChartFromPoints", () => {
  // Пример ответа бэка: 69 и 164 минуты, hours округлён (1 и 3)
  const POINTS = [
    { minutes: 69, hours: 1, views: 7792, gain: 7792 },
    { minutes: 164, hours: 3, views: 12621, gain: 4829 },
  ];

  test("позиция по minutes, а не по округлённому hours; прирост — gain", () => {
    const chart = buildChartFromPoints(POINTS, PUBLISHED);

    expect(chart?.points.map((point) => point.hours)).toEqual([
      0,
      69 / 60,
      164 / 60,
    ]);
    expect(chart?.points.map((point) => point.delta)).toEqual([0, 7792, 4829]);
    expect(chart?.points.map((point) => point.views)).toEqual([0, 7792, 12621]);
  });

  test("время точки = публикация + minutes", () => {
    const chart = buildChartFromPoints(POINTS, PUBLISHED);

    expect(chart?.points[0].taken).toBe(PUBLISHED);
    expect(chart?.points[1].taken).toBe("2026-11-03T17:09:00");
    expect(chart?.points[2].taken).toBe("2026-11-03T18:44:00");
  });

  test("maxHour — вверх по последней точке, minGapHours — от публикации и между точками", () => {
    const chart = buildChartFromPoints(POINTS, PUBLISHED);

    expect(chart?.maxHour).toBe(3);
    expect(chart?.maxViews).toBe(12621);
    expect(chart?.maxDelta).toBe(7792);
    // 0 → 69 мин короче, чем 69 → 164
    expect(chart?.minGapHours).toBeCloseTo(69 / 60);
  });

  test("точки без minutes отбрасываются, а не встают на 0 ч", () => {
    const chart = buildChartFromPoints(
      [
        {
          minutes: undefined as unknown as number,
          hours: 0,
          views: 5,
          gain: 5,
        },
        { minutes: 60, hours: 1, views: 100, gain: 100 },
      ],
      PUBLISHED,
    );

    expect(chart?.points.map((point) => point.hours)).toEqual([0, 1]);
    expect(chart?.points.filter((point) => point.hours === 0)).toHaveLength(1);
  });

  test("null, если точек нет или нет даты публикации", () => {
    expect(buildChartFromPoints([], PUBLISHED)).toBeNull();
    expect(buildChartFromPoints(null, PUBLISHED)).toBeNull();
    expect(buildChartFromPoints(POINTS, "")).toBeNull();
  });
});

describe("buildViewsChart", () => {
  test("null, если нет публикации или снимков", () => {
    expect(buildViewsChart(null)).toBeNull();
    expect(buildViewsChart({ published: PUBLISHED, snapshots: [] })).toBeNull();
    expect(
      buildViewsChart({
        published: "",
        snapshots: [{ taken: PUBLISHED, views: 1 }],
      }),
    ).toBeNull();
  });

  test("часы после публикации, накопленные просмотры и прирост", () => {
    const chart = buildViewsChart({
      published: PUBLISHED,
      snapshots: [
        { taken: "2026-11-03T17:30:00", views: 100 },
        { taken: "2026-11-03T19:00:00", views: 250 },
      ],
    });

    expect(chart?.points).toEqual([
      { hours: 0, views: 0, delta: 0, taken: PUBLISHED },
      { hours: 1.5, views: 100, delta: 100, taken: "2026-11-03T17:30:00" },
      { hours: 3, views: 250, delta: 150, taken: "2026-11-03T19:00:00" },
    ]);
    expect(chart?.maxHour).toBe(3);
    expect(chart?.maxViews).toBe(250);
    expect(chart?.maxDelta).toBe(150);
    expect(chart?.minGapHours).toBe(1.5);
  });

  test("снимки сортируются, снимки до публикации отбрасываются", () => {
    const chart = buildViewsChart({
      published: PUBLISHED,
      snapshots: [
        { taken: "2026-11-03T18:00:00", views: 300 },
        { taken: "2026-11-03T15:00:00", views: 999 },
        { taken: "2026-11-03T17:00:00", views: 120 },
      ],
    });

    expect(chart?.points.map((point) => point.hours)).toEqual([0, 1, 2]);
    expect(chart?.points.map((point) => point.delta)).toEqual([0, 120, 180]);
  });

  test("прирост не уходит в минус, если просмотры откатились", () => {
    const chart = buildViewsChart({
      published: PUBLISHED,
      snapshots: [
        { taken: "2026-11-03T17:00:00", views: 200 },
        { taken: "2026-11-03T18:00:00", views: 180 },
      ],
    });

    expect(chart?.points[2].delta).toBe(0);
  });
});

describe("mapCompletedOrder: источник графика", () => {
  test("views_points важнее снимков views_dynamics", () => {
    const mapped = mapCompletedOrder(
      order({
        views_points: [{ minutes: 30, hours: 1, views: 50, gain: 50 }],
        views_dynamics: {
          published: PUBLISHED,
          snapshots: [{ taken: "2026-11-03T17:00:00", views: 999 }],
        },
      }),
    );

    expect(mapped.views_chart?.points.map((point) => point.views)).toEqual([
      0, 50,
    ]);
    expect(mapped.last_views).toBe(50);
  });

  test("без views_dynamics публикация берётся из publish_date + publish_time", () => {
    const mapped = mapCompletedOrder(
      order({
        publish_date: "2026-11-03",
        publish_time: "16:00:00",
        views_points: [{ minutes: 60, hours: 1, views: 10, gain: 10 }],
      }),
    );

    expect(mapped.views_chart?.points[1].taken).toBe("2026-11-03T17:00:00");
  });

  test("без views_points — запасной расчёт из снимков", () => {
    const mapped = mapCompletedOrder(
      order({
        views_dynamics: {
          published: PUBLISHED,
          snapshots: [{ taken: "2026-11-03T17:00:00", views: 40 }],
        },
      }),
    );

    expect(mapped.views_chart?.points.map((point) => point.delta)).toEqual([
      0, 40,
    ]);
  });
});

describe("mapCompletedOrders", () => {
  test("last_views — последний снимок, без снимков — real_views", () => {
    expect(mapCompletedOrder(order()).last_views).toBe(500);
    expect(
      mapCompletedOrder(
        order({
          views_dynamics: {
            published: PUBLISHED,
            snapshots: [{ taken: "2026-11-03T17:00:00", views: 321 }],
          },
        }),
      ).last_views,
    ).toBe(321);
  });

  test("пустой ответ — пустой список и summary = null", () => {
    expect(mapCompletedOrders(undefined)).toEqual({
      orders: [],
      summary: null,
    });
  });
});
