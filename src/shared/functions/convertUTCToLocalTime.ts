export function convertUTCToLocalDateTime(
  utcDate: string,
  utcTime: string,
): { localDate: string; localTime: string } {
  // Создаем объект Date на основе переданных строки даты и времени в формате UTC
  const utcDateTimeString = `${utcDate}T${utcTime}Z`;
  const utcDateTime = new Date(utcDateTimeString);

  // Преобразуем UTC дату и время в локальные
  const localDateTime = new Date(utcDateTime.getTime());

  // Извлекаем локальную дату
  const year = localDateTime.getFullYear();
  const month = String(localDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(localDateTime.getDate()).padStart(2, "0");
  // const localDateString = `${year}-${month}-${day}`;
  const localDateString = `${day}.${month}.${year}`;

  // Извлекаем локальное время
  const hours = String(localDateTime.getHours()).padStart(2, "0");
  const minutes = String(localDateTime.getMinutes()).padStart(2, "0");
  const localTimeString = `${hours}:${minutes}`;

  return {
    localDate: localDateString,
    localTime: localTimeString,
  };
}

export function getFormattedDateTime() {
  const now = new Date();

  const utcDate =
    now.getUTCFullYear() +
    "-" +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getUTCDate()).padStart(2, "0");

  const utcTime =
    String(now.getUTCHours()).padStart(2, "0") +
    ":" +
    String(now.getUTCMinutes()).padStart(2, "0") +
    ":" +
    String(now.getUTCSeconds()).padStart(2, "0") +
    "." +
    String(now.getUTCMilliseconds()).padStart(6, "0") +
    "000000";

  const localDate =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  const localTime =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");

  return {
    utcDate: utcDate,
    utcTime: utcTime,
    localDate: localDate,
    localTime: localTime,
  };
}

export function checkDatetimeDifference(
  dateTime1: string,
  dateTime2: string,
  minutes: number,
): boolean {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  const differenceInMilliseconds = date2.getTime() - date1.getTime();
  return differenceInMilliseconds < 60000 * minutes;
}

export function checkDatetime(dateTime1: string, dateTime2: string): boolean {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  return date2.getTime() >= date1.getTime();
}
