import * as React from "react";
import { CatalogPage } from "./catalog";
import { LoginPage } from "./login";
import { MainPage } from "./main";
import { MainBloggerPage } from "./mainBlogger";
import { NotFoundPage } from "./notFound";
import { ProfilePage } from "./profile";
import { paths } from "../shared/routing";


export interface IRoute {
    path: string;
    component: React.ComponentType;
}


export const publicRoutes: IRoute[] = [
    {path: paths.main, component: MainPage},
    {path: paths.login, component: LoginPage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.catalog, component: CatalogPage},
]

export const privateRoutes: IRoute[] = [
    {path: paths.main, component: MainPage},
    {path: paths.mainBlogger, component: MainBloggerPage},
    {path: paths.mainBlogger, component: ProfilePage},
    {path: paths.notFound, component: NotFoundPage},
    {path: paths.catalog, component: CatalogPage},
]