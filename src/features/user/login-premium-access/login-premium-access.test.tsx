import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { LoginPremiumAccess } from "./login-premium-access";

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

// Переводов в тестах нет: списки (returnObjects) — пустой массив, строки — ключ
vi.mock("react-i18next", async (importOriginal) => ({
  ...(await importOriginal<typeof import("react-i18next")>()),
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) =>
      options?.returnObjects ? [] : key,
    i18n: { language: "ru" },
  }),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("LoginPremiumAccess analytics (спека 005 Q14)", () => {
  it("a controlled window: gate_shown when it opens, gate_click on the top-up link", async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <LoginPremiumAccess open onOpenChange={vi.fn()} />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() =>
      expect(analytics.track).toHaveBeenCalledWith({
        t: "gate_shown",
        n: "premium_access",
        e: "channel",
        id: "",
      }),
    );

    fireEvent.click(screen.getByRole("link"));
    expect(analytics.track).toHaveBeenCalledWith({
      t: "gate_click",
      n: "premium_access",
      e: "channel",
      id: "",
    });
  });
});
