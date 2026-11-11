import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import type { ICatalogChannel } from "@entities/project";
import { CartList } from ".";

// Карточка — не предмет теста: разметку ставит список
vi.mock("@features/catalog", async (importOriginal) => {
  const { createElement } = await import("react");
  return {
    ...(await importOriginal<typeof import("@features/catalog")>()),
    CatalogCard: ({ card }: { card: ICatalogChannel }) =>
      createElement("article", null, card.id),
  };
});

// Переводов в тестах нет: списки (returnObjects) — пустой массив, строки — ключ
vi.mock("react-i18next", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-i18next")>()),
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) =>
      options?.returnObjects ? [] : key,
    i18n: { language: "ru" },
  }),
}));

describe("CartList marks (спека 005 Q13)", () => {
  it("the cart list is marked cart with the positions of its cards", () => {
    const { container } = render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CartList
            channels={["a", "b"].map((id) => ({ id }) as ICatalogChannel)}
            onChangeCard={vi.fn()}
            isLoading={false}
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      [...container.querySelectorAll('[data-bx-list="cart"] [data-bx-ch]')].map(
        (card) =>
          `${card.getAttribute("data-bx-ch")}#${card.getAttribute("data-bx-pos")}`,
      ),
    ).toEqual(["a#1", "b#2"]);
  });
});
