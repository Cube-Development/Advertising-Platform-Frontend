import { useEffect, useRef } from "react";
import type {
  getCatalogReq,
  ICatalogCards,
  ICatalogFilter,
} from "@entities/project";
import { getAnalytics } from "@shared/lib/analytics";

interface ICatalogQueryResult {
  /** Аргументы записи кеша: ключ кеша каталога — платформа, поэтому они бывают чужими */
  originalArgs?: getCatalogReq;
  data?: ICatalogCards;
  isFetching: boolean;
  isError: boolean;
}

/** Набор аргументов, отличающий один запрос каталога от другого: страница ленты в него не входит */
const setOf = ({ filter, sort, search_string }: getCatalogReq): string =>
  JSON.stringify({ filter, sort, search_string });

/** Фильтр, который применил AI-подбор: набор с ним — `n = ai` */
let aiFilter: string | null = null;

/**
 * Параметры AI-подбора поверх текущего фильтра (спека 005 Q12). Метка — только если фильтр меняется:
 * иначе нового набора нет, и метка досталась бы следующему ручному запросу
 */
export const applyAiFilter = (
  current: ICatalogFilter | undefined,
  value: ICatalogFilter,
): ICatalogFilter => {
  const next = { ...current, ...value };
  if (JSON.stringify(next) !== JSON.stringify(current)) {
    aiFilter = JSON.stringify(next);
  }
  return next;
};

const searchText = (search: getCatalogReq["search_string"]): string =>
  (Array.isArray(search) ? search.join(" ") : (search ?? "")).trim();

/**
 * catalog_query (спека 005 Q12, план 11.4): пришёл ответ на запрошенный набор аргументов (`filter`,
 * `sort`, `search_string`). Повторов не дают refetch и следующие страницы ленты; новый заход в каталог —
 * новое событие, как в blogix. Не событие: ошибка запроса (в записи кеша остаётся прошлая выдача) и
 * запись кеша с чужими аргументами (та же платформа, прошлый фильтр)
 */
export const useCatalogQueryEvent = (
  { originalArgs, data, isFetching, isError }: ICatalogQueryResult,
  requested: getCatalogReq,
): void => {
  const sentSet = useRef<string | null>(null);
  const requestedSet = setOf(requested);

  useEffect(() => {
    if (!originalArgs || !data || isFetching || isError) return;
    const set = setOf(originalArgs);
    if (set !== requestedSet || set === sentSet.current) return;
    sentSet.current = set;

    const { filter, sort, search_string } = originalArgs;
    const search = searchText(search_string);
    const n = aiFilter === JSON.stringify(filter) ? "ai" : "parameters";
    aiFilter = null;
    getAnalytics().track({
      t: "catalog_query",
      n,
      num: data.elements,
      v: sort ?? "",
      f: {
        pl: filter?.platform ?? 0,
        bu: filter?.business ?? [],
        re: filter?.region ?? [],
        la: filter?.language ?? [],
        ag: filter?.age ?? [],
        ma: filter?.male ?? 0,
        s: search !== "",
        sl: search.length,
      },
    });
  }, [originalArgs, data, isFetching, isError, requestedSet]);
};
