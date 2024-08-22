import { Outlet, ScrollRestoration } from "react-router-dom";
import { MainLayout } from "./mainLayout";
import { HandleAuth } from "@features/other";
import { Toaster } from "@shared/ui";

export const RootLayout = () => {
  return (
    <MainLayout>
      <HandleAuth />
      <Outlet />
      <Toaster />
      <ScrollRestoration />
    </MainLayout>
  );
};
