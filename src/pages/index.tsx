import { Route, Routes } from "react-router-dom";
import {
  privateBloggerRoutes,
  privateAdvertiserRoutes,
  publicRoutes,
} from "./routes";
// import { useAuth } from "@shared/hooks/useAuth";
import { useRole } from "@shared/hooks/useRole";
import { roles } from "@shared/config/roles";
import { useAppSelector } from "@shared/store";

export const Routing = () => {
  // const { isAuth } = useAuth();
  const { isAuth, role } = useAppSelector((state) => state.userReducer);
  // const { currentRole } = useRole();

  return (
    <Routes>
      {isAuth && role === roles.blogger
        ? privateBloggerRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))
        : isAuth && role === roles.advertiser
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
