export enum COMMON_OBSERVE_PERIOD {
  ALL_TIME = "all_time",
  THREE_MONTHS = "three_months",
  ONE_MONTH = "one_month",
  ONE_WEEK = "one_week",
}

export const COMMON_OBSERVE_PERIOD_DAYS: Record<COMMON_OBSERVE_PERIOD, number> =
  {
    [COMMON_OBSERVE_PERIOD.ALL_TIME]: 730,
    [COMMON_OBSERVE_PERIOD.THREE_MONTHS]: 90,
    [COMMON_OBSERVE_PERIOD.ONE_MONTH]: 30,
    [COMMON_OBSERVE_PERIOD.ONE_WEEK]: 7,
  };

export const COMMON_OBSERVE_PERIOD_TABS = [
  {
    name: "admin_panel.common_observe.period.all_time",
    type: COMMON_OBSERVE_PERIOD.ALL_TIME,
  },
  {
    name: "admin_panel.common_observe.period.three_months",
    type: COMMON_OBSERVE_PERIOD.THREE_MONTHS,
  },
  {
    name: "admin_panel.common_observe.period.one_month",
    type: COMMON_OBSERVE_PERIOD.ONE_MONTH,
  },
  {
    name: "admin_panel.common_observe.period.one_week",
    type: COMMON_OBSERVE_PERIOD.ONE_WEEK,
  },
];

export const COMMON_OBSERVE_COLUMN_KEYS = [
  "date",
  "projects",
  "common_orders",
  "publisher_orders",
  "self_connect_orders",
  "turnover",
] as const;

export type CommonObserveColumnKey =
  (typeof COMMON_OBSERVE_COLUMN_KEYS)[number];

export const COMMON_OBSERVE_METRIC_KEYS = [
  "projects",
  "common_orders",
  "publisher_orders",
  "self_connect_orders",
  "turnover",
] as const;

export type CommonObserveMetricKey =
  (typeof COMMON_OBSERVE_METRIC_KEYS)[number];

export const getCommonObserveColumnLabelKey = (key: CommonObserveColumnKey) =>
  `admin_panel.common_observe.columns.${key}`;

export const COMMON_OBSERVE_CHART_SERIES = [
  { key: "projects", color: "#3b82f6", yAxisId: "count" },
  { key: "common_orders", color: "#0ab39c", yAxisId: "count" },
  { key: "publisher_orders", color: "#f1b143", yAxisId: "count" },
  { key: "self_connect_orders", color: "#8b5cf6", yAxisId: "count" },
  { key: "turnover", color: "#fe3430", yAxisId: "turnover" },
] as const;

export const CHART_LOCALE_MAP: Record<string, string> = {
  ru: "ru-RU",
  en: "en-US",
  uz: "uz-UZ",
};
