import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupStore } from "@app/providers/store";
import { ENUM_ROLES, toggleRole } from "@entities/user";
import { ENUM_WALLETS_TYPE, setBalance } from "@entities/wallet";
import { useCheckBalance } from "./useCheckBalance";

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

const PROJECT_ID = "00000000-0000-4000-8000-000000000501";

const renderCheck = (amount: number) => {
  const store = setupStore();
  store.dispatch(toggleRole(ENUM_ROLES.ADVERTISER));
  store.dispatch(
    setBalance({
      balance: 100,
      deposit_wallet: 100,
      profit_wallet: 0,
      spending_wallet: 0,
    }),
  );
  return renderHook(
    () => useCheckBalance(ENUM_WALLETS_TYPE.DEPOSIT, amount, PROJECT_ID),
    {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    },
  );
};

const insufficient = () =>
  analytics.track.mock.calls
    .map(([event]) => event as { t: string })
    .filter((event) => event.t === "balance_insufficient");

afterEach(() => {
  vi.clearAllMocks();
});

describe("useCheckBalance analytics (спека 005 Q17)", () => {
  it("not enough on the wallet: balance_insufficient with the project; enough: nothing", () => {
    const { result } = renderCheck(1000);
    act(() => {
      expect(result.current.checkBalance()).toBe(false);
    });
    expect(insufficient()).toEqual([
      { t: "balance_insufficient", e: "project", id: PROJECT_ID },
    ]);

    const enough = renderCheck(50);
    act(() => {
      expect(enough.result.current.checkBalance()).toBe(true);
    });
    expect(insufficient()).toHaveLength(1);
  });
});
