import * as React from "react";
import { CatalogPage } from "../../pages/Catalog";
import { LoginPage } from "../../pages/Login";
import { MainPage } from "../../pages/Main";
import { MainBloggerPage } from "../../pages/MainBlogger";
import { NotFoundPage } from "../../pages/NotFound";
import { ProfilePage } from "../../pages/Profile";
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