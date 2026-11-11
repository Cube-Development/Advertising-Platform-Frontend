import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginToViewMore } from "./login-to-view-more";

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

afterEach(() => {
  vi.clearAllMocks();
});

describe("LoginToViewMore analytics (спека 005 Q14)", () => {
  it("gate_shown when the window opens, gate_click on registration, with the channel id", async () => {
    render(
      <MemoryRouter>
        <LoginToViewMore
          channelId="ch-7"
          trigger={<button type="button">open</button>}
        />
      </MemoryRouter>,
    );
    expect(analytics.track).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "open" }));
    await waitFor(() =>
      expect(analytics.track).toHaveBeenCalledWith({
        t: "gate_shown",
        n: "login_to_view",
        e: "channel",
        id: "ch-7",
      }),
    );

    fireEvent.click(screen.getByRole("link"));
    expect(analytics.track).toHaveBeenCalledWith({
      t: "gate_click",
      n: "login_to_view",
      e: "channel",
      id: "ch-7",
    });
  });
});
