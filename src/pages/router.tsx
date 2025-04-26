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
  ALL_APP_ROUTES_LIST,
  ENUM_AUTH_TYPES,
  ENUM_LAYOUT_TYPES,
  IRouting,
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

  if (route.auth === ENUM_AUTH_TYPES.PUBLIC) {
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

const ROOT_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
  (route) => route.layout === ENUM_LAYOUT_TYPES.ROOT,
).map((route) => ({
  path: route.path,
  element: <ProtectedRoute route={route} />,
}));

const ADMIN_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
  (route) => route.layout === ENUM_LAYOUT_TYPES.ADMIN,
).map((route) => ({
  path: route.path,
  element: <ProtectedRoute route={route} />,
}));

export const router = createBrowserRouter([
  {
    path: ENUM_PATHS.MAIN,
    element: <RootLayout />,
    children: ROOT_ROUTES_LIST,
  },
  {
    path: ENUM_PATHS.MAIN,
    element: <RootAdminLayout />,
    children: ADMIN_ROUTES_LIST,
  },
]);
