import { paths } from "@shared/routing";
import * as React from "react";
import { AddChannelPage } from "./AddChannel";
// import { AddLegalPage } from "./AddLegal";
import { CartPage } from "./Cart";
import { CatalogPage } from "./Catalog";
import { ChannelPage } from "./Channel";
import { CreateOrderPage } from "./CreateOrder";
import { FAQPage } from "./FAQ";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { MyChannelsPage } from "./MyChannels";
import { NotFoundPage } from "./NotFound";
import { OffersPage } from "./Offers";
import { OrdersPage } from "./Orders";
import { ProfilePage } from "./Profile";
import { TopupPage } from "./Topup";
import { TurnkeyPage } from "./Turnkey";
import { WalletHistoryPage } from "./WalletHistory";
import { WithdrawalPage } from "./Withdrawal";
import { LoginPage } from "./Login";
import { RegistrationPage } from "./Registration";

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
];

export const onlyPublicCommonRoutes: IRoute[] = [
  { path: paths.login, component: LoginPage },
  { path: paths.registration, component: RegistrationPage },
];

export const publicCommonRoutes: IRoute[] = [
  // { path: paths.orders, component: OrdersPage },
  // { path: paths.myChannels, component: MyChannelsPage, sidebar: true },
  { path: paths.faq, component: FAQPage },
  { path: paths.notFound, component: NotFoundPage },
  { path: paths.channel, component: ChannelPage },
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
  // { path: paths.channel, component: ChannelPage },
];

export const createOrderRoutes: IRoute[] = [
  { path: paths.createOrder, component: CreateOrderPage, sidebar: false },
];
