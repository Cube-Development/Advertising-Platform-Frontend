import { platformTypesNum } from "@entities/platform";

export const STEP = 5;
export const MAX_MINS = 1440;
export const MIN_GAP = 120;
export const START_OFFSET = 15;

/** Округление вверх до ближайшего шага */
export const ceilToStep = (minutes: number): number =>
  Math.ceil(minutes / STEP) * STEP;

/** Округление вниз до ближайшего шага */
export const floorToStep = (minutes: number): number =>
  Math.floor(minutes / STEP) * STEP;

/** Минуты → "HH:MM" */
export const formatTime = (mins: number): string => {
  if (mins >= 1440) return "23:59";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

/** "HH:MM" → минуты */
export const parseTime = (time: string): number => {
  if (time === "23:59" || time === "24:00") return 1440;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Длительность в читаемом виде */
export const formatDuration = (
  mins: number,
  tHour: string,
  tMin: string,
): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} ${tMin}`;
  if (m === 0) return `${h} ${tHour}`;
  return `${h} ${tHour} ${m} ${tMin}`;
};

/** Вычислить minValue на основе даты и платформы */
export const computeMinValue = (
  selectedDate: string | undefined,
  platform: platformTypesNum | undefined,
  now?: Date,
): number => {
  if (!selectedDate) return 0;

  const today = now ?? new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`;

  if (selectedDate !== todayFormatted) return 0;

  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  const offset = 0;
  const min = ceilToStep(nowMinutes) + START_OFFSET + offset;

  return Math.min(min, MAX_MINS - MIN_GAP);
};

/** Вычислить валидные дефолтные значения */
export const computeDefaults = (minVal: number): [number, number] => {
  const start = Math.max(minVal, 480);
  const end = Math.min(start + 360, MAX_MINS);
  return [start, end];
};

/**
 * Скорректировать диапазон времени под ограничения minValue / MIN_GAP / MAX_MINS.
 * Возвращает скорректированный [start, end] и флаг wasChanged.
 */
export const correctTimeRange = (
  startTime: [string, string],
  minValue: number,
): { start: number; end: number; wasChanged: boolean } => {
  const originalStart = floorToStep(parseTime(startTime[0]));
  const originalEnd = ceilToStep(parseTime(startTime[1]));

  let start = originalStart;
  let end = originalEnd;

  if (start < minValue) start = minValue;
  if (end < start + MIN_GAP) end = start + MIN_GAP;
  if (end > MAX_MINS) {
    end = MAX_MINS;
    start = Math.max(minValue, end - MIN_GAP);
  }

  return {
    start,
    end,
    wasChanged: start !== originalStart || end !== originalEnd,
  };
};
