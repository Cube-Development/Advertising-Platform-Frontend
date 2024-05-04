export const CheckDate = (date_to: string): boolean => {
  const currentDate = new Date();
  const date: Date = new Date(date_to);
  return date > currentDate;
};
