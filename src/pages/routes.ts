import { paths } from "@shared/routing";
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
import { roles, userRoles } from "@entities/user";

// export interface IRoute {
//   path: string;
//   component: React.ComponentType;
//   sidebar?: boolean;
// }

// export const privateCommonRoutes: IRoute[] = [
//   { path: paths.walletTopUp, component: TopupPage, sidebar: true },
//   { path: paths.walletWithdraw, component: WithdrawalPage, sidebar: true },
//   { path: paths.walletHistory, component: WalletHistoryPage, sidebar: true },
//   { path: paths.profile, component: ProfilePage, sidebar: true },
// ];

// export const onlyPublicCommonRoutes: IRoute[] = [
//   { path: paths.login, component: LoginPage },
//   { path: paths.registration, component: RegistrationPage },
// ];

// export const publicCommonRoutes: IRoute[] = [
//   { path: paths.faq, component: FAQPage, sidebar: true },
//   { path: paths.notFound, component: NotFoundPage },
//   { path: paths.channel, component: ChannelPage },
//   { path: paths.publicOffer, component: PublicOfferPage, sidebar: true },
//   { path: paths.serviceRules, component: ServiceRulesPage, sidebar: true },
// ];

// export const privateBloggerRoutes: IRoute[] = [
//   { path: paths.addChannel, component: AddChannelPage, sidebar: true },
//   { path: paths.myChannels, component: MyChannelsPage, sidebar: true },
//   { path: paths.offers, component: OffersPage, sidebar: true },
// ];

// export const publicBloggerRoutes: IRoute[] = [
//   { path: paths.mainBlogger, component: MainBloggerPage },
// ];

// export const privateAdvertiserRoutes: IRoute[] = [
//   { path: paths.orders, component: OrdersPage, sidebar: true },
// ];

// export const publicAdvertiserRoutes: IRoute[] = [
//   { path: paths.main, component: MainPage },
//   { path: paths.catalog, component: CatalogPage },
//   { path: paths.cart, component: CartPage },
//   { path: paths.turnkey, component: TurnkeyPage },
//   // { path: paths.channel, component: ChannelPage },
// ];

// export const createOrderRoutes: IRoute[] = [
//   { path: paths.createOrder, component: CreateOrderPage },
// ];

// export const privateAdminRoutes: IRoute[] = [
//   { path: paths.adminHome, component: AdminHomePage, sidebar: true },
//   { path: paths.adminChannels, component: AdminChannelsPage, sidebar: true },
//   { path: paths.adminUsers, component: AdminUsersPage, sidebar: true },
//   {
//     path: paths.adminComplaints,
//     component: AdminComplaintsPage,
//     sidebar: true,
//   },
//   {
//     path: paths.adminTransactions,
//     component: AdminTransactionsPage,
//     sidebar: true,
//   },
//   { path: paths.adminReviews, component: AdminReviewsPage, sidebar: true },
//   {
//     path: paths.adminComplaintInfo,
//     component: AdminComplaintInfoPage,
//     sidebar: true,
//   },
//   {
//     path: paths.adminUserInfo,
//     component: AdminUserInfoPage,
//     sidebar: true,
//   },
// ];

export enum authTypes {
  onlyPublic = "onlyPublic",
  public = "public",
  private = "private",
}

export enum layoutTypes {
  root = "root",
  admin = "admin",
}

export interface IRouting {
  path: paths;
  component: React.ComponentType;
  auth: authTypes;
  roles?: roles[];
  authSidebar?: boolean;
  nonAuthSidebar?: boolean;
  adminSidebar?: boolean;
  layout: layoutTypes;
}

export const allRoutes: IRouting[] = [
  // only public
  {
    path: paths.login,
    component: LoginPage,
    auth: authTypes.onlyPublic,
    layout: layoutTypes.root,
  },
  {
    path: paths.registration,
    component: RegistrationPage,
    auth: authTypes.onlyPublic,
    layout: layoutTypes.root,
  },

  // public blogger
  {
    path: paths.mainBlogger,
    component: MainBloggerPage,
    roles: [roles.blogger],
    auth: authTypes.public,
    layout: layoutTypes.root,
  },

  // public advertiser
  {
    path: paths.main,
    component: MainPage,
    roles: [roles.advertiser],
    auth: authTypes.public,
    authSidebar: true,
    layout: layoutTypes.root,
  },

  {
    path: paths.turnkey,
    component: TurnkeyPage,
    roles: [roles.advertiser],
    auth: authTypes.public,
    layout: layoutTypes.root,
  },

  // public common
  {
    path: paths.faq,
    component: FAQPage,
    roles: [...userRoles, roles.manager],
    auth: authTypes.public,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.notFound,
    component: NotFoundPage,
    roles: userRoles,
    auth: authTypes.public,
    layout: layoutTypes.root,
  },
  {
    path: paths.channel,
    component: ChannelPage,
    roles: userRoles,
    auth: authTypes.public,
    layout: layoutTypes.root,
  },
  {
    path: paths.publicOffer,
    component: PublicOfferPage,
    roles: userRoles,
    auth: authTypes.public,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.serviceRules,
    component: ServiceRulesPage,
    roles: userRoles,
    auth: authTypes.public,
    authSidebar: true,
    layout: layoutTypes.root,
  },

  // private blogger
  {
    path: paths.addChannel,
    component: AddChannelPage,
    roles: [roles.blogger],
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.myChannels,
    component: MyChannelsPage,
    roles: [roles.blogger],
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.offers,
    component: OffersPage,
    roles: [roles.blogger],
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },

  // private advertiser & manager
  {
    path: paths.orders,
    component: OrdersPage,
    roles: [roles.advertiser, roles.manager],
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.catalog,
    component: CatalogPage,
    roles: [roles.advertiser, roles.manager],
    auth: authTypes.public,
    layout: layoutTypes.root,
  },
  {
    path: paths.cart,
    component: CartPage,
    roles: [roles.advertiser, roles.manager],
    auth: authTypes.public,
    layout: layoutTypes.root,
  },
  {
    path: paths.createOrder,
    component: CreateOrderPage,
    roles: [roles.advertiser, roles.manager],
    auth: authTypes.private,
    layout: layoutTypes.root,
  },

  // private common
  {
    path: paths.walletTopUp,
    component: TopupPage,
    roles: userRoles,
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.walletWithdraw,
    component: WithdrawalPage,
    roles: userRoles,
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.walletHistory,
    component: WalletHistoryPage,
    roles: userRoles,
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },
  {
    path: paths.profile,
    component: ProfilePage,
    roles: userRoles,
    auth: authTypes.private,
    authSidebar: true,
    layout: layoutTypes.root,
  },

  // private admin
  {
    path: paths.adminHome,
    component: AdminHomePage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminChannels,
    component: AdminChannelsPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminUsers,
    component: AdminUsersPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminComplaints,
    component: AdminComplaintsPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminTransactions,
    component: AdminTransactionsPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminReviews,
    component: AdminReviewsPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminComplaintInfo,
    component: AdminComplaintInfoPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
  {
    path: paths.adminUserInfo,
    component: AdminUserInfoPage,
    roles: [roles.moderator],
    auth: authTypes.private,
    layout: layoutTypes.admin,
    adminSidebar: true,
  },
];
