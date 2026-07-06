import { isEmailInAllowlist } from "@entities/self-connect-order";
import {
  ENUM_ROLES,
  toggleRole,
  USER_ROLES,
  useGetUserQueryQuery,
} from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_AUTH_TYPES, ENUM_PATHS, IRouting } from "@shared/routing";
import { SuspenseLoader } from "@shared/ui";
import { SideBarAdminLayout, SideBarLayout } from "@widgets/layouts";
import { NotFoundPage } from "@pages/NotFound";
import { useEffect, useMemo, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
  const { isAuth, role: sliceRole } = useAppSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const hasEmailAllowlist = route.allowedEmails !== undefined;

  const { data: user, isFetching: isUserFetching } = useGetUserQueryQuery(
    undefined,
    {
      skip: !isAuth || !hasEmailAllowlist,
    },
  );

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const isAccess = query.get("access") === "true";

  // Один раз при заходе на /blogger неавторизованным пользователем
  // принудительно делаем его блогером (вместо редиректа на "/"), но не мешаем
  // дальнейшему ручному переключению роли через свитчер
  const didAutoAssignBlogger = useRef(false);
  const shouldAutoAssignBlogger =
    !isAuth &&
    route.path === ENUM_PATHS.MAIN_BLOGGER &&
    !didAutoAssignBlogger.current &&
    sliceRole !== ENUM_ROLES.BLOGGER;

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

    // Первый заход на главную блогера по ссылке — становимся блогером
    if (shouldAutoAssignBlogger) {
      role = ENUM_ROLES.BLOGGER;
      condition = true;
    }

    return { role, condition };
  }, [route?.roles, sliceRole, isAccess, shouldAutoAssignBlogger]);

  // Помечаем, что авто-назначение блогера уже выполнено
  useEffect(() => {
    if (shouldAutoAssignBlogger) {
      didAutoAssignBlogger.current = true;
    }
  }, [shouldAutoAssignBlogger]);

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

  if (hasEmailAllowlist && isAuth) {
    if (isUserFetching) {
      return <SuspenseLoader />;
    }

    if (!isEmailInAllowlist(user?.email, route.allowedEmails!)) {
      return <NotFoundPage />;
    }
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
