import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { normalizeError } from "@shared/lib/analytics";
import { useGoogleAuthCallback } from "./useGoogleAuthCallback";

const analytics = vi.hoisted(() => ({ track: vi.fn() }));
const api = vi.hoisted(() => ({
  googleCallback: vi.fn(),
  getUser: vi.fn(),
  handleAuth: vi.fn(),
}));

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

vi.mock("@entities/user", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@entities/user")>()),
  useLazyGoogleCallbackQuery: () => [api.googleCallback],
  useGetUserMutation: () => [api.getUser],
}));

vi.mock("@features/useHandleAuth", () => ({
  useHandleAuth: () => ({ handleAuth: api.handleAuth }),
}));

const renderCallback = (search: string) =>
  renderHook(() => useGoogleAuthCallback(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={[`/oauth-callback${search}`]}>
          {children}
        </MemoryRouter>
      </Provider>
    ),
  });

const authEvents = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string })
    .filter((event) => event.t === "auth");

afterEach(() => {
  vi.clearAllMocks();
});

describe("useGoogleAuthCallback analytics (спека 005 Q15)", () => {
  it("a successful callback: auth n=google ok", async () => {
    api.googleCallback.mockReturnValue({ unwrap: () => Promise.resolve({}) });
    api.getUser.mockReturnValue({
      unwrap: () => Promise.resolve({ role: "advertiser", id: "u-1" }),
    });
    renderCallback("?code=c&state=s");

    await waitFor(() =>
      expect(authEvents()).toEqual([{ t: "auth", n: "google", ok: true }]),
    );
  });

  it("a failed callback: auth n=google ok=false with the normalized error", async () => {
    const error = { status: 400, data: { detail: "OAUTH_INVALID_STATE" } };
    api.googleCallback.mockReturnValue({
      unwrap: () => Promise.reject(error),
    });
    renderCallback("?code=c&state=s");

    await waitFor(() =>
      expect(authEvents()).toEqual([
        { t: "auth", n: "google", ok: false, v: normalizeError(error) },
      ]),
    );
  });

  it("the callback passed, but the session is not confirmed (getUser failed): auth n=google ok=false, no success", async () => {
    const error = { status: 401, data: { detail: "Not authenticated" } };
    api.googleCallback.mockReturnValue({ unwrap: () => Promise.resolve({}) });
    api.getUser.mockReturnValue({ unwrap: () => Promise.reject(error) });
    renderCallback("?code=c&state=s");

    await waitFor(() =>
      expect(authEvents()).toEqual([
        { t: "auth", n: "google", ok: false, v: normalizeError(error) },
      ]),
    );
  });

  it("an error from the provider in the callback URL: auth n=google ok=false with its code", async () => {
    renderCallback("?error=OAUTH_USER_ALREADY_EXISTS");

    await waitFor(() =>
      expect(authEvents()).toEqual([
        { t: "auth", n: "google", ok: false, v: "user_exists" },
      ]),
    );
    expect(api.googleCallback).not.toHaveBeenCalled();
  });

  it("a return with google_auth=1 (the backend finished the exchange): auth n=google ok", async () => {
    api.getUser.mockReturnValue({
      unwrap: () => Promise.resolve({ role: "advertiser", id: "u-1" }),
    });
    renderCallback("?google_auth=1");

    await waitFor(() =>
      expect(authEvents()).toEqual([{ t: "auth", n: "google", ok: true }]),
    );
  });
});
