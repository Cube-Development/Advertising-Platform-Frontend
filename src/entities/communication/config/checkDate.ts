import { DAY_OF_WEEK } from "@entities/communication";

export const CheckDate = (
  date_to: string,
  time_from?: string,
  time_to?: string,
): boolean => {
  // Получаем текущую дату и время в Ташкенте (UTC+5)
  const now = new Date();
  const tashkentTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Tashkent" }),
  );

  // Парсим дату размещения
  const publishDate = new Date(date_to.split(".").reverse().join("-"));

  // Если дата размещения еще не наступила
  if (publishDate > tashkentTime) {
    return false;
  }

  // Если дата размещения уже прошла (больше чем на день)
  const dayAfter = new Date(publishDate);
  dayAfter.setDate(dayAfter.getDate() + 1);
  if (tashkentTime > dayAfter) {
    return false;
  }

  // Если указано время размещения, проверяем его
  if (time_from && time_to) {
    const currentTime = tashkentTime.toTimeString().slice(0, 5); // HH:MM формат

    // Если текущее время меньше времени начала размещения
    if (currentTime < time_from) {
      return false;
    }

    // Если текущее время больше времени окончания размещения
    if (currentTime > time_to) {
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
