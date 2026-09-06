import { platformTypesNum } from "@entities/platform";
import {
  sortingFilter,
  useGetAuthCatalogQuery,
  useGetCatalogQuery,
} from "@entities/project";
import { GenerateGuestId, useFindLanguage } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppSelector, useDebounce } from "@shared/hooks";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PATHS } from "@shared/routing";
import { formatMoney } from "@shared/utils";
import Cookies from "js-cookie";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCompactNumber } from "../model/use-compact-number";
import {
  ActionList,
  ActionRow,
  ActionTabs,
  CHAT_ACTION_PAGE_SIZE,
} from "../ui";
import { ActionShell } from "../ui/action-shell";

// Названия платформ не переводятся. Варианта «все платформы» нет намеренно:
// /sample требует filter.platform, как и страница каталога, где по умолчанию
// выбран Telegram.
const PLATFORM_TABS: { value: platformTypesNum; label: string }[] = [
  { value: platformTypesNum.telegram, label: "Telegram" },
  { value: platformTypesNum.instagram, label: "Instagram" },
  { value: platformTypesNum.youtube, label: "YouTube" },
];

/**
 * Подбор каналов прямо в панели — главный экшен.
 *
 * Небольшой срез каталога: поиск, платформа и первые несколько совпадений.
 * `elements_on_page` равен CHAT_ACTION_PAGE_SIZE, а не
 * `INTERSECTION_ELEMENTS.CATALOG`, поэтому запись в кэше RTK Query своя и
 * рефетч страницы каталога отсюда не спровоцировать. Полный набор фильтров
 * живёт в `catalog-full`.
 *
 * Тело запроса повторяет страницу каталога: /sample отвергает частичный filter
 * с 422 — обязательны platform, business, age, language, region и sort, а
 * авторизованный вариант ещё требует user_id.
 */
const CatalogSearchAction = () => {
  const { t } = useTranslation();
  const compact = useCompactNumber();
  const language = useFindLanguage();
  const { isAuth } = useAppSelector((state) => state.user);
  const userId = Cookies.get(ENUM_COOKIES_TYPES.USER_ID);
  const [guestId, setGuestId] = useState(() =>
    Cookies.get(ENUM_COOKIES_TYPES.GUEST_ID),
  );

  // Публичный /sample/public без guest_id отвечает 422. Кука общая на всё
  // приложение — это тот же идентификатор, который завёл бы каталог при первом
  // заходе. Создаём в эффекте, а не в фазе рендера, как это делает страница.
  useEffect(() => {
    if (isAuth || guestId) return;
    setGuestId(GenerateGuestId());
  }, [isAuth, guestId]);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<platformTypesNum>(
    platformTypesNum.telegram,
  );
  const debouncedSearch = useDebounce(search, 500);

  const params = useMemo(
    () => ({
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      page: 1,
      elements_on_page: CHAT_ACTION_PAGE_SIZE,
      filter: {
        platform,
        business: [],
        age: [],
        language: [],
        region: [],
      },
      sort: sortingFilter.match,
      search_string: debouncedSearch || undefined,
    }),
    [language?.id, platform, debouncedSearch],
  );

  const authQuery = useGetAuthCatalogQuery(
    { ...params, user_id: userId },
    { skip: !isAuth || !userId },
  );
  const publicQuery = useGetCatalogQuery(
    { ...params, guest_id: guestId },
    { skip: isAuth || !guestId },
  );
  const source = isAuth ? authQuery : publicQuery;

  const channels = source.data?.channels ?? [];

  return (
    <ActionShell
      title={t("chat_actions.catalog.title", "Подбор каналов")}
      subtitle={t(
        "chat_actions.catalog.subtitle",
        "Telegram, Instagram и YouTube для рекламы",
      )}
      isLoading={source.isLoading || source.isFetching}
      isError={source.isError}
      onRetry={source.refetch}
      isEmpty={!source.isLoading && !source.isFetching && channels.length === 0}
      emptyText={t(
        "chat_actions.catalog.empty",
        "Ничего не нашлось — попробуйте изменить запрос",
      )}
      cta={{
        to: ENUM_PATHS.CATALOG,
        label: t("chat_actions.catalog.cta", "Весь каталог"),
      }}
      footerSlot={
        source.data?.elements
          ? t("chat_actions.catalog.found", {
              defaultValue: "Найдено: {{count}}",
              count: source.data.elements,
            })
          : undefined
      }
      toolbar={
        <>
          <label className="grid grid-cols-[auto,1fr] items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:border-blue-600">
            <Search className="size-4 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t(
                "chat_actions.catalog.search_placeholder",
                "Название или тематика канала",
              )}
              className="min-w-0 bg-transparent text-xs outline-none"
            />
          </label>
          <ActionTabs
            value={String(platform)}
            onChange={(value) => setPlatform(Number(value) as platformTypesNum)}
            tabs={PLATFORM_TABS.map((tab) => ({
              value: String(tab.value),
              label: tab.label,
            }))}
          />
        </>
      }
    >
      <ActionList>
        {channels.map((channel) => (
          <ActionRow
            key={channel.id}
            title={channel.name}
            subtitle={`${channel.category} · ${compact(channel.subscribers)}`}
            meta={
              channel.format?.[0]?.price
                ? formatMoney(channel.format[0].price)
                : undefined
            }
            leading={
              channel.avatar ? (
                <img
                  src={channel.avatar}
                  alt=""
                  className="size-8 shrink-0 rounded-full object-cover"
                />
              ) : undefined
            }
          />
        ))}
      </ActionList>
    </ActionShell>
  );
};

export default CatalogSearchAction;
