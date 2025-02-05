import { DAY_OF_WEEK } from "@entities/communication";

export const CheckDate = (date_to: string): boolean => {
  const currentDate = new Date().toLocaleString("ru-RU");
  // const date: Date = new Date(date_to);
  console.log("сегодня:", currentDate);
  console.log("дата поста:", date_to);
  return date_to <= currentDate;
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
