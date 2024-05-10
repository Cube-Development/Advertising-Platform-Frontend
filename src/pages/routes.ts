import * as React from "react";
import { CatalogPage } from "./Catalog";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { NotFoundPage } from "./NotFound";
import { ProfilePage } from "./Profile";
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
import { FAQPage } from "./FAQ";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  sidebar?: boolean;
}

export const privateCommonRoutes: IRoute[] = [
  { path: paths.walletTopUp, component: WalletTopUpPage, sidebar: true },
  { path: paths.walletWithdraw, component: WalletWithdrawPage, sidebar: true },
  { path: paths.wallethistory, component: WalletHistoryPage, sidebar: true },
  { path: paths.profile, component: ProfilePage, sidebar: true },
  { path: paths.addProfile, component: AddProfilePage, sidebar: true },
];

export const publicCommonRoutes: IRoute[] = [
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.faq, component: FAQPage },
];

export const privateBloggerRoutes: IRoute[] = [
  { path: paths.platformOwner, component: PlatformOwnerPage, sidebar: true },
  { path: paths.addPlatform, component: AddPlatformPage, sidebar: true },
  { path: paths.platforms, component: PlatformsPage, sidebar: true },
  { path: paths.offers, component: OffersPage, sidebar: true },
];

export const publicBloggerRoutes: IRoute[] = [
  { path: paths.mainBlogger, component: MainBloggerPage },
];

export const privateAdvertiserRoutes: IRoute[] = [
  { path: paths.orders, component: OrdersPage, sidebar: true },
];

export const publicAdvertiserRoutes: IRoute[] = [
  { path: paths.main, component: MainPage },
  { path: paths.catalog, component: CatalogPage },
  { path: paths.cart, component: CartPage },
  { path: paths.turnkey, component: TurnkeyPage },
];

// нужен в старой версии роутинга после обновы удалить
export const publicRoutes: IRoute[] = [
  { path: paths.mainBlogger, component: MainBloggerPage },
  { path: paths.main, component: MainPage },
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.catalog, component: CatalogPage },
  { path: paths.cart, component: CartPage },
  { path: paths.turnkey, component: TurnkeyPage },
];

export const createOrderRoutes: IRoute[] = [
  { path: paths.createOrder, component: CreateOrderPage, sidebar: false },
];
