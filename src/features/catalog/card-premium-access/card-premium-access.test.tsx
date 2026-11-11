import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { CardPremiumAccess } from "./card-premium-access";

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

const gates = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string })
    .filter((event) => event.t.startsWith("gate_"));

afterEach(() => {
  vi.clearAllMocks();
});

describe("CardPremiumAccess analytics (спека 005 Q14)", () => {
  it("the premium banner over the catalog: gate_shown premium_access when shown, gate_click on the top-up link", () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CardPremiumAccess />
        </MemoryRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByRole("link"));

    expect(gates()).toEqual([
      { t: "gate_shown", n: "premium_access", e: "channel", id: "" },
      { t: "gate_click", n: "premium_access", e: "channel", id: "" },
    ]);
  });
});
