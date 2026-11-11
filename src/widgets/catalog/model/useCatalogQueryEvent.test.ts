import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
// Стор — первым: барели сущностей без него ловят старый цикл shared/config/i18n → entities/user → shared/api
import "@app/providers/store";
import { platformTypesNum } from "@entities/platform";
import {
  sortingFilter,
  type getCatalogReq,
  type ICatalogCards,
} from "@entities/project";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { applyAiFilter, useCatalogQueryEvent } from "./useCatalogQueryEvent";

const analytics = vi.hoisted(() => ({ track: vi.fn() }));

vi.mock("@shared/lib/analytics", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@shared/lib/analytics")>()),
  getAnalytics: () => ({
    track: analytics.track,
    page: vi.fn(),
    identify: vi.fn(),
    logout: vi.fn(),
    flush: vi.fn(),
    destroy: vi.fn(),
  }),
}));

const ARGS: getCatalogReq = {
  language: ENUM_LANGUAGES_NUM.RU,
  page: 1,
  elements_on_page: 30,
  filter: {
    platform: platformTypesNum.telegram,
    business: [3],
    region: [],
    language: [2],
    age: [],
    male: 40,
    female: 60,
  },
  sort: sortingFilter.match,
  search_string: "",
};
const DATA: ICatalogCards = {
  page: 1,
  elements: 1277,
  channels: [],
  onChangeCard: () => undefined,
};

interface IProps {
  query: Parameters<typeof useCatalogQueryEvent>[0];
  requested: getCatalogReq;
}

const renderEvent = (initialProps: IProps) =>
  renderHook<void, IProps>(
    ({ query, requested }) => useCatalogQueryEvent(query, requested),
    { initialProps },
  );

/** Ответ на запрошенный набор пришёл */
const loaded = (args: getCatalogReq, data = DATA): IProps => ({
  query: { originalArgs: args, data, isFetching: false, isError: false },
  requested: args,
});

/** Запрос набора в пути; в записи кеша (ключ — платформа) пока прошлая выдача */
const fetching = (args: getCatalogReq, data?: ICatalogCards): IProps => ({
  query: { originalArgs: args, data, isFetching: true, isError: false },
  requested: args,
});

const catalogQueries = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string; num?: number })
    .filter((event) => event.t === "catalog_query");

afterEach(() => {
  vi.clearAllMocks();
});

describe("useCatalogQueryEvent (спека 005 Q12)", () => {
  it("one catalog_query when the response for the requested set arrives; a refetch and the next pages do not repeat it", () => {
    const { rerender } = renderEvent(fetching(ARGS));
    expect(catalogQueries()).toEqual([]);

    rerender(loaded(ARGS));
    expect(catalogQueries()).toEqual([
      {
        t: "catalog_query",
        n: "parameters",
        num: 1277,
        v: "match",
        f: { pl: 1, bu: [3], re: [], la: [2], ag: [], ma: 40, s: false, sl: 0 },
      },
    ]);

    // refetchOnMountOrArgChange — те же аргументы; следующая страница ленты
    rerender(fetching({ ...ARGS }, DATA));
    rerender(loaded({ ...ARGS }, { ...DATA }));
    const page2 = { ...ARGS, page: 2 };
    rerender(fetching(page2, DATA));
    rerender(loaded(page2));
    expect(catalogQueries()).toHaveLength(1);
  });

  it("a new set is a new catalog_query: the search goes as s/sl; a filter from the AI search is n=ai", () => {
    const { rerender } = renderEvent(loaded(ARGS));
    rerender(loaded({ ...ARGS, search_string: ["@news", "t.me/tech"] }));
    const filter = applyAiFilter(ARGS.filter, { region: [7] });
    rerender(loaded({ ...ARGS, filter }));

    expect(catalogQueries()).toEqual([
      expect.objectContaining({ n: "parameters" }),
      expect.objectContaining({
        n: "parameters",
        f: expect.objectContaining({ s: true, sl: "@news t.me/tech".length }),
      }),
      expect.objectContaining({
        n: "ai",
        f: expect.objectContaining({ re: [7] }),
      }),
    ]);
  });

  it("an AI filter marks the set only when it changes the filter", () => {
    const sort = sortingFilter.price_up;
    const { rerender } = renderEvent(loaded(ARGS));

    // AI вернул уже стоящие параметры: набор тот же, метки нет — ручная сортировка остаётся parameters
    expect(applyAiFilter(ARGS.filter, { business: [3] })).toEqual(ARGS.filter);
    rerender(loaded({ ...ARGS, sort }));

    // AI поменял фильтр — его набор n=ai
    const filter = applyAiFilter(ARGS.filter, { region: [7] });
    rerender(loaded({ ...ARGS, sort, filter }));

    expect(catalogQueries()).toEqual([
      expect.objectContaining({ n: "parameters", v: "match" }),
      expect.objectContaining({ n: "parameters", v: "price_up" }),
      expect.objectContaining({
        n: "ai",
        f: expect.objectContaining({ re: [7] }),
      }),
    ]);
  });

  it("a failed request is not a catalog_query, and its AI mark does not pass to a manual set", () => {
    const { rerender } = renderEvent(loaded(ARGS));

    // AI-набор упал: в записи кеша осталась выдача прошлого набора
    const aiArgs = {
      ...ARGS,
      filter: applyAiFilter(ARGS.filter, { region: [7] }),
    };
    rerender(fetching(aiArgs, DATA));
    rerender({
      query: {
        originalArgs: aiArgs,
        data: DATA,
        isFetching: false,
        isError: true,
      },
      requested: aiArgs,
    });

    // Ручной набор с другим фильтром
    const manual = { ...ARGS, filter: { ...ARGS.filter, age: [2] } };
    rerender(fetching(manual, DATA));
    rerender(loaded(manual, { ...DATA, elements: 15 }));

    expect(catalogQueries()).toEqual([
      expect.objectContaining({ n: "parameters", num: 1277 }),
      expect.objectContaining({
        n: "parameters",
        num: 15,
        f: expect.objectContaining({ ag: [2] }),
      }),
    ]);
  });

  it("a stale cache entry of the platform (other arguments than requested) is not a catalog_query", () => {
    const telegramF2 = { ...ARGS, filter: { ...ARGS.filter, business: [9] } };
    const instagramF2 = {
      ...telegramF2,
      filter: { ...telegramF2.filter, platform: platformTypesNum.instagram },
    };
    const { rerender } = renderEvent(loaded(ARGS));
    rerender(fetching(instagramF2));
    rerender(loaded(instagramF2, { ...DATA, elements: 40 }));

    // Назад на Telegram: в первом рендере — старая запись Telegram (первый фильтр), запрошен второй
    rerender({
      query: {
        originalArgs: ARGS,
        data: DATA,
        isFetching: false,
        isError: false,
      },
      requested: telegramF2,
    });
    rerender(fetching(telegramF2, DATA));
    rerender(loaded(telegramF2, { ...DATA, elements: 300 }));

    expect(catalogQueries().map((event) => event.num)).toEqual([1277, 40, 300]);
  });

  it("a return to the catalog with a scrolled feed: the new mount sends its set", () => {
    renderEvent(loaded({ ...ARGS, page: 3 }));

    expect(catalogQueries()).toEqual([
      expect.objectContaining({ n: "parameters", num: 1277 }),
    ]);
  });
});
