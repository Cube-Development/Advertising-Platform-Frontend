import { afterEach, describe, expect, it, vi } from "vitest";
import type { Tracker } from "./core";

const FAKE: Tracker = {
  page: vi.fn(),
  track: vi.fn(),
  identify: vi.fn(),
  logout: vi.fn(),
  flush: vi.fn(),
  destroy: vi.fn(),
};

/** Ядро подменяется до импорта обвязки: модули сбрасываются */
async function loadWithFakeCore() {
  vi.resetModules();
  const createTracker = vi.fn(() => FAKE);
  vi.doMock("./core", async (importOriginal) => ({
    ...(await importOriginal<typeof import("./core")>()),
    createTracker,
  }));
  const analytics = await import("./index");
  return { createTracker, ...analytics };
}

afterEach(() => {
  vi.doUnmock("./core");
  document.cookie = "guest_id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
});

describe("getAnalytics (спека 005 FR-003)", () => {
  it("creates one tracker of app marketplace that ignores /admin, with the guest cookie and the context", async () => {
    const { createTracker, getAnalytics, setAnalyticsContext } =
      await loadWithFakeCore();

    expect(getAnalytics()).toBe(FAKE);
    expect(getAnalytics()).toBe(FAKE);
    expect(createTracker).toHaveBeenCalledTimes(1);

    const options = (
      createTracker.mock.calls as unknown as Array<
        [Parameters<typeof import("./core").createTracker>[0]]
      >
    )[0]?.[0];
    // В тестах нет define из vite.config.ts — релиз пустой
    expect(options).toMatchObject({ app: "marketplace", release: "" });
    expect(options?.ignorePath?.("/admin/users")).toBe(true);
    expect(options?.ignorePath?.("/catalog")).toBe(false);
    expect(options?.getContext()).toEqual({
      lang: "ru",
      role: "guest",
      tg: false,
    });

    setAnalyticsContext({ lang: "uz", role: "blogger", tg: true });
    expect(options?.getContext()).toEqual({
      lang: "uz",
      role: "blogger",
      tg: true,
    });

    expect(options?.getGuestId?.()).toBeNull();
    document.cookie = "guest_id=7c9e6679-7425-40de-944b-e07fc1f90ae7; Path=/";
    expect(options?.getGuestId?.()).toBe(
      "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    );
  });
});
