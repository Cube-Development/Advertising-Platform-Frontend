export const formatDateToRuString = (date: Date): string => {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatRuStringToDate = (date: string): Date => {
  const [day, month, year] = date.split(".");
  return new Date(`${year}/${month}/${day}`);
};
