import * as React from "react";
import { CatalogPage } from "./Catalog";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { NotFoundPage } from "./NotFound";
import { ProfilePage } from "./Profile";
import { FullServicePage } from "./FullService";
import { PlatformOwnerPage } from "./PlatformOwner";
import { WalletPage } from "./Wallet";
import { AddPlatformPage } from "./AddPlatform";
import { paths } from "@shared/routing";
import { TurnkeyPage } from "./TurnkeyPage";
import { PlatformsPage } from "./Platforms";
import { OffersPage } from "./Offers";
import { OrdersPage } from "./Orders";
import { AddProfilePage } from "./AddProfile";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export const privateBloggerRoutes: IRoute[] = [
    {path: paths.mainBlogger, component: MainBloggerPage},
    {path: paths.profile, component: ProfilePage},
    {path: paths.platformOwner, component: PlatformOwnerPage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.wallet, component: WalletPage},
    {path: paths.addPlatform, component: AddPlatformPage},
    {path: paths.addProfile, component: AddProfilePage},
    {path: paths.turnkey, component: TurnkeyPage},
    {path: paths.platforms, component: PlatformsPage},
    {path: paths.offers, component: OffersPage},
]

export const privateAdvertiserRoutes: IRoute[] = [
    {path: paths.main, component: MainPage},
    {path: paths.profile, component: ProfilePage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.addProfile, component: AddProfilePage},
    {path: paths.fullServise, component: FullServicePage},
    {path: paths.catalog, component: CatalogPage},
    {path: paths.wallet, component: WalletPage},
    {path: paths.turnkey, component: TurnkeyPage},
    {path: paths.orders, component: OrdersPage},
]


export const publicRoutes: IRoute[] = [
    {path: paths.mainBlogger, component: MainBloggerPage},
    {path: paths.main, component: MainPage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.catalog, component: CatalogPage},
    {path: paths.turnkey, component: TurnkeyPage},
]

