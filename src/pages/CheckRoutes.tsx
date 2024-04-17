import { managmentRoles, roles, userRoles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { useAppSelector } from "@shared/store";
import { Navigate, Outlet } from "react-router-dom";

export enum routerType {
  public = "public",
  private = "private",
}

export const CheckRoutes = ({
  checkRole,
  type,
}: {
  checkRole?: roles;
  type: routerType;
}) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  console.log("ProtectedRoutes", role, checkRole);

  if (type === routerType.public) {
    console.log("PublicdRoutes", role, checkRole);
    if (
      !isAuth ||
      (isAuth && role === checkRole) ||
      (isAuth && managmentRoles.includes(role))
    ) {
      console.log("PublicdRoutes1111", role, checkRole);
      return <Outlet />;
    } else {
      console.log("PublicdRoutes222", role, checkRole);
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
      console.log("CommonRouter", checkRole);
      return <Outlet />;
    } else if (isAuth && userRoles.includes(role)) {
      console.log("userRoles", checkRole, role);
      return role === checkRole ? (
        <Outlet />
      ) : (
        <Navigate
          to={role === roles.advertiser ? paths.main : paths.mainBlogger}
          replace
        />
      );
    } else if (isAuth && managmentRoles.includes(role)) {
      console.log("managmentRoles", checkRole, role);
      return <Outlet />;
    } else {
      return <Navigate to={paths.main} replace />;
    }
  }
};
