import { useLocation, Navigate, Outlet } from "react-router-dom";
import { managmentRoles, roles, userRoles } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import Cookies from "js-cookie";

export enum routerType {
  public = "public",
  onlyPublic = "onlyPublic",
  private = "private",
}

export const CheckProjectId = () => {
  const projectId = Cookies.get("project_id");
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
      (isAuth && managmentRoles.includes(role))
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
    } else if (isAuth && managmentRoles.includes(role)) {
      return <Outlet />;
    } else {
      return <Navigate to={paths.main} replace />;
    }
  }
};
