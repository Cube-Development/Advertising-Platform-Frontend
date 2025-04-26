import { ENUM_ROLES } from "@entities/user";
import {
  RootAdminLayout,
  RootLayout,
  SideBarAdminLayout,
  SideBarLayout,
} from "@pages/layouts";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  allRoutes,
  ENUM_AUTH_TYPES,
  IRouting,
  ENUM_LAYOUT_TYPES,
} from "./routes";

// Компонент защиты маршрутов
const ProtectedRoute = ({ route }: { route: IRouting }) => {
  const { isAuth, role } = useAppSelector((state) => state.user);

  // Проверка на авторизацию
  if (route.auth === ENUM_AUTH_TYPES.ONLY_PUBLIC && isAuth) {
    console.log("onlyPublic");
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
  }
  if (route.auth === ENUM_AUTH_TYPES.PRIVATE && !isAuth) {
    console.log("private");
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
  }
  console.log(route.roles, role);

  if (route.auth === ENUM_AUTH_TYPES.PUBLIC) {
    console.log("public");
    if (role === ENUM_ROLES.BLOGGER && !route.roles?.includes(role)) {
      return <Navigate to={ENUM_PATHS.MAIN_BLOGGER} replace />;
    }
    if (role === ENUM_ROLES.ADVERTISER && !route.roles?.includes(role)) {
      return <Navigate to={ENUM_PATHS.MAIN} replace />;
    }
    if (role === ENUM_ROLES.MODERATOR && !route.roles?.includes(role)) {
      return <Navigate to={ENUM_PATHS.ORDERS} replace />;
    }
  }

  // Проверка на роль
  if (route.roles && !route.roles.includes(role)) {
    if (role === ENUM_ROLES.MODERATOR) {
      return <Navigate to={ENUM_PATHS.ADMIN_HOME} replace />;
    }
    if (role === ENUM_ROLES.MANAGER) {
      return <Navigate to={ENUM_PATHS.ORDERS} replace />;
    }
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
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
  .filter((route) => route.layout === ENUM_LAYOUT_TYPES.ROOT)
  .map((route) => ({
    path: route.path,
    element: <ProtectedRoute route={route} />,
  }));

const adminRoutes = allRoutes
  .filter((route) => route.layout === ENUM_LAYOUT_TYPES.ADMIN)
  .map((route) => ({
    path: route.path,
    element: <ProtectedRoute route={route} />,
  }));

export const router = createBrowserRouter([
  {
    path: ENUM_PATHS.MAIN,
    element: <RootLayout />,
    children: rootRoutes,
  },
  {
    path: ENUM_PATHS.MAIN,
    element: <RootAdminLayout />,
    children: adminRoutes,
  },
]);
