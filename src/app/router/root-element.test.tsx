import { act, render } from "@testing-library/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { getAnalytics } from "@shared/lib/analytics";
import { RootElement } from "./root-element";

const calls = vi.hoisted((): string[] => []);

vi.mock("@shared/lib/analytics", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@shared/lib/analytics")>()),
  setAnalyticsContext: vi.fn(),
  getAnalytics: () => ({
    page: ({ path }: { path: string }) => calls.push(`page ${path}`),
    track: ({ t }: { t: string }) => calls.push(`track ${t}`),
    identify: vi.fn(),
    logout: vi.fn(),
    flush: vi.fn(),
    destroy: vi.fn(),
  }),
}));

// Макет сайта и чат — не предмет теста: макет только выводит страницу
vi.mock("@widgets/layouts", async () => {
  const { createElement } = await import("react");
  const { Outlet } = await import("react-router-dom");
  return { RootLayout: () => createElement(Outlet) };
});
vi.mock("../chat-actions", () => ({ ChatActions: () => null }));

/** Страница, которая шлёт событие при монтировании (как мастер заказа по якорю) */
const OrderPage = () => {
  useEffect(() => {
    getAnalytics().track({ t: "order_step", n: "post", num: 1 });
  }, []);
  return null;
};

afterEach(() => {
  calls.length = 0;
});

describe("RootElement (ревью S-M3: порядок трекера)", () => {
  it("an event from a mount effect of the new page goes after its page_view", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <RootElement />,
          children: [
            { path: "catalog", element: null },
            { path: "createorder", element: <OrderPage /> },
          ],
        },
      ],
      { initialEntries: ["/catalog"] },
    );
    render(
      <Provider store={setupStore()}>
        <RouterProvider router={router} />
      </Provider>,
    );
    await act(() => router.navigate("/createorder"));

    expect(calls).toEqual([
      "page /catalog",
      "page /createorder",
      "track order_step",
    ]);
  });
});
