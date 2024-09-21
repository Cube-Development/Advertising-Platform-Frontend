import { Outlet, ScrollRestoration } from "react-router-dom";
import { MainLayout } from "./mainLayout";
import { Toaster } from "@shared/ui";

export const RootLayout = () => {
  return (
    <MainLayout>
      <Outlet />
      <Toaster />
      <ScrollRestoration />
    </MainLayout>
  );
};
