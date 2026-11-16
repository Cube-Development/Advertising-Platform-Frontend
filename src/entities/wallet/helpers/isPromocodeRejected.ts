/** Не отказ кода: 401 разлогинит, 408/429 — повторить позже */
const NOT_REJECTION_STATUSES = [401, 408, 429];

/**
 * Проверка промокода отвергла код: ответ 4xx — запрос проверяет только код.
 * Сеть, таймаут, 5xx — не отказ: код ещё может быть рабочим.
 * Причину для тоста даёт `getPromocodeError` (незнакомый текст — общая ошибка)
 */
export const isPromocodeRejected = (error: unknown): boolean => {
  const status = (error as { status?: unknown } | null)?.status;
  return (
    typeof status === "number" &&
    status >= 400 &&
    status < 500 &&
    !NOT_REJECTION_STATUSES.includes(status)
  );
};
