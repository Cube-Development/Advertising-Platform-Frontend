import { configureStore } from "@reduxjs/toolkit";
import { afterEach, describe, expect, it, vi } from "vitest";
import { userSlice } from "@entities/user";
import { setupStore } from "@app/providers/store";
import { analyticsMiddleware } from "./analytics.middleware";

const analytics = vi.hoisted(() => ({ track: vi.fn(), logout: vi.fn() }));

vi.mock("@shared/lib/analytics", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@shared/lib/analytics")>()),
  getAnalytics: () => ({
    page: vi.fn(),
    identify: vi.fn(),
    track: analytics.track,
    logout: analytics.logout,
    flush: vi.fn(),
    destroy: vi.fn(),
  }),
}));

type TStatus = "fulfilled" | "rejected";

/** RTK Query API: authorizationAPI и publicCartAPI — в "api", остальные — в "authApi" */
const API_OF: Record<string, string> = {
  login: "api",
  register: "api",
  getCodeForRegistration: "api",
  addToPublicCart: "api",
  removeFromPublicCart: "api",
};

/** Экшен executeMutation той же формы, что у RTK Query (аргументы — как в вызове) */
const mutation = (
  status: TStatus,
  endpointName: string,
  originalArgs: unknown,
  payload?: unknown,
  meta: Record<string, unknown> = {},
) => ({
  type: `${API_OF[endpointName] ?? "authApi"}/executeMutation/${status}`,
  payload,
  ...(status === "rejected" ? { error: { message: "Rejected" } } : {}),
  meta: {
    arg: { type: "mutation", endpointName, originalArgs, track: true },
    requestId: `request-${endpointName}-${status}`,
    requestStatus: status,
    ...(status === "fulfilled"
      ? { fulfilledTimeStamp: 1, baseQueryMeta: {} }
      : { rejectedWithValue: true, aborted: false, condition: false }),
    ...meta,
  },
});

/** Только middleware аналитики: без API-редьюсеров и чужих middleware */
const isolatedStore = () =>
  configureStore({
    reducer: { noop: (state: null = null) => state },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        analyticsMiddleware,
      ),
  });

const NOT_ENOUGH = {
  status: 400,
  data: { message: "Not enough money on wallet" },
};

afterEach(() => {
  vi.clearAllMocks();
  window.history.pushState({}, "", "/");
});

