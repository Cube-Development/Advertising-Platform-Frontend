import { ENUM_PATHS } from "@shared/routing";
import { useLocation } from "react-router-dom";

/**
 * Страницы, на которых показывается ИИ-чат.
 *
 * Виджет и его экшены живут только на двух главных — рекламодателя и блогера.
 * На остальных страницах пользователь пришёл делать конкретное дело, и
 * плавающая строка чата там только мешает.
 */
export const CHAT_ROUTES: string[] = [ENUM_PATHS.MAIN, ENUM_PATHS.MAIN_BLOGGER];

/** Точное совпадение пути: вложенные роуты чат не наследуют. */
export const isChatRoute = (pathname: string): boolean => {
  // "/blogger/" и "/blogger" — один и тот же роут, а "/" трогать нельзя.
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return CHAT_ROUTES.includes(normalized);
};

/** Показывать ли ИИ-чат на текущей странице. */
export const useIsChatRoute = (): boolean =>
  isChatRoute(useLocation().pathname);
