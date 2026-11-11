import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import type { ICatalogChannel } from "@entities/project";
import { RecommendationList } from ".";

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

describe("RecommendationList marks (спека 005 Q13)", () => {
  it("shown recommendations are marked recommendations with the positions of their cards", () => {
    const { container } = render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <RecommendationList
            channels={["a", "b"].map((id) => ({ id }) as ICatalogChannel)}
            onChangeCard={vi.fn()}
          />
        </MemoryRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByText("cart.show"));

    expect(
      [
        ...container.querySelectorAll(
          '[data-bx-list="recommendations"] [data-bx-ch]',
        ),
      ].map(
        (card) =>
          `${card.getAttribute("data-bx-ch")}#${card.getAttribute("data-bx-pos")}`,
      ),
    ).toEqual(["a#1", "b#2"]);
  });
});
