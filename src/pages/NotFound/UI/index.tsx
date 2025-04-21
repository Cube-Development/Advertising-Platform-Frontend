import { useClearCookiesOnPage } from "@shared/hooks";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NotFoundPage: FC = () => {
  const { t } = useTranslation();
  useClearCookiesOnPage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="font-bold text-purple-600 text-9xl md:text-7xl">404</h1>
      <p className="mt-4 text-2xl text-gray-700">
        {t("not_found.description")}
      </p>
      <a
        href="/"
        className="px-6 py-3 mt-6 text-lg font-medium text-white transition duration-300 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
      >
        {t("not_found.home_link")}
      </a>
    </div>
  );
};
