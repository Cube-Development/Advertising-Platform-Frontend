import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { platformTypesNum } from "@entities/platform";
import {
  CATALOG_FILTER,
  sortingFilter,
  type getCatalogReq,
  type ICatalogChannel,
} from "@entities/project";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { CatalogList } from ".";

// Карточка и панель параметров — не предмет теста: разметку ставит список
vi.mock("@features/catalog", async (importOriginal) => {
  const { createElement } = await import("react");
  const Card = ({ card }: { card: ICatalogChannel }) =>
    createElement("article", null, card.id);
  return {
    ...(await importOriginal<typeof import("@features/catalog")>()),
    CatalogCard: Card,
    CompactCatalogCard: Card,
  };
});
vi.mock("../parametersFilter", () => ({ ParametersFilter: () => null }));

// Переводов в тестах нет: списки (returnObjects) — пустой массив, строки — ключ
vi.mock("react-i18next", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-i18next")>()),
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) =>
      options?.returnObjects ? [] : key,
    i18n: { language: "ru" },
  }),
}));

const ARGS: getCatalogReq = {
  language: ENUM_LANGUAGES_NUM.RU,
  page: 1,
  elements_on_page: 30,
  filter: { platform: platformTypesNum.telegram },
  sort: sortingFilter.match,
};

/** В тесте карточке нужен только id */
const channels = (ids: string[]) =>
  ids.map((id) => ({ id }) as ICatalogChannel);

const wrap = (children: ReactNode) => (
  <Provider store={setupStore()}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

const renderList = (list: ICatalogChannel[], page: number) =>
  wrap(
    <CatalogList
      channels={list}
      all_channels_count={40}
      setValue={vi.fn()}
      reset={vi.fn()}
      formState={{ ...ARGS, page }}
      resetField={vi.fn()}
      page={page}
      onChangeCard={vi.fn()}
      isLast={false}
      isLoading={false}
      catalogFilter={CATALOG_FILTER.PARAMETERS}
      changeCatalogFilter={vi.fn()}
      haveMore={false}
    />,
  );

const marked = (container: HTMLElement, list: string) =>
  [...container.querySelectorAll(`[data-bx-list="${list}"] [data-bx-ch]`)].map(
    (card) =>
      `${card.getAttribute("data-bx-ch")}#${card.getAttribute("data-bx-pos")}`,
  );

describe("CatalogList marks (спека 005 Q13)", () => {
  it("the list is marked catalog; card positions run through the loaded pages", () => {
    const first = channels(["a", "b", "c"]);
    const { container, rerender } = render(renderList(first, 1));
    expect(marked(container, "catalog")).toEqual(["a#1", "b#2", "c#3"]);

    rerender(renderList([...first, ...channels(["d", "e"])], 2));
    expect(marked(container, "catalog")).toEqual([
      "a#1",
      "b#2",
      "c#3",
      "d#4",
      "e#5",
    ]);
  });
});
