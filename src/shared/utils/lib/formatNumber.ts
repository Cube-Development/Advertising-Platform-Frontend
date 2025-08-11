export function formatWithSpaces(value: string): string {
  if (!value) return "";

  // Убираем всё после точки или запятой
  const [integerPart] = value.split(/[.,]/);

  // Убираем все нецифровые символы
  const cleaned = integerPart.replace(/\D/g, "");

  // Форматируем с пробелами между тысячами
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatWithOutSpaces(value: string): number {
  if (!value) return 0;

  // Убираем все, кроме цифр и точки
  let cleaned = value.replace(/[^\d.,]/g, "");

  // Заменяем запятую на точку
  cleaned = cleaned.replace(",", ".");

  // Оставляем только первую точку, если их несколько
  const firstDotIndex = cleaned.indexOf(".");
  if (firstDotIndex !== -1) {
    cleaned =
      cleaned.slice(0, firstDotIndex + 1) +
      cleaned.slice(firstDotIndex + 1).replace(/\./g, "");
  }

  // Убираем ведущую точку
  if (cleaned.startsWith(".")) {
    cleaned = cleaned.slice(1);
  }

  return Number(cleaned || 0);
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
