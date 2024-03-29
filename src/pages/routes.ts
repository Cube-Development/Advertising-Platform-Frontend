import * as React from "react";
import { CatalogPage } from "./Catalog";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { NotFoundPage } from "./NotFound";
import { ProfilePage } from "./Profile";
import { FullServicePage } from "./FullService";
import { PlatformOwnerPage } from "./PlatformOwner";
import { AddPlatformPage } from "./AddPlatform";
import { paths } from "@shared/routing";
import { TurnkeyPage } from "./TurnkeyPage";
import { PlatformsPage } from "./Platforms";
import { OffersPage } from "./Offers";
import { OrdersPage } from "./Orders";
import { AddProfilePage } from "./AddProfile";
import { CartPage } from "./Cart";
import { WalletTopUpPage } from "./WalletTopUp";
import { WalletWithdrawPage } from "./WalletWithdraw";
import { WalletHistoryPage } from "./WalletHistory";
import { CreateOrderPage } from "./CreateOrder/UI";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  sidebar?: boolean;
}

export const privateBloggerRoutes: IRoute[] = [
  { path: paths.mainBlogger, component: MainBloggerPage },
  { path: paths.profile, component: ProfilePage, sidebar: true },
  { path: paths.platformOwner, component: PlatformOwnerPage, sidebar: true },
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.walletTopUp, component: WalletTopUpPage, sidebar: true },
  { path: paths.walletWithdraw, component: WalletWithdrawPage, sidebar: true },
  { path: paths.wallethistory, component: WalletHistoryPage, sidebar: true },
  { path: paths.addPlatform, component: AddPlatformPage, sidebar: true },
  { path: paths.addProfile, component: AddProfilePage, sidebar: true },
  { path: paths.platforms, component: PlatformsPage, sidebar: true },
  { path: paths.offers, component: OffersPage, sidebar: true },
  { path: paths.createOrder, component: CreateOrderPage, sidebar: true },
];

export const privateAdvertiserRoutes: IRoute[] = [
  { path: paths.main, component: MainPage },
  { path: paths.profile, component: ProfilePage, sidebar: true },
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.addProfile, component: AddProfilePage, sidebar: true },
  { path: paths.fullServise, component: FullServicePage, sidebar: true },
  { path: paths.catalog, component: CatalogPage },
  { path: paths.cart, component: CartPage },
  { path: paths.walletTopUp, component: WalletTopUpPage, sidebar: true },
  { path: paths.walletWithdraw, component: WalletWithdrawPage, sidebar: true },
  { path: paths.wallethistory, component: WalletHistoryPage, sidebar: true },
  { path: paths.turnkey, component: TurnkeyPage, sidebar: true },
  { path: paths.orders, component: OrdersPage, sidebar: true },
  { path: paths.createOrder, component: CreateOrderPage, sidebar: true },
];

export const publicRoutes: IRoute[] = [
  { path: paths.mainBlogger, component: MainBloggerPage },
  { path: paths.main, component: MainPage },
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.catalog, component: CatalogPage },
  { path: paths.cart, component: CartPage },
  { path: paths.turnkey, component: TurnkeyPage },

  { path: paths.walletTopUp, component: WalletTopUpPage, sidebar: true },
  { path: paths.walletWithdraw, component: WalletWithdrawPage, sidebar: true },
  { path: paths.wallethistory, component: WalletHistoryPage, sidebar: true },
  { path: paths.addProfile, component: AddProfilePage, sidebar: true },
  { path: paths.addPlatform, component: AddPlatformPage, sidebar: true },
  { path: paths.createOrder, component: CreateOrderPage, sidebar: true },
];
