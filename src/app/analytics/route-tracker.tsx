import { USER_ROLES } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import {
  getAnalytics,
  setAnalyticsContext,
  toRouteTemplate,
  type TrackerContext,
} from "@shared/lib/analytics";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const LANGS: readonly string[] = ["uz", "ru", "en"];

/** Язык интерфейса → язык события (uz | ru | en), иначе ru */
const toLang = (language: string | undefined): TrackerContext["lang"] => {
  const short = (language ?? "").slice(0, 2);
  return (LANGS.includes(short) ? short : "ru") as TrackerContext["lang"];
};

/**
 * Поведенческая аналитика (спека 005 FR-003, FR-004): контекст событий, просмотр на
 * каждую смену пути, identify вошедшего по куке user_id. Элемент корневого маршрута
 * рядом с ChatActions — под RootAdminLayout не подключается
 */
export const AnalyticsRouteTracker = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { isAuth, role } = useAppSelector((state) => state.user);
  const lang = toLang(i18n.language);
  const tg = Boolean(window.Telegram?.WebApp?.initData);
  // Роли вне сайта (менеджер, модератор, агентство) — вне контракта событий
  const contextRole =
    isAuth && USER_ROLES.includes(role)
      ? (role as TrackerContext["role"])
      : "guest";
  const userId = isAuth ? Cookies.get(ENUM_COOKIES_TYPES.USER_ID) : undefined;

  // Контекст — раньше просмотра: эффекты идут в порядке объявления
  useEffect(() => {
    setAnalyticsContext({ lang, role: contextRole, tg });
  }, [lang, contextRole, tg]);

  useEffect(() => {
    getAnalytics().page({ path: pathname, route: toRouteTemplate(pathname) });
  }, [pathname]);

  useEffect(() => {
    if (userId) getAnalytics().identify(userId);
  }, [userId]);

  return null;
};
