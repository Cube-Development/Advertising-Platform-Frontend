export const getUtcDateMinusDays = (days: number): string => {
  if (days === 0) {
    return "1970-01-01";
  }

  const now = new Date();

  // берём текущую UTC дату
  const utcTimestamp = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(utcTimestamp);

  // вычитаем дни
  utcDate.setUTCDate(utcDate.getUTCDate() - days);

  // форматируем в YYYY-MM-DD
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(utcDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
