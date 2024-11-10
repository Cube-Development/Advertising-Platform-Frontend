import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "@shared/ui";
import { MainAdminLayout } from "./mainAminLayout";

export const RootAdminLayout = () => {
  return (
    <MainAdminLayout>
      <Outlet />
      <Toaster />
      <ScrollRestoration />
    </MainAdminLayout>
  );
};
