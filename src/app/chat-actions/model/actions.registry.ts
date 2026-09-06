import { ENUM_ROLES } from "@entities/user";
import { ENUM_AUTH_TYPES } from "@shared/routing";
import { ComponentType, lazy, LazyExoticComponent } from "react";
import { ChunkFailedAction } from "../ui/action-states";
import { IChatActionAccess } from "./action-visibility";

export interface IChatActionDef extends IChatActionAccess {
  /** Id the AI uses to trigger the action. Stable — it is part of the contract. */
  name: string;
  /**
   * What the AI sees, and its only signal for picking this action. Written as
   * user intent rather than screen name, with the concrete words a user would
   * actually type, and never sharing a leading phrase with another action.
   */
  description: string;
  Component: LazyExoticComponent<ComponentType>;
}

/**
 * Action modules are lazily loaded and default-exported.
 *
 * The `.catch` matters: page-level chunk loaders in this app fall back to
 * `window.location.reload()`, which from a chat panel would throw away whatever
 * the user was doing on the page underneath. A failed panel shows an error and
 * leaves the page alone.
 */
const lazyAction = (
  loader: () => Promise<{ default: ComponentType }>,
): LazyExoticComponent<ComponentType> =>
  lazy(() => loader().catch(() => ({ default: ChunkFailedAction })));

/** Advertiser-side roles, mirroring the route table in src/app/router/config.ts. */
const ADVERTISER_SIDE = [
  ENUM_ROLES.ADVERTISER,
  ENUM_ROLES.MANAGER,
  ENUM_ROLES.AGENCY,
];

/**
 * Actions whose data is genuinely advertiser-specific.
 *
 * Manager and agency work with different endpoints entirely — project carts
 * (`readManagerCart`) and their own project lists (`getManagerProjects`,
 * `getAgencyProjects`). Reusing the advertiser query for them would show a list
 * that is not theirs, which is worse than not offering the action at all.
 */
const ADVERTISER_ONLY = [ENUM_ROLES.ADVERTISER];

/** Roles that own a wallet. */
const WALLET_ROLES = [
  ENUM_ROLES.BLOGGER,
  ENUM_ROLES.ADVERTISER,
  ENUM_ROLES.AGENCY,
];

/** Roles with a personal profile. */
const PROFILE_ROLES = [
  ENUM_ROLES.BLOGGER,
  ENUM_ROLES.ADVERTISER,
  ENUM_ROLES.AGENCY,
];

