import { IPromocodeState, IPromocodeTarget } from "../types/promocode.types";

/** sessionStorage: код переживает перезагрузку и уход на внешнюю оплату, но не вкладку */
const PROMOCODE_STORAGE_KEY = "promocode";

export const EMPTY_PROMOCODE: IPromocodeState = {
  code: null,
  projectId: null,
  discount: null,
  applyId: null,
};

const isStoredPromocode = (value: unknown): value is IPromocodeTarget => {
  if (typeof value !== "object" || value === null) return false;
  const { code, projectId } = value as Record<string, unknown>;
  return (
    typeof code === "string" &&
    code.length > 0 &&
    (projectId === null || typeof projectId === "string")
  );
};

/** Скидка не хранится: корзина и экран оплаты пересчитывают её сами. Битое значение — пусто */
export const readPromocode = (): IPromocodeState => {
  try {
    const item = window.sessionStorage.getItem(PROMOCODE_STORAGE_KEY);
    const value: unknown = item ? JSON.parse(item) : null;
    return isStoredPromocode(value)
      ? { ...EMPTY_PROMOCODE, code: value.code, projectId: value.projectId }
      : EMPTY_PROMOCODE;
  } catch {
    return EMPTY_PROMOCODE;
  }
};

/** Без кода запись удаляется; хранилище недоступно (приватный режим) — код живёт до перезагрузки */
export const writePromocode = ({ code, projectId }: IPromocodeState) => {
  try {
    if (code) {
      const value: IPromocodeTarget = { code, projectId };
      window.sessionStorage.setItem(
        PROMOCODE_STORAGE_KEY,
        JSON.stringify(value),
      );
    } else {
      window.sessionStorage.removeItem(PROMOCODE_STORAGE_KEY);
    }
  } catch {
    // Хранилище недоступно — промокод остаётся только в store
  }
};
