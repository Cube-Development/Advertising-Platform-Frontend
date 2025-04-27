import { USER_LANGUAGES_LIST } from "@shared/languages";
import { useTranslation } from "react-i18next";

export const useFindLanguage = () => {
  const { i18n } = useTranslation();
  const language =
    USER_LANGUAGES_LIST.find((lang) => {
      return i18n.language === lang.name.toLocaleLowerCase();
    }) || USER_LANGUAGES_LIST[0];
  return language;
};
