import { useAppSelector } from "@shared/hooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetProfileQuery } from "../api";
import { Languages } from "@shared/config";

export const LanguageDetector = () => {
  const { i18n } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);
  const { data } = useGetProfileQuery(undefined, {
    skip: !isAuth,
  });
  useEffect(() => {
    if (isAuth && data) {
      const selectedLanguage = Languages.find(
        (lang) => lang.id === data?.user_additional?.language,
      );
      i18n.changeLanguage(selectedLanguage?.name?.toLocaleLowerCase());
    } else {
      const currentLang = i18n.language.split("-");
      i18n.changeLanguage(currentLang[0]);
    }
  }, []);
  return <></>;
};
