import { RootAdminLayout, RootLayout } from "@pages/layouts";
import { ENUM_LAYOUT_TYPES, ENUM_PATHS } from "@shared/routing";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { ALL_APP_ROUTES_LIST } from "./config";

const ROOT_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
  (route) => route.layout === ENUM_LAYOUT_TYPES.ROOT,
).map((route) => ({
  path: route.path,
  element: <ProtectedRoute route={route} />,
}));

const ADMIN_ROUTES_LIST = ALL_APP_ROUTES_LIST.filter(
  (route) => route.layout === ENUM_LAYOUT_TYPES.ADMIN,
).map((route) => ({
  path: route.path,
  element: <ProtectedRoute route={route} />,
}));

export const router = createBrowserRouter([
  {
    path: ENUM_PATHS.MAIN,
    element: <RootLayout />,
    children: ROOT_ROUTES_LIST,
  },
  {
    path: ENUM_PATHS.MAIN,
    element: <RootAdminLayout />,
    children: ADMIN_ROUTES_LIST,
  },
]);
