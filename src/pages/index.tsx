import { Route, Routes } from "react-router-dom";
import {
  privateBloggerRoutes,
  privateAdvertiserRoutes,
  publicRoutes,
} from "./routes";
import { useAuth } from "@shared/hooks/useAuth";
import { useRole } from "@shared/hooks/useRole";
import { roles } from "@shared/config/roles";

export const Routing = () => {
  const { isAuth } = useAuth();
  const { currentRole } = useRole();

  return (
    <Routes>
      {isAuth && currentRole === roles.blogger
        ? privateBloggerRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))
        : isAuth && currentRole === roles.advertiser
        ? privateAdvertiserRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))
        : publicRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
    </Routes>
  );
};
