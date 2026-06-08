import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Одноразовая миграция: при первом заходе после деплоя принудительно
// ставим узбекский язык всем (включая тех, у кого в localStorage остался
// старый язык от браузерного детекта). Дальнейший выбор юзера сохраняется.
const LANG_DEFAULT_UZ_MIGRATION_KEY = "lang_default_uz_migrated";
if (!localStorage.getItem(LANG_DEFAULT_UZ_MIGRATION_KEY)) {
  localStorage.setItem("i18nextLng", "uz");
  localStorage.setItem(LANG_DEFAULT_UZ_MIGRATION_KEY, "true");
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // При первом заходе (нет сохранённого языка) по умолчанию узбекский,
    // ru — резервный язык для недостающих переводов.
    fallbackLng: ["uz", "ru"],
    debug: true,

    detection: {
      // Берём язык только из сохранённого выбора юзера, игнорируем язык браузера.
      order: ["localStorage", "querystring"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
