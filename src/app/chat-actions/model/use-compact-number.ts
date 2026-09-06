import { useCallback } from "react";
import { useTranslation } from "react-i18next";

/**
 * Компактная запись больших чисел («128 тыс.», «128 ming») в языке интерфейса.
 *
 * Жёстко зашитая локаль здесь заметна: панель открывается поверх узбекского
 * или английского интерфейса, и «тыс.» посреди узбекского текста выглядит
 * ошибкой перевода.
 */
export const useCompactNumber = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language || "ru";

  return useCallback(
    (value?: number) =>
      new Intl.NumberFormat(locale, { notation: "compact" }).format(value ?? 0),
    [locale],
  );
};
