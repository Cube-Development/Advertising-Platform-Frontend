import * as React from "react";
import { CatalogPage } from "pages/catalog";
import { LoginPage } from "pages/login";
import { MainPage } from "pages/main";
import { MainBloggerPage } from "pages/mainBlogger";
import { NotFoundPage } from "pages/notFound";
import { ProfilePage } from "pages/profile";
import { RouteNames } from "./routes";


export interface IRoute {
    path: string;
    component: React.ComponentType;
}


export const publicRoutes: IRoute[] = [
    {path: RouteNames.Main, component: MainPage},
    {path: RouteNames.Login, component: LoginPage},
    {path: RouteNames.NotFound, component: NotFoundPage},
    {path: RouteNames.Catalog, component: CatalogPage},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.Main, component: MainPage},
    {path: RouteNames.MainBlogger, component: MainBloggerPage},
    {path: RouteNames.Profile, component: ProfilePage},
    {path: RouteNames.NotFound, component: NotFoundPage},
    {path: RouteNames.Catalog, component: CatalogPage},
]