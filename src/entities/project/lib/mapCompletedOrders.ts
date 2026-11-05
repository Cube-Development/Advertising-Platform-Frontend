import type {
  ICompletedOrder,
  ICompletedOrderResponse,
  ICompletedOrders,
  ICompletedOrdersResponse,
  IViewsChart,
  IViewsChartPoint,
  IViewsDynamics,
  IViewsPointResponse,
} from "../types";

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

const parseTime = (value?: string | null) =>
  value ? new Date(value).getTime() : Number.NaN;

/** Время точки (ISO без зоны, как у бэка) — для тултипа */
const toLocalIso = (time: number) => {
  const date = new Date(time);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

/** Точки + стартовая точка «публикация, 0 просмотров» → данные графика */
const toChart = (
  published: string,
  points: IViewsChartPoint[],
): IViewsChart | null => {
  const sorted = points
    .filter((point) => Number.isFinite(point.hours) && point.hours >= 0)
    .sort((a, b) => a.hours - b.hours);
  if (!sorted.length) return null;

  const all: IViewsChartPoint[] = [
    { hours: 0, views: 0, delta: 0, taken: published },
    ...sorted,
  ];

  const minGapHours = all.reduce((min, point, index) => {
    if (!index) return min;
    const gap = point.hours - all[index - 1].hours;
    return gap > 0 ? Math.min(min, gap) : min;
  }, Number.POSITIVE_INFINITY);

  return {
    points: all,
    maxHour: Math.max(1, Math.ceil(all[all.length - 1].hours)),
    maxViews: Math.max(...all.map((point) => point.views)),
    maxDelta: Math.max(...all.map((point) => point.delta)),
    minGapHours: Number.isFinite(minGapHours) ? minGapHours : 1,
  };
};

/**
 * Основной источник — views_points с бэка: прирост (gain) уже посчитан.
 * Позиция — minutes / 60: поле hours округлено до целого и сдвигало бы точки
 */
export const buildChartFromPoints = (
  points: IViewsPointResponse[] | null | undefined,
  published: string,
): IViewsChart | null => {
  if (!points?.length) return null;
  const publishedTime = parseTime(published);
  if (Number.isNaN(publishedTime)) return null;

  return toChart(
    published,
    points
      // Без minutes позиция неизвестна — не ставим такую точку на 0 ч поверх стартовой
      .filter((point) => Number.isFinite(point.minutes) && point.minutes > 0)
      .map((point) => ({
        hours: point.minutes / 60,
        views: point.views ?? 0,
        delta: Math.max(0, point.gain ?? 0),
        taken: toLocalIso(publishedTime + point.minutes * MINUTE_MS),
      })),
  );
};

/**
 * Запасной источник — снимки views_dynamics (если views_points не пришёл):
 * прирост считаем сами, в минус не уходит (просмотры могут «откатиться»)
 */
export const buildViewsChart = (
  dynamics?: IViewsDynamics | null,
): IViewsChart | null => {
  if (!dynamics?.published || !dynamics.snapshots?.length) return null;
  const published = parseTime(dynamics.published);
  if (Number.isNaN(published)) return null;

  const sorted = dynamics.snapshots
    .map((snapshot) => ({
      hours: (parseTime(snapshot.taken) - published) / HOUR_MS,
      views: snapshot.views ?? 0,
      taken: snapshot.taken,
    }))
    .filter((point) => Number.isFinite(point.hours) && point.hours >= 0)
    .sort((a, b) => a.hours - b.hours);

  return toChart(
    dynamics.published,
    sorted.map((point, index) => ({
      ...point,
      delta: Math.max(0, point.views - (index ? sorted[index - 1].views : 0)),
    })),
  );
};

/** Момент публикации: из views_dynamics, иначе из publish_date + publish_time */
const getPublished = (order: ICompletedOrderResponse) =>
  order.views_dynamics?.published ||
  (order.publish_date
    ? `${order.publish_date}T${order.publish_time || "00:00:00"}`
    : "");

/** Выполненный заказ: ответ + готовый график и итоговые просмотры */
export const mapCompletedOrder = (
  order: ICompletedOrderResponse,
): ICompletedOrder => {
  const views_chart =
    buildChartFromPoints(order.views_points, getPublished(order)) ??
    buildViewsChart(order.views_dynamics);
  return {
    ...order,
    views_chart,
    last_views: views_chart
      ? views_chart.points[views_chart.points.length - 1].views
      : (order.real_views ?? 0),
  };
};

/** Маппер ответа completed-orders — вызывается в transformResponse запроса */
export const mapCompletedOrders = (
  response?: ICompletedOrdersResponse | null,
): ICompletedOrders => ({
  orders: (response?.orders ?? []).map(mapCompletedOrder),
  summary: response?.summary ?? null,
});
