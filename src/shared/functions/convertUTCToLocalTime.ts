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
  const localDateString = `${year}-${month}-${day}`;

  // Извлекаем локальное время
  const hours = String(localDateTime.getHours()).padStart(2, "0");
  const minutes = String(localDateTime.getMinutes()).padStart(2, "0");
  const localTimeString = `${hours}:${minutes}`;

  return {
    localDate: localDateString,
    localTime: localTimeString,
  };
}
