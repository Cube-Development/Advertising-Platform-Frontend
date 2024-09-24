import { managmentRoles, roles, userRoles } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { paths } from "@shared/routing";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export enum routerType {
  public = "public",
  onlyPublic = "onlyPublic",
  private = "private",
}

export const CheckProjectId = () => {
  const projectId = Cookies.get("project_id");
  if (projectId) {
    return <Outlet />;
  } else {
    return <Navigate to={paths.cart} replace />;
  }
};

export const CheckRoutes = ({
  checkRole,
  type,
}: {
  checkRole?: roles;
  type: routerType;
}) => {
  const { isAuth, role } = useAppSelector((state) => state.user);

  if (type === routerType.onlyPublic) {
    if (!isAuth) {
      return <Outlet />;
    } else {
      return (
        <Navigate
          to={role === roles.advertiser ? paths.main : paths.mainBlogger}
          replace
        />
      );
    }
  } else if (type === routerType.public) {
    // console.log("PublicdRoutes", role, checkRole);
    if (
      !isAuth ||
      (isAuth && role === checkRole) ||
      (isAuth && managmentRoles.includes(role))
    ) {
      return <Outlet />;
    } else {
      return (
        <Navigate
          to={role === roles.advertiser ? paths.main : paths.mainBlogger}
          replace
        />
      );
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
        <Navigate
          to={role === roles.advertiser ? paths.main : paths.mainBlogger}
          replace
        />
      );
    } else if (isAuth && managmentRoles.includes(role)) {
      // console.log("managmentRoles", checkRole, role);
      return <Outlet />;
    } else {
      return <Navigate to={paths.main} replace />;
    }
  }
};
