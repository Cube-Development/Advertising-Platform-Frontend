import { ENUM_ROLES, toggleRole, USER_ROLES } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_AUTH_TYPES, ENUM_PATHS, IRouting } from "@shared/routing";
import { SideBarAdminLayout, SideBarLayout } from "@widgets/layouts";
import { useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
  const { isAuth, role: sliceRole } = useAppSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const isAccess = query.get("access") === "true";

  const { role, condition } = useMemo(() => {
    let role: ENUM_ROLES = sliceRole;
    let condition = false;

    // Если есть доступ, то устанавливаем условие для роли:
    // - Если роль маршрута может быть клиентской (блогер, рекламодатель)
    // - Если текущая роль клиента тоже клиентская
    if (
      !!route?.roles?.length &&
      !!USER_ROLES.filter((value) => route?.roles?.includes(value))?.length &&
      USER_ROLES.includes(role) &&
      isAccess
    ) {
      condition = true;
      const route_user_roles: ENUM_ROLES[] = USER_ROLES.filter((value) =>
        route?.roles?.includes(value),
      );
      // Меняем роль на ту клиентскую, которая есть в маршруте, если она одна возможная клиентская роль
      if (route_user_roles.length === 1)
        role = route_user_roles[0] as ENUM_ROLES;
    }

    return { role, condition };
  }, [route?.roles, sliceRole, isAccess]);

  // Если есть доступ, то устанавливаем роль в куки
  useEffect(() => {
    if (condition) {
      dispatch(toggleRole(role));
    }
  }, [condition, role, dispatch]);

  // Проверка на авторизацию
  if (route.auth === ENUM_AUTH_TYPES.ONLY_PUBLIC && isAuth) {
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
  }
  if (route.auth === ENUM_AUTH_TYPES.PRIVATE && !isAuth) {
    return <Navigate to={ENUM_PATHS.MAIN} replace />;
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
    if (role === ENUM_ROLES.AGENCY) {
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
