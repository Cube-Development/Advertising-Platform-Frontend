export function getCurrentUtcDateTime(): { date: string; time: string } {
  const now = new Date();

  // Получение даты в формате YYYY-MM-DD
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Месяцы с 0 до 11, поэтому добавляем 1
  const day = String(now.getUTCDate()).padStart(2, "0");

  const date = `${year}-${month}-${day}`;

  // Получение времени в формате HH:MM
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");

  const time = `${hours}:${minutes}`;

  return { date: date, time: time };
}
