import { Route, Routes } from "react-router-dom";
import { useAuth } from "./../shared/context/AuthContext";
import { privateRoutes, publicRoutes } from "./routes";

export const Routing = () => {
  const { isAuth } = useAuth();;
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      ))}
    </Routes>
  );
};
