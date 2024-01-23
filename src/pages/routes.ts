import * as React from "react";
import { CatalogPage } from "./Catalog";
import { LoginPage } from "./Login";
import { MainPage } from "./Main";
import { MainBloggerPage } from "./MainBlogger";
import { NotFoundPage } from "./NotFound";
import { ProfilePage } from "./Profile";
import { paths } from "../shared/routing";
import { FullServicePage } from "./FullService";
import { PlatformOwnerPage } from "./PlatformOwner";
import { WalletPage } from "./Wallet";
import { AddPlatformPage } from "./AddPlatform";


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
]

export const privateAdvertiserRoutes: IRoute[] = [
    {path: paths.main, component: MainPage},
    {path: paths.profile, component: ProfilePage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.fullServise, component: FullServicePage},
    {path: paths.catalog, component: CatalogPage},
    {path: paths.wallet, component: WalletPage},
]


export const publicRoutes: IRoute[] = [
    {path: paths.main, component: MainPage},
    {path: paths.login, component: LoginPage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.catalog, component: CatalogPage},
]

