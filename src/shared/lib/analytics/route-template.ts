import { PAGE_TYPES } from "./core/generated/contract-lite";

/** Шаблон страницы 404 Marketplace в таблице типов страниц (план 5.4) */
const NOT_FOUND = "*";

/** Шаблоны Marketplace из contract-lite: `:param` — ровно один сегмент пути */
const PATTERNS = PAGE_TYPES.flatMap((entry) => [...entry.marketplace])
  .filter((template) => template !== NOT_FOUND)
  .map((template) => ({
    template,
    pattern: new RegExp(`^${template.replace(/:[^/]+/g, "[^/]+")}/?$`),
  }));

/**
 * Путь → шаблон маршрута для `rt` события; пути вне таблицы (404, /admin) — `*`
 * (спека 005 FR-002)
 */
export const toRouteTemplate = (path: string): string =>
  PATTERNS.find(({ pattern }) => pattern.test(path))?.template ?? NOT_FOUND;
