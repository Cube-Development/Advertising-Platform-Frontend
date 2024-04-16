import { managmentRoles, roles, userRoles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { useAppSelector } from "@shared/store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ checkRole }: { checkRole?: roles }) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  console.log("ProtectedRoutes", role, checkRole);
  if (!isAuth) {
    return <Navigate to={paths.main} replace />;
  } else if (isAuth && !checkRole) {
    console.log("CommonRouter", checkRole);
    return <Outlet />;
  } else if (isAuth && userRoles.includes(role)) {
    console.log("roleRouter", checkRole, role);
    return role === checkRole ? (
      <Outlet />
    ) : (
      <Navigate
        to={role === roles.advertiser ? paths.main : paths.mainBlogger}
        replace
      />
    );
  } else if (isAuth && managmentRoles.includes(role)) {
    console.log("lManagment", checkRole, role);
    return <Outlet />;
  } else {
    return <Navigate to={paths.main} replace />;
  }
};
