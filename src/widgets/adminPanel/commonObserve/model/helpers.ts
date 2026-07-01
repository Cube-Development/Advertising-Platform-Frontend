import {
  COMMON_OBSERVE_PERIOD,
  COMMON_OBSERVE_PERIOD_DAYS,
} from "./constants";

export const toInputDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const toApiDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};

export const getDateRangeByPeriod = (
  period: COMMON_OBSERVE_PERIOD,
): { dateFrom: string; dateTo: string } => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - COMMON_OBSERVE_PERIOD_DAYS[period]);

  return {
    dateFrom: toInputDate(fromDate),
    dateTo: toInputDate(today),
  };
};
