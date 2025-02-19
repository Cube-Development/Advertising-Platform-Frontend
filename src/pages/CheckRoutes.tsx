import { managementRoles, roles, userRoles } from "@entities/user";
import { cookiesTypes } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export enum routerType {
  public = "public",
  onlyPublic = "onlyPublic",
  private = "private",
}

export const CheckProjectId = () => {
  const projectId = Cookies.get(cookiesTypes.projectId);
  return projectId ? <Outlet /> : <Navigate to={paths.cart} replace />;
};

export const CheckRoutes = ({
  checkRole,
  type,
}: {
  checkRole?: roles;
  type: routerType;
}) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from");

  // Проверяем, является ли `from` допустимым путем из `paths`
  const isValidPath = from && Object.values(paths).includes(from as paths);
  const redirectPath = isValidPath
    ? (from as paths)
    : role === roles.advertiser
      ? paths.main
      : paths.mainBlogger;

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
      (isAuth && managementRoles.includes(role))
    ) {
      return <Outlet />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    if (!isAuth) {
      return <Navigate to={paths.main} replace />;
    } else if (isAuth && !checkRole) {
      return <Outlet />;
    } else if (isAuth && userRoles.includes(role)) {
      return role === checkRole ? (
        <Outlet />
      ) : (
        <Navigate to={redirectPath} replace />
      );
    } else if (isAuth && managementRoles.includes(role)) {
      return <Outlet />;
    } else {
      return <Navigate to={paths.main} replace />;
    }
  }
};

export const AminCheckRoute = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  // console.log(99999999999999)
  if (role === roles.moderator && isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to={paths.adminHome} replace />;
  }
};
