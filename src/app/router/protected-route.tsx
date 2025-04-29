import { ENUM_ROLES } from "@entities/user";
import { SideBarAdminLayout, SideBarLayout } from "@pages/layouts";
import { useAppSelector } from "@shared/hooks";
import { ENUM_AUTH_TYPES, ENUM_PATHS, IRouting } from "@shared/routing";
import { Navigate } from "react-router-dom";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
  const { isAuth, role } = useAppSelector((state) => state.user);

  // Проверка на авторизацию
  if (route.auth === ENUM_AUTH_TYPES.ONLY_PUBLIC && isAuth) {
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
  }
  if (route.auth === ENUM_AUTH_TYPES.PRIVATE && !isAuth) {
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
