import { Languages } from "@shared/config";
import { useTranslation } from "react-i18next";

export const useFindLanguage = () => {
  const { i18n } = useTranslation();
  const language =
    Languages.find((lang) => {
      return i18n.language === lang.name.toLocaleLowerCase();
    }) || Languages[0];
  return language;
};
