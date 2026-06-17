import { IFormat } from "../types";

/**
 * Возвращает самый дешёвый формат размещения (по ключу price).
 * Если форматов нет — возвращает undefined.
 */
export const getCheapestFormat = (formats?: IFormat[]): IFormat | undefined => {
  if (!formats || formats.length === 0) return undefined;

  return formats.reduce((cheapest, current) =>
    current?.price < cheapest?.price ? current : cheapest,
  );
};
