import { MANAGEMENT_ROLES, ENUM_ROLES, USER_ROLES } from "@entities/user";
import { cookiesTypes } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export enum routerType {
  public = "public",
  onlyPublic = "onlyPublic",
  private = "private",
}

export const CheckProjectId = () => {
  const projectId = Cookies.get(cookiesTypes.projectId);
  return projectId ? <Outlet /> : <Navigate to={ENUM_PATHS.CART} replace />;
};

export const CheckRoutes = ({
  checkRole,
  type,
}: {
  checkRole?: ENUM_ROLES;
  type: routerType;
}) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from");

  // Проверяем, является ли `from` допустимым путем из `paths`
  const isValidPath =
    from && Object.values(ENUM_PATHS).includes(from as ENUM_PATHS);
  const redirectPath = isValidPath
    ? (from as ENUM_PATHS)
    : role === ENUM_ROLES.ADVERTISER
      ? ENUM_PATHS.MAIN
      : ENUM_PATHS.MAIN_BLOGGER;

  if (type === routerType.onlyPublic) {
    if (!isAuth) {
      return <Outlet />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  } else if (type === routerType.public) {
    if (
      !isAuth ||
      (isAuth && role === checkRole) ||
      (isAuth && MANAGEMENT_ROLES.includes(role))
    ) {
      return <Outlet />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    if (!isAuth) {
      return <Navigate to={ENUM_PATHS.MAIN} replace />;
    } else if (isAuth && !checkRole) {
      return <Outlet />;
    } else if (isAuth && USER_ROLES.includes(role)) {
      return role === checkRole ? (
        <Outlet />
      ) : (
        <Navigate to={redirectPath} replace />
      );
    } else if (isAuth && MANAGEMENT_ROLES.includes(role)) {
      return <Outlet />;
    } else {
      return <Navigate to={ENUM_PATHS.MAIN} replace />;
    }
  }
};

export const AminCheckRoute = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  // console.log(99999999999999)
  if (role === ENUM_ROLES.MODERATOR && isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to={ENUM_PATHS.ADMIN_HOME} replace />;
  }
};
