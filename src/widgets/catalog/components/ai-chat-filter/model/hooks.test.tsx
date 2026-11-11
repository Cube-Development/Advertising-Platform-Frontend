import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { useAiChatFilter } from "./hooks";

const analytics = vi.hoisted(() => ({ track: vi.fn() }));
const centrifuge = vi.hoisted(() => ({ publish: vi.fn() }));

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

vi.mock("@shared/api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@shared/api")>()),
  useCentrifuge: () => ({ centrifuge, OrderMessageNewChat: vi.fn() }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={setupStore()}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

const aiFilters = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string })
    .filter((event) => event.t === "ai_filter");

afterEach(() => {
  vi.clearAllMocks();
});

describe("useAiChatFilter analytics (спека 005 Q16)", () => {
  it("a prompt sent to the AI chat: ai_filter ok with its length; a failed send: ok=false", async () => {
    const { result } = renderHook(() => useAiChatFilter(vi.fn()), { wrapper });

    act(() => result.current.setInput("каналы про технологии"));
    await act(() => result.current.handleSubmit());
    centrifuge.publish.mockRejectedValueOnce(new Error("socket is closed"));
    act(() => result.current.setInput("abc"));
    await act(() => result.current.handleSubmit());

    expect(aiFilters()).toEqual([
      { t: "ai_filter", ok: true, num: "каналы про технологии".length },
      { t: "ai_filter", ok: false, num: 3 },
    ]);
  });
});
