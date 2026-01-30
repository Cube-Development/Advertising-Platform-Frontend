import { DAY_OF_WEEK } from "@entities/communication";

export const CheckDate = (
  date_to: string,
  time_from?: string,
  time_to?: string,
): boolean => {
  const now = new Date();

  // Получаем дату в Ташкенте в формате YYYY-MM-DD для корректного сравнения
  const tashkentDateStr = now.toLocaleDateString("en-CA", {
    timeZone: "Asia/Tashkent",
  }); // "2026-01-28"

  // Получаем время в Ташкенте в формате HH:MM
  const tashkentTimeStr = now.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Tashkent",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // "15:30"

  // Парсим дату размещения в формат YYYY-MM-DD
  const publishDateStr = date_to.split(".").reverse().join("-"); // "28.01.2026" -> "2026-01-28"

  // Если дата размещения еще не наступила (сравниваем строки)
  if (publishDateStr > tashkentDateStr) {
    return false;
  }

  // Если дата размещения уже прошла (больше чем на день)
  // Вычисляем следующий день
  const publishDate = new Date(publishDateStr + "T12:00:00"); // T12:00 чтобы избежать проблем с DST
  publishDate.setDate(publishDate.getDate() + 1);
  const dayAfterStr = publishDate.toISOString().slice(0, 10); // "YYYY-MM-DD"

  if (tashkentDateStr > dayAfterStr) {
    return false;
  }

  // Если указано время размещения, проверяем его (только если сегодня день размещения)
  if (time_from && time_to && publishDateStr === tashkentDateStr) {
    // Сравниваем строки времени (работает для формата HH:MM)
    if (tashkentTimeStr < time_from) {
      return false;
    }

    if (tashkentTimeStr > time_to) {
      return false;
    }
  }

  return true;
};

export const getDateChat = (date: string, time: string): string => {
  const inputDate = new Date(`${date} ${time}`);
  const currentDate = new Date();
  const differenceInMillis = currentDate.getTime() - inputDate.getTime();
  const differenceInHours = differenceInMillis / (1000 * 60 * 60);

  if (differenceInHours >= 24) {
    const dayOfWeek = inputDate.getDay();
    return DAY_OF_WEEK.Ru[dayOfWeek];
  }

  const hoursInWeek = 7 * 24;
  if (differenceInHours >= hoursInWeek) {
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Месяцы нумеруются с 0
    const year = inputDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return time;
};
