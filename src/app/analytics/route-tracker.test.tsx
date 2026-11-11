import { act, render } from "@testing-library/react";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ENUM_ROLES, userSlice } from "@entities/user";
import { setupStore } from "@app/providers/store";
import { AnalyticsRouteTracker } from "./route-tracker";

const analytics = vi.hoisted(() => ({
  page: vi.fn(),
  identify: vi.fn(),
  setAnalyticsContext: vi.fn(),
}));

vi.mock("@shared/lib/analytics", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@shared/lib/analytics")>()),
  setAnalyticsContext: analytics.setAnalyticsContext,
  getAnalytics: () => ({
    page: analytics.page,
    identify: analytics.identify,
    track: vi.fn(),
    logout: vi.fn(),
    flush: vi.fn(),
    destroy: vi.fn(),
  }),
}));

const renderAt = (path: string, store = setupStore()) => {
  const router = createMemoryRouter(
    [{ path: "*", element: <AnalyticsRouteTracker /> }],
    { initialEntries: [path] },
  );
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
  return router;
};

afterEach(() => {
  vi.clearAllMocks();
  Cookies.remove("user_id");
  delete (window as { Telegram?: unknown }).Telegram;
});

describe("AnalyticsRouteTracker (спека 005 FR-003, FR-004)", () => {
  it("a guest: page() with the route template on each path, role guest, no identify", async () => {
    const store = setupStore();
    store.dispatch(userSlice.actions.logout());
    const router = renderAt("/channel/7", store);
    await act(() => router.navigate("/catalog"));

    expect(analytics.page.mock.calls.map(([view]) => view)).toEqual([
      { path: "/channel/7", route: "/channel/:id" },
      { path: "/catalog", route: "/catalog" },
    ]);
    expect(analytics.setAnalyticsContext).toHaveBeenLastCalledWith({
      lang: "ru",
      role: "guest",
      tg: false,
    });
    expect(analytics.identify).not.toHaveBeenCalled();
  });

  it("a signed-in blogger in Telegram: identify with the user_id cookie, role and tg in the context", () => {
    const store = setupStore();
    store.dispatch(userSlice.actions.login());
    store.dispatch(userSlice.actions.toggleRole(ENUM_ROLES.BLOGGER));
    Cookies.set("user_id", "3f2b8c1e-9d4a-4b6c-8e7f-0a1b2c3d4e5f");
    (window as { Telegram?: unknown }).Telegram = {
      WebApp: { initData: "query_id=1" },
    };
    renderAt("/project/42", store);

    expect(analytics.identify).toHaveBeenCalledWith(
      "3f2b8c1e-9d4a-4b6c-8e7f-0a1b2c3d4e5f",
    );
    expect(analytics.setAnalyticsContext).toHaveBeenLastCalledWith({
      lang: "ru",
      role: "blogger",
      tg: true,
    });
    expect(analytics.page).toHaveBeenCalledWith({
      path: "/project/42",
      route: "/project/:project_id",
    });
  });

  it("a role outside the contract (manager) goes as guest", () => {
    const store = setupStore();
    store.dispatch(userSlice.actions.login());
    store.dispatch(userSlice.actions.toggleRole(ENUM_ROLES.MANAGER));
    renderAt("/catalog", store);

    expect(analytics.setAnalyticsContext).toHaveBeenLastCalledWith({
      lang: "ru",
      role: "guest",
      tg: false,
    });
  });
});