export const CHAT_ACTIONS: IChatActionDef[] = [
  // ---------------------------------------------------------------- common --
  {
    name: "auth-login",
    description:
      "Вход в существующий аккаунт Blogix по email и паролю или через Google",
    auth: ENUM_AUTH_TYPES.ONLY_PUBLIC,
    Component: lazyAction(() => import("../actions/auth-login-action")),
  },
  {
    name: "auth-register",
    description:
      "Регистрация нового аккаунта: выбор роли рекламодатель или блогер, email и пароль",
    auth: ENUM_AUTH_TYPES.ONLY_PUBLIC,
    Component: lazyAction(() => import("../actions/auth-register-action")),
  },
  {
    name: "faq-guides",
    description:
      "Гайды и инструкции по площадке: как разместить рекламу, добавить канал, вывести деньги",
    Component: lazyAction(() => import("../actions/faq-guides-action")),
  },
  {
    name: "support-contact",
    description: "Связаться с поддержкой Blogix: контакты и время работы",
    Component: lazyAction(() => import("../actions/support-contact-action")),
  },
  {
    name: "role-switch",
    description: "Переключить режим работы между рекламодателем и блогером",
    Component: lazyAction(() => import("../actions/role-switch-action")),
  },
  {
    name: "service-rules",
    description:
      "Правила сервиса, публичная оферта и условия использования Blogix",
    Component: lazyAction(() => import("../actions/service-rules-action")),
  },
  {
    name: "notifications",
    description:
      "Мои уведомления: последние события по кампаниям, каналам и заказам",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    Component: lazyAction(() => import("../actions/notifications-action")),
  },

  // ------------------------------------------------------------ advertiser --
  {
    name: "catalog-search",
    description:
      "Подобрать Telegram, Instagram или YouTube каналы для рекламы по тематике, охвату и бюджету",
    roles: ADVERTISER_SIDE,
    Component: lazyAction(() => import("../actions/catalog-search-action")),
  },
  {
    name: "catalog-full",
    description: "Открыть полный каталог каналов со всеми фильтрами",
    roles: ADVERTISER_SIDE,
    Component: lazyAction(() => import("../actions/catalog-full-action")),
  },
  {
    name: "cart",
    description:
      "Корзина рекламодателя: выбранные каналы и итоговая стоимость размещения",
    roles: ADVERTISER_ONLY,
    Component: lazyAction(() => import("../actions/cart-action")),
  },
  {
    name: "create-order",
    description:
      "Оформить рекламную кампанию по каналам из корзины: даты, бюджет и рекламный пост",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: ADVERTISER_ONLY,
    Component: lazyAction(() => import("../actions/create-order-action")),
  },
  {
    name: "my-campaigns",
    description:
      "Мои рекламные кампании: статусы размещений, модерация постов и результаты",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: ADVERTISER_ONLY,
    Component: lazyAction(() => import("../actions/my-campaigns-action")),
  },
  {
    name: "post-templates",
    description: "Мои сохранённые шаблоны рекламных постов",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: ADVERTISER_SIDE,
    Component: lazyAction(() => import("../actions/post-templates-action")),
  },

  // --------------------------------------------------------------- blogger --
  {
    name: "add-channel",
    description:
      "Добавить свой Telegram, Instagram или YouTube канал в каталог для приёма рекламы",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: [ENUM_ROLES.BLOGGER],
    Component: lazyAction(() => import("../actions/add-channel-action")),
  },
  {
    name: "my-channels",
    description:
      "Мои каналы блогера: статус модерации, цены на размещение и активность",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: [ENUM_ROLES.BLOGGER],
    Component: lazyAction(() => import("../actions/my-channels-action")),
  },
  {
    name: "my-offers",
    description:
      "Входящие предложения о рекламе для блогера: заказы на подтверждение или публикацию",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: [ENUM_ROLES.BLOGGER],
    Component: lazyAction(() => import("../actions/my-offers-action")),
  },
  {
    name: "blogger-income",
    description:
      "Калькулятор дохода: сколько можно заработать на рекламе в своём канале",
    roles: [ENUM_ROLES.BLOGGER],
    Component: lazyAction(() => import("../actions/blogger-income-action")),
  },
  {
    name: "channel-prices",
    description: "Настроить цены на рекламные форматы в моих каналах",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: [ENUM_ROLES.BLOGGER],
    Component: lazyAction(() => import("../actions/channel-prices-action")),
  },

  // ---------------------------------------------------------------- wallet --
  {
    name: "wallet-balance",
    description: "Текущий баланс кошелька: доступные и замороженные средства",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: WALLET_ROLES,
    Component: lazyAction(() => import("../actions/wallet-balance-action")),
  },
  {
    name: "wallet-topup",
    description:
      "Пополнить баланс банковской картой или по счёту для юридического лица",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: [ENUM_ROLES.BLOGGER, ENUM_ROLES.ADVERTISER],
    Component: lazyAction(() => import("../actions/wallet-topup-action")),
  },
  {
    name: "wallet-withdraw",
    description:
      "Вывести заработанные средства с баланса на карту или расчётный счёт",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: WALLET_ROLES,
    Component: lazyAction(() => import("../actions/wallet-withdraw-action")),
  },
  {
    name: "wallet-history",
    description:
      "История операций по кошельку: пополнения, выводы и списания за рекламу",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: WALLET_ROLES,
    Component: lazyAction(() => import("../actions/wallet-history-action")),
  },

  // --------------------------------------------------------------- profile --
  {
    name: "profile-settings",
    description:
      "Настройки профиля: личные данные, смена пароля, уведомления и документы",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: PROFILE_ROLES,
    Component: lazyAction(() => import("../actions/profile-settings-action")),
  },
  {
    name: "organization-data",
    description:
      "Данные организации и реквизиты юридического лица для счетов и документов",
    auth: ENUM_AUTH_TYPES.PRIVATE,
    roles: PROFILE_ROLES,
    Component: lazyAction(() => import("../actions/organization-data-action")),
  },
];
