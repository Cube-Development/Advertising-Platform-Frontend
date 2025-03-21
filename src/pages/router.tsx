import { roles } from "@entities/user";
import {
  RootAdminLayout,
  RootLayout,
  SideBarAdminLayout,
  SideBarLayout,
} from "@pages/layouts";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { allRoutes, authTypes, IRouting, layoutTypes } from "./routes";

// Компонент защиты маршрутов
const ProtectedRoute = ({ route }: { route: IRouting }) => {
  const { isAuth, role } = useAppSelector((state) => state.user);

  // Проверка на авторизацию
  if (route.auth === authTypes.onlyPublic && isAuth) {
    console.log("onlyPublic");
    return <Navigate to={paths.main} replace />;
  }
  if (route.auth === authTypes.private && !isAuth) {
    console.log("private");
    return <Navigate to={paths.main} replace />;
  }
  console.log(route.roles, role);

  if (route.auth === authTypes.public) {
    console.log("public");
    if (role === roles.blogger && !route.roles?.includes(role)) {
      return <Navigate to={paths.mainBlogger} replace />;
    }
    if (role === roles.advertiser && !route.roles?.includes(role)) {
      return <Navigate to={paths.main} replace />;
    }
    if (role === roles.moderator && !route.roles?.includes(role)) {
      return <Navigate to={paths.orders} replace />;
    }
  }

  // Проверка на роль
  if (route.roles && !route.roles.includes(role)) {
    if (role === roles.moderator) {
      return <Navigate to={paths.adminHome} replace />;
    }
    if (role === roles.manager) {
      return <Navigate to={paths.orders} replace />;
    }
    return <Navigate to={paths.main} replace />;
  }

  // Оборачиваем в нужный layout
  let Component = <route.component />;
  if (route.authSidebar && isAuth) {
    Component = <SideBarLayout>{Component}</SideBarLayout>;
  }
  if (route.adminSidebar) {
    Component = <SideBarAdminLayout>{Component}</SideBarAdminLayout>;
  }

  return Component;
};

const rootRoutes = allRoutes
  .filter((route) => route.layout === layoutTypes.root)
  .map((route) => ({
    path: route.path,
    element: <ProtectedRoute route={route} />,
  }));

const adminRoutes = allRoutes
  .filter((route) => route.layout === layoutTypes.admin)
  .map((route) => ({
    path: route.path,
    element: <ProtectedRoute route={route} />,
  }));

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <RootLayout />,
    children: rootRoutes,
  },
  {
    path: paths.main,
    element: <RootAdminLayout />,
    children: adminRoutes,
  },
]);
