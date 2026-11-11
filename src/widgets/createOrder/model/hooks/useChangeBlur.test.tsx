import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { useChangeBlur } from "./useChangeBlur";

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

const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

const orderSteps = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string })
    .filter((event) => event.t === "order_step");

beforeAll(() => {
  // jsdom не умеет прокрутку
  window.scrollTo = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
  window.location.hash = "";
});

describe("useChangeBlur analytics (спека 005 Q17)", () => {
  it("order_step on the first opening of a section, numbered post 1 … payment 4; a second opening sends nothing", () => {
    const { result } = renderHook(() => useChangeBlur(), { wrapper });
    expect(orderSteps()).toEqual([]);

    act(() => result.current.handleOnChangeBlur("post"));
    act(() => result.current.handleOnChangeBlur("prices"));
    act(() => result.current.handleOnChangeBlur("post"));

    expect(orderSteps()).toEqual([
      { t: "order_step", n: "post", num: 1 },
      { t: "order_step", n: "prices", num: 3 },
    ]);
  });

  it("an anchor of a section opens all of them: order_step for each in order", () => {
    window.location.hash = "#payment";
    renderHook(() => useChangeBlur(), { wrapper });

    expect(orderSteps()).toEqual([
      { t: "order_step", n: "post", num: 1 },
      { t: "order_step", n: "datetime", num: 2 },
      { t: "order_step", n: "prices", num: 3 },
      { t: "order_step", n: "payment", num: 4 },
    ]);
  });
});
