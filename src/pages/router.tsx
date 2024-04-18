import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { SideBarLayout } from "@widgets/layouts";
import { RootLayout } from "@widgets/layouts/rootLayout/ui";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { CheckRoutes, routerType } from "./CheckRoutes";
import {
  IRoute,
  privateAdvertiserRoutes,
  privateBloggerRoutes,
  privateCommonRoutes,
  publicAdvertiserRoutes,
  publicBloggerRoutes,
  publicCommonRoutes,
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

const privateBloggerRouter: RouteObject[] = handleRouter(privateBloggerRoutes);
const privateAdvertiserRouter: RouteObject[] = handleRouter(
  privateAdvertiserRoutes,
);
const privateCommonRouter: RouteObject[] = handleRouter(privateCommonRoutes);
const publicAdvertisserRouter: RouteObject[] = handleRouter(
  publicAdvertiserRoutes,
);
const publicBloggerRouter: RouteObject[] = handleRouter(publicBloggerRoutes);
const publicCommonRouter: RouteObject[] = handleRouter(publicCommonRoutes);

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <RootLayout />,
    children: [
      {
        path: paths.main,
        element: (
          <CheckRoutes checkRole={roles.advertiser} type={routerType.public} />
        ),
        children: publicAdvertisserRouter,
      },
      {
        path: paths.main,
        element: (
          <CheckRoutes checkRole={roles.blogger} type={routerType.public} />
        ),
        children: publicBloggerRouter,
      },
      {
        path: paths.main,
        element: (
          <CheckRoutes checkRole={roles.advertiser} type={routerType.private} />
        ),
        children: privateAdvertiserRouter,
      },
      {
        path: paths.main,
        element: (
          <CheckRoutes checkRole={roles.blogger} type={routerType.private} />
        ),
        children: privateBloggerRouter,
      },
      {
        path: paths.main,
        element: <CheckRoutes type={routerType.private} />,
        children: privateCommonRouter,
      },
      ...publicCommonRouter,
    ],
  },
]);
