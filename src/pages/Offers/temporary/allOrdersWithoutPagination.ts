/**
 * TEMPORARY — весь каталог `temporary/` можно удалить для отката пагинации.
 * Также убрать импорты и блоки `TEMPORARY_*` в `Offers/UI/index.tsx`.
 */
import { IBloggerOfferCard } from "@entities/offer";

export const TEMPORARY_FETCH_ALL_ORDERS = true;

type PublishDateValue = IBloggerOfferCard["publish_date"] | string[] | unknown;

const parseDateTime = (dateStr: string, timeStr: string): number | null => {
  const dateParts = dateStr.split(".");
  if (dateParts.length !== 3) return null;

  const [day, month, year] = dateParts.map(Number);
  const timeParts = timeStr.split(":");
  if (timeParts.length < 2) return null;

  const [hours, minutes] = timeParts.map(Number);

  if ([day, month, year, hours, minutes].some((value) => Number.isNaN(value))) {
    return null;
  }

  return new Date(year, month - 1, day, hours, minutes, 0).getTime();
};

const collectDateStrings = (publishDate: PublishDateValue): string[] => {
  if (!publishDate) return [];

  if (typeof publishDate === "string") {
    return [publishDate];
  }

  if (Array.isArray(publishDate)) {
    return publishDate.flatMap((item) => collectDateStrings(item));
  }

  if (
    typeof publishDate === "object" &&
    publishDate !== null &&
    "date_from" in publishDate &&
    "date_to" in publishDate
  ) {
    const { date_from, date_to } = publishDate as {
      date_from: string;
      date_to: string;
    };
    return [date_from, date_to].filter(
      (date): date is string => typeof date === "string" && date.length > 0,
    );
  }

  return [];
};

/** Ближайшая (самая ранняя) дата публикации для сортировки */
const getNearestPublishDateStr = (
  publishDate: PublishDateValue,
): string | null => {
  const dates = collectDateStrings(publishDate);
  if (!dates.length) return null;

  let nearestDate: string | null = null;
  let nearestTimestamp = Infinity;

  dates.forEach((dateStr) => {
    const timestamp = parseDateTime(dateStr, "00:00");
    if (timestamp === null || timestamp >= nearestTimestamp) return;

    nearestTimestamp = timestamp;
    nearestDate = dateStr;
  });

  return nearestDate;
};

const getOrderPublishTimestamp = (order: IBloggerOfferCard): number => {
  const dateStr = getNearestPublishDateStr(order.publish_date);
  const timeStr = order.publish_time?.time_from ?? "00:00";

  if (!dateStr) return Number.MAX_SAFE_INTEGER;

  return parseDateTime(dateStr, timeStr) ?? Number.MAX_SAFE_INTEGER;
};

/** От ближайших к самым поздним по publish_date + publish_time.time_from */
export const sortOrdersByPublishDate = (
  orders: IBloggerOfferCard[],
): IBloggerOfferCard[] => {
  return [...orders].sort(
    (left, right) =>
      getOrderPublishTimestamp(left) - getOrderPublishTimestamp(right),
  );
};
