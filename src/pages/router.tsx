import { managmentRoles, roles, userRoles } from "@entities/user";
import {
  RootAdminLayout,
  RootLayout,
  SideBarAdminLayout,
  SideBarLayout,
} from "@pages/layouts";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { CheckProjectId, CheckRoutes, routerType } from "./CheckRoutes";
import {
  IRoute,
  createOrderRoutes,
  onlyPublicCommonRoutes,
  privateAdminRoutes,
  privateAdvertiserRoutes,
  privateBloggerRoutes,
  privateCommonRoutes,
  publicAdvertiserRoutes,
  publicBloggerRoutes,
  publicCommonRoutes,
} from "./routes";

const HandleLayout = ({ route }: { route: IRoute }) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  return isAuth && route.sidebar && userRoles.includes(role) ? (
    <SideBarLayout>
      <route.component />
    </SideBarLayout>
  ) : (
    <route.component />
  );
};

const HandleAdminLayout = ({ route }: { route: IRoute }) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  return isAuth && route.sidebar && managmentRoles.includes(role) ? (
    <SideBarAdminLayout>
      <route.component />
    </SideBarAdminLayout>
  ) : (
    <route.component />
  );
};

const handleRouter = (routes: IRoute[]) => {
  const router: RouteObject[] = routes.map((route) => ({
    path: route.path,
    element: <HandleLayout route={route} />,
  }));
  return router;
};

const handleAdminRouter = (routes: IRoute[]) => {
  const router: RouteObject[] = routes.map((route) => ({
    path: route.path,
    element: <HandleAdminLayout route={route} />,
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
const onlyPublicCommonRouter: RouteObject[] = handleRouter(
  onlyPublicCommonRoutes,
);

const createOrderRouter: RouteObject[] = handleRouter(createOrderRoutes);
const privateAdminRouter: RouteObject[] = handleAdminRouter(privateAdminRoutes);

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
      {
        path: paths.main,
        element: <CheckProjectId />,
        children: createOrderRouter,
      },
      {
        path: paths.main,
        element: <CheckRoutes type={routerType.onlyPublic} />,
        children: onlyPublicCommonRouter,
      },
      ...publicCommonRouter,
    ],
  },
  {
    path: paths.main,
    element: <RootAdminLayout />,
    children: [
      {
        path: paths.main,
        element: (
          <CheckRoutes checkRole={roles.manager} type={routerType.private} />
        ),
        children: privateAdminRouter,
      },
    ],
  },
]);
