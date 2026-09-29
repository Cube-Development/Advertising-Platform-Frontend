import { IFormat } from "../types";

/**
 * Возвращает самый дешёвый формат размещения (по ключу price).
 * Если форматов нет — возвращает undefined.
 */
export const getCheapestFormat = (formats?: IFormat[]): IFormat | undefined => {
  const available = formats?.filter(
    (format) => !format.format_unavailable && format.price != null,
  );
  if (!available || available.length === 0) return undefined;

  return available.reduce((cheapest, current) =>
    (current.price as number) < (cheapest.price as number) ? current : cheapest,
  );
};
