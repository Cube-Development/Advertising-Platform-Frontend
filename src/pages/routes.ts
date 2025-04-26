import { ENUM_ROLES, USER_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import * as React from "react";
import { AddChannelPage } from "./AddChannel";
import { AdminChannelsPage } from "./AdminChannels";
import { AdminComplaintInfoPage } from "./AdminComplaintInfo";
import { AdminComplaintsPage } from "./AdminComplaints";
import { AdminHomePage } from "./AdminHome";
import { AdminReviewsPage } from "./AdminReviews";
import { AdminTransactionsPage } from "./AdminTransactions";
import { AdminUserInfoPage } from "./AdminUserInfo";
import { AdminUsersPage } from "./AdminUsers";
import { CartPage } from "./Cart";
import { CatalogPage } from "./Catalog";
import { ChannelPage } from "./Channel";
import { CreateOrderPage } from "./CreateOrder";
import { FAQPage } from "./FAQ";
import { LoginPage } from "./Login";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { MyChannelsPage } from "./MyChannels";
import { NotFoundPage } from "./NotFound";
import { OffersPage } from "./Offers";
import { OrdersPage } from "./Orders";
import { ProfilePage } from "./Profile";
import { PublicOfferPage } from "./PublicOffer";
import { RegistrationPage } from "./Registration";
import { ServiceRulesPage } from "./ServiceRules";
import { TopupPage } from "./Topup";
import { TurnkeyPage } from "./Turnkey";
import { WalletHistoryPage } from "./WalletHistory";
import { WithdrawalPage } from "./Withdrawal";

export enum ENUM_AUTH_TYPES {
  ONLY_PUBLIC = "onlyPublic",
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum ENUM_LAYOUT_TYPES {
  ROOT = "root",
  ADMIN = "admin",
}

export interface IRouting {
  path: ENUM_PATHS;
  component: React.ComponentType;
  auth: ENUM_AUTH_TYPES;
  roles?: ENUM_ROLES[];
  authSidebar?: boolean;
  nonAuthSidebar?: boolean;
  adminSidebar?: boolean;
  layout: ENUM_LAYOUT_TYPES;
}

export const ALL_APP_ROUTES_LIST: IRouting[] = [
  // only public
  {
    path: ENUM_PATHS.LOGIN,
    component: LoginPage,
    auth: ENUM_AUTH_TYPES.ONLY_PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.REGISTRATION,
    component: RegistrationPage,
    auth: ENUM_AUTH_TYPES.ONLY_PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // public blogger
  {
    path: ENUM_PATHS.MAIN_BLOGGER,
    component: MainBloggerPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // public advertiser
  {
    path: ENUM_PATHS.MAIN,
    component: MainPage,
    roles: [ENUM_ROLES.ADVERTISER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  {
    path: ENUM_PATHS.TURNKEY,
    component: TurnkeyPage,
    roles: [ENUM_ROLES.ADVERTISER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // public common
  {
    path: ENUM_PATHS.FAQ,
    component: FAQPage,
    roles: [...USER_ROLES, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.NOT_FOUND,
    component: NotFoundPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CHANNEL,
    component: ChannelPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.PUBLIC_OFFER,
    component: PublicOfferPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.SERVICE_RULES,
    component: ServiceRulesPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PUBLIC,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private blogger
  {
    path: ENUM_PATHS.ADD_CHANNEL,
    component: AddChannelPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.MY_CHANNELS,
    component: MyChannelsPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.OFFERS,
    component: OffersPage,
    roles: [ENUM_ROLES.BLOGGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private advertiser & manager
  {
    path: ENUM_PATHS.ORDERS,
    component: OrdersPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CATALOG,
    component: CatalogPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CART,
    component: CartPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PUBLIC,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.CREATE_ORDER,
    component: CreateOrderPage,
    roles: [ENUM_ROLES.ADVERTISER, ENUM_ROLES.MANAGER],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private common
  {
    path: ENUM_PATHS.WALLET_TOP_UP,
    component: TopupPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.WALLET_WITHDRAW,
    component: WithdrawalPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.WALLET_HISTORY,
    component: WalletHistoryPage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },
  {
    path: ENUM_PATHS.PROFILE,
    component: ProfilePage,
    roles: USER_ROLES,
    auth: ENUM_AUTH_TYPES.PRIVATE,
    authSidebar: true,
    layout: ENUM_LAYOUT_TYPES.ROOT,
  },

  // private admin
  {
    path: ENUM_PATHS.ADMIN_HOME,
    component: AdminHomePage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_CHANNELS,
    component: AdminChannelsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_USERS,
    component: AdminUsersPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_COMPLAINTS,
    component: AdminComplaintsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_TRANSACTIONS,
    component: AdminTransactionsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_REVIEWS,
    component: AdminReviewsPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_COMPLAINT_INFO,
    component: AdminComplaintInfoPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
  {
    path: ENUM_PATHS.ADMIN_USER_INFO,
    component: AdminUserInfoPage,
    roles: [ENUM_ROLES.MODERATOR],
    auth: ENUM_AUTH_TYPES.PRIVATE,
    layout: ENUM_LAYOUT_TYPES.ADMIN,
    adminSidebar: true,
  },
];
