import { DAY_OF_WEEK } from "@entities/communication";

export const CheckDate = (
  date_from: string,
  date_to: string,
  time_from?: string,
  time_to?: string,
  offsetMinutes: number = 0
): boolean => {
  const parseParts = (d: string) => {
    const p = d.split(".");
    if (p.length !== 3) return null;
    return {
      day: parseInt(p[0], 10),
      month: parseInt(p[1], 10) - 1,
      year: parseInt(p[2], 10),
    };
  };

  const from = parseParts(date_from);
  const to = parseParts(date_to);
  if (!from || !to) return false;

  // Получаем текущее время в Ташкенте и создаем Date с этими же локальными компонентами
  const nowStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Tashkent" });
  const tashkentNow = new Date(nowStr);

  let startHour = 0;
  let startMinute = 0;
  if (time_from) {
    const [h, m] = time_from.split(":");
    startHour = parseInt(h, 10);
    startMinute = parseInt(m, 10);
  }

  let endHour = 23;
  let endMinute = 59;
  if (time_to) {
    const [h, m] = time_to.split(":");
    endHour = parseInt(h, 10);
    endMinute = parseInt(m, 10);
  }

  const startDate = new Date(from.year, from.month, from.day, startHour, startMinute, 0);
  const endDate = new Date(to.year, to.month, to.day, endHour, endMinute + offsetMinutes, 0);

  return tashkentNow.getTime() >= startDate.getTime() && tashkentNow.getTime() <= endDate.getTime();
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
