import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { SideBarLayout } from "@widgets/layouts";
import { RootLayout } from "@widgets/layouts/rootLayout/ui";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import {
  IRoute,
  privateAdministratorRoutes,
  privateAdvertiserRoutes,
  privateBloggerRoutes,
  privateCommonRoutes,
  privateManagerRoutes,
  publicRoutes,
} from "./routes";

const handleLayout = (route: IRoute) => {
  return route.sidebar ? (
    <SideBarLayout>
      <route.component />
    </SideBarLayout>
  ) : (
    <route.component />
  );
};

const handleRouter = (routes: IRoute[]) => {
  const router: RouteObject[] = routes.map((route) => ({
    path: route.path,
    element: handleLayout(route),
  }));
  return router;
};

const bloggerRouter: RouteObject[] = handleRouter(privateBloggerRoutes);
const advertiserRouter: RouteObject[] = handleRouter(privateAdvertiserRoutes);
const commonRouter: RouteObject[] = handleRouter(privateCommonRoutes);

const managerRouter: RouteObject[] = handleRouter(privateManagerRoutes);
const administratorRouter: RouteObject[] = handleRouter(
  privateAdministratorRoutes,
);

const publicRouter: RouteObject[] = handleRouter(publicRoutes);

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <RootLayout />,
    children: [
      {
        path: paths.main,
        children: publicRouter,
      },
      {
        path: paths.main,
        element: <ProtectedRoutes checkRole={roles.advertiser} />,
        children: advertiserRouter,
      },
      {
        path: paths.main,
        element: <ProtectedRoutes checkRole={roles.blogger} />,
        children: bloggerRouter,
      },
      {
        path: paths.main,
        element: <ProtectedRoutes />,
        children: commonRouter,
      },
      {
        path: paths.main,
        element: <ProtectedRoutes checkRole={roles.manager} />,
        children: managerRouter,
      },
      {
        path: paths.main,
        element: <ProtectedRoutes checkRole={roles.administrator} />,
        children: administratorRouter,
      },
    ],
  },
]);
