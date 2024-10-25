import { paths } from "@shared/routing";
import { SideBarLayout } from "@pages/layouts";
import { RootLayout } from "@pages/layouts";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { CheckProjectId, CheckRoutes, routerType } from "./CheckRoutes";
import {
  IRoute,
  createOrderRoutes,
  onlyPublicCommonRoutes,
  privateAdvertiserRoutes,
  privateBloggerRoutes,
  privateCommonRoutes,
  publicAdvertiserRoutes,
  publicBloggerRoutes,
  publicCommonRoutes,
} from "./routes";
import { roles } from "@entities/user";
import { useAppSelector } from "@shared/hooks";

const HandleLayout = ({ route }: { route: IRoute }) => {
  const { isAuth } = useAppSelector((state) => state.user); // Хук вызывается корректно
  return isAuth ? (
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
    element: <HandleLayout route={route} />, // Передаём компонент как JSX
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
]);
