import type { Middleware, UnknownAction } from "@reduxjs/toolkit";
import { channelAPI } from "@entities/channel";
import { authCartAPI, publicCartAPI } from "@entities/project";
import { authorizationAPI, userSlice } from "@entities/user";
import { walletAPI } from "@entities/wallet";
import { queryParamKeys } from "@shared/utils";
import { ENUM_PATHS } from "@shared/routing";
import {
  getAnalytics,
  normalizeError,
  type TrackInput,
} from "@shared/lib/analytics";

interface MutationEndpoint {
  matchFulfilled: (action: unknown) => boolean;
  matchRejected: (action: unknown) => boolean;
}

type MutationAction = UnknownAction & {
  payload?: unknown;
  meta: {
    arg: { originalArgs: unknown };
    condition?: boolean;
    aborted?: boolean;
  };
};

type Rule = [
  MutationEndpoint,
  (action: MutationAction, ok: boolean) => TrackInput,
];

interface CartArgs {
  channel_id: string;
  format?: number;
}

const authRule = (
  endpoint: MutationEndpoint,
  n: "password" | "register" | "register_code",
): Rule => [
  endpoint,
  (action, ok) =>
    ok
      ? { t: "auth", n, ok }
      : { t: "auth", n, ok, v: normalizeError(action.payload) },
];

const cartFields = (action: MutationAction, ok: boolean) => {
  const args = action.meta.arg.originalArgs as CartArgs;
  return {
    e: "channel" as const,
    id: args.channel_id,
    v: args.format === undefined ? "" : String(args.format),
    ok,
    src: "",
  };
};

const promocodeRule = (endpoint: MutationEndpoint): Rule => [
  endpoint,
  (action, ok) =>
    ok
      ? { t: "promocode", ok }
      : { t: "promocode", ok, v: normalizeError(action.payload) },
];

/**
 * Пополнение (спека 005 Q6, Q18): из мастера заказа — create_order, иначе кошелёк. Мастер уводит на
 * страницу пополнения с `project_id` в query (useTopUpFromCreateOrder) — это тоже create_order
 */
const isTopUpFromCreateOrder = (): boolean =>
  window.location.pathname.startsWith(ENUM_PATHS.CREATE_ORDER) ||
  (window.location.pathname === ENUM_PATHS.WALLET_TOP_UP &&
    new URLSearchParams(window.location.search).has(queryParamKeys.projectId));

const topUpRule = (
  endpoint: MutationEndpoint,
  v: "payme" | "click" | "request" | "didox",
): Rule => [
  endpoint,
  (_, ok) => ({
    t: "topup_start",
    v,
    ok,
    src: isTopUpFromCreateOrder() ? "create_order" : "wallet",
  }),
];

/**
 * Мутации → события контракта (спека 005 FR-006, план 11.3). Аргументы — как в
 * вызове (meta.arg.originalArgs). Корзины менеджера, админка, агентство — не ловятся
 */
const RULES: Rule[] = [
  authRule(authorizationAPI.endpoints.login, "password"),
  authRule(authorizationAPI.endpoints.register, "register"),
  authRule(authorizationAPI.endpoints.getCodeForRegistration, "register_code"),
  [
    publicCartAPI.endpoints.addToPublicCart,
    (action, ok) => ({ t: "cart_add", ...cartFields(action, ok) }),
  ],
  [
    authCartAPI.endpoints.addToCommonCart,
    (action, ok) => ({ t: "cart_add", ...cartFields(action, ok) }),
  ],
  [
    publicCartAPI.endpoints.removeFromPublicCart,
    (action, ok) => ({ t: "cart_remove", ...cartFields(action, ok) }),
  ],
  [
    authCartAPI.endpoints.removeFromCommonCart,
    (action, ok) => ({ t: "cart_remove", ...cartFields(action, ok) }),
  ],
  promocodeRule(authCartAPI.endpoints.checkCommonCartPromocode),
  promocodeRule(walletAPI.endpoints.checkPaymentPromocode),
  [
    walletAPI.endpoints.createPaymentProject,
    (action, ok) => {
      const { project_id } = action.meta.arg.originalArgs as {
        project_id: string;
      };
      return ok
        ? { t: "payment_submit", ok, e: "project", id: project_id }
        : {
            t: "payment_submit",
            ok,
            e: "project",
            id: project_id,
            v: normalizeError(action.payload),
          };
    },
  ],
  topUpRule(walletAPI.endpoints.createDepositPayme, "payme"),
  topUpRule(walletAPI.endpoints.createDepositClick, "click"),
  topUpRule(walletAPI.endpoints.createDepositRequest, "request"),
  topUpRule(walletAPI.endpoints.createDeposit, "didox"),
  // Платформы в аргументах создания канала нет (спека 005 Q6)
  [
    channelAPI.endpoints.createChannel,
    (_, ok) => ({ t: "channel_create", ok, v: "", e: "channel" }),
  ],
];

const handle = (action: unknown) => {
  if (userSlice.actions.logout.match(action)) {
    getAnalytics().logout();
    return;
  }
  for (const [endpoint, toEvent] of RULES) {
    const ok = endpoint.matchFulfilled(action);
    if (!ok && !endpoint.matchRejected(action)) continue;
    const mutation = action as MutationAction;
    // Отменённые до запроса и прерванные мутации событий не дают
    if (!ok && (mutation.meta.condition || mutation.meta.aborted)) return;
    getAnalytics().track(toEvent(mutation, ok));
    return;
  }
};

/** Последний middleware стора: аналитика не ломает dispatch приложения */
export const analyticsMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);
  try {
    handle(action);
  } catch {
    // Ошибка правила аналитики не должна влиять на приложение
  }
  return result;
};
