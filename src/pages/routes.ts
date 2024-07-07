import * as React from "react";
import { CatalogPage } from "./Catalog";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { NotFoundPage } from "./NotFound";
import { ProfilePage } from "./Profile";
import { AddChannelPage } from "./AddChannel";
import { TurnkeyPage } from "./Turnkey";
import { MyChannelsPage } from "./MyChannels";
import { OffersPage } from "./Offers";
import { OrdersPage } from "./Orders";
import { AddLegalPage } from "./AddLegal";
import { CartPage } from "./Cart";
import { TopupPage } from "./Topup";
import { WithdrawalPage } from "./Withdrawal";
import { WalletHistoryPage } from "./WalletHistory";
import { CreateOrderPage } from "./CreateOrder/UI";
import { FAQPage } from "./FAQ";
import { paths } from "@shared/routing";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  sidebar?: boolean;
}

export const privateCommonRoutes: IRoute[] = [
  { path: paths.walletTopUp, component: TopupPage, sidebar: true },
  { path: paths.walletWithdraw, component: WithdrawalPage, sidebar: true },
  { path: paths.wallethistory, component: WalletHistoryPage, sidebar: true },
  { path: paths.profile, component: ProfilePage, sidebar: true },
  { path: paths.addChannel, component: AddLegalPage, sidebar: true },
];

export const publicCommonRoutes: IRoute[] = [
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.faq, component: FAQPage },
];

export const privateBloggerRoutes: IRoute[] = [
  { path: paths.addChannel, component: AddChannelPage, sidebar: true },
  { path: paths.myChannels, component: MyChannelsPage, sidebar: true },
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
