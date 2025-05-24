import { ENUM_ROLES, toggleRole } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_AUTH_TYPES, ENUM_PATHS, IRouting } from "@shared/routing";
import { SideBarAdminLayout, SideBarLayout } from "@widgets/layouts";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
  const { isAuth, role: sliceRole } = useAppSelector((state) => state.user);
  let role: ENUM_ROLES = sliceRole;
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Проверка на авторизацию
  if (route.auth === ENUM_AUTH_TYPES.ONLY_PUBLIC && isAuth) {
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
  }
  if (route.auth === ENUM_AUTH_TYPES.PRIVATE && !isAuth) {
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
  }

  const query = new URLSearchParams(location.search);
  const isAccess = query.get("access") === "true";

  // Если есть доступ, то устанавливаем роль в куки
  useEffect(() => {
    if (isAccess) {
      dispatch(toggleRole(route?.roles?.[0] as ENUM_ROLES));
    }
  }, [isAccess]);

  if (isAccess) {
    role = route?.roles?.[0] as ENUM_ROLES;
  }

  // Проверка на доступность публичного маршрута в зависимости от роли
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
  // Проверка на доступность остальных маршрутов в зависимости от роли
  if (route.roles && !route.roles.includes(role)) {
    if (role === ENUM_ROLES.MODERATOR) {
      return <Navigate to={ENUM_PATHS.ADMIN_HOME} replace />;
    }
    if (role === ENUM_ROLES.MANAGER) {
      return <Navigate to={ENUM_PATHS.ORDERS} replace />;
    }
    console.log("Access denied for role", role);
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