describe("analyticsMiddleware (спека 005 FR-006)", () => {
  it.each([
    ["login", "password"],
    ["register", "register"],
    ["getCodeForRegistration", "register_code"],
  ])("%s fulfilled → auth n=%s ok", (endpoint, n) => {
    isolatedStore().dispatch(mutation("fulfilled", endpoint, {}));
    expect(analytics.track).toHaveBeenCalledWith({ t: "auth", n, ok: true });
  });

  it.each([
    [
      "login",
      "password",
      { detail: "LOGIN_BAD_CREDENTIALS" },
      "invalid_credentials",
    ],
    [
      "register",
      "register",
      { detail: "REGISTER_USER_ALREADY_EXISTS" },
      "user_exists",
    ],
  ])(
    "%s rejected → auth n=%s ok=false with the normalized code",
    (endpoint, n, data, v) => {
      isolatedStore().dispatch(
        mutation("rejected", endpoint, {}, { status: 400, data }),
      );
      expect(analytics.track).toHaveBeenCalledWith({
        t: "auth",
        n,
        ok: false,
        v,
      });
    },
  );

  it.each([
    [
      "addToPublicCart",
      { guest_id: "g", channel_id: "7", format: 3, language: 1 },
      "cart_add",
      "3",
    ],
    [
      "addToCommonCart",
      { channel_id: "7", format: 5, language: 1 },
      "cart_add",
      "5",
    ],
    [
      "removeFromPublicCart",
      { guest_id: "g", channel_id: "7", language: 1 },
      "cart_remove",
      "",
    ],
    [
      "removeFromCommonCart",
      { channel_id: "7", language: 1 },
      "cart_remove",
      "",
    ],
  ])("%s → %s with channel_id and the format", (endpoint, args, t, v) => {
    const store = isolatedStore();
    store.dispatch(mutation("fulfilled", endpoint, args));
    store.dispatch(
      mutation("rejected", endpoint, args, { status: 500, data: {} }),
    );
    expect(analytics.track).toHaveBeenNthCalledWith(1, {
      t,
      e: "channel",
      id: "7",
      v,
      ok: true,
      src: "",
    });
    expect(analytics.track).toHaveBeenNthCalledWith(2, {
      t,
      e: "channel",
      id: "7",
      v,
      ok: false,
      src: "",
    });
  });

  it("promocode checks of the cart and of the payment → promocode with the normalized code", () => {
    const store = isolatedStore();
    store.dispatch(
      mutation("fulfilled", "checkCommonCartPromocode", { promocode: "A" }),
    );
    store.dispatch(
      mutation(
        "rejected",
        "checkPaymentPromocode",
        { project_id: "p1", promocode: "B" },
        {
          status: 400,
          data: { message: "Promocode is expired" },
        },
      ),
    );
    expect(analytics.track.mock.calls.map(([event]) => event)).toEqual([
      { t: "promocode", ok: true },
      { t: "promocode", ok: false, v: "promocode_expired" },
    ]);
  });

  it("createPaymentProject → payment_submit of project_id; a failure carries the normalized code", () => {
    const store = isolatedStore();
    const args = { project_id: "p1", wallet_type: 1 };
    store.dispatch(mutation("fulfilled", "createPaymentProject", args));
    store.dispatch(
      mutation("rejected", "createPaymentProject", args, NOT_ENOUGH),
    );
    expect(analytics.track.mock.calls.map(([event]) => event)).toEqual([
      { t: "payment_submit", ok: true, e: "project", id: "p1" },
      {
        t: "payment_submit",
        ok: false,
        e: "project",
        id: "p1",
        v: "insufficient_funds",
      },
    ]);
  });

  it("top-up → topup_start with the method; src create_order on /createorder, otherwise wallet", () => {
    const store = isolatedStore();
    store.dispatch(mutation("fulfilled", "createDepositPayme", { amount: 1 }));
    store.dispatch(mutation("fulfilled", "createDepositRequest", {}));
    store.dispatch(
      mutation("rejected", "createDeposit", { doc_id: "d" }, NOT_ENOUGH),
    );
    window.history.pushState({}, "", "/createorder");
    store.dispatch(mutation("fulfilled", "createDepositClick", { amount: 1 }));
    expect(analytics.track.mock.calls.map(([event]) => event)).toEqual([
      { t: "topup_start", v: "payme", ok: true, src: "wallet" },
      { t: "topup_start", v: "request", ok: true, src: "wallet" },
      { t: "topup_start", v: "didox", ok: false, src: "wallet" },
      { t: "topup_start", v: "click", ok: true, src: "create_order" },
    ]);
  });

  it("createChannel → channel_create; the logout action of userSlice → logout", () => {
    const store = isolatedStore();
    store.dispatch(
      mutation("fulfilled", "createChannel", { description: "d" }),
    );
    store.dispatch(userSlice.actions.logout());
    expect(analytics.track).toHaveBeenCalledWith({
      t: "channel_create",
      ok: true,
      v: "",
      e: "channel",
    });
    expect(analytics.logout).toHaveBeenCalledTimes(1);
  });

  it("cancelled or aborted mutations and other endpoints give no events", () => {
    const store = isolatedStore();
    store.dispatch(
      mutation("rejected", "login", {}, undefined, { condition: true }),
    );
    store.dispatch(
      mutation("rejected", "addToCommonCart", { channel_id: "7" }, undefined, {
        aborted: true,
      }),
    );
    store.dispatch(
      mutation("fulfilled", "addToManagerCart", { channel_id: "7", format: 1 }),
    );
    expect(analytics.track).not.toHaveBeenCalled();
    // Контроль: та же мутация без отмены — событие есть
    store.dispatch(
      mutation("rejected", "login", {}, { status: 400, data: {} }),
    );
    expect(analytics.track).toHaveBeenCalledTimes(1);
  });

  it("is registered in the application store", () => {
    setupStore().dispatch(
      mutation("fulfilled", "getCodeForRegistration", { email: "a@b.c" }),
    );
    expect(analytics.track).toHaveBeenCalledWith({
      t: "auth",
      n: "register_code",
      ok: true,
    });
  });
});
