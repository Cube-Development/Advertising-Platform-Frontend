import { Outlet, ScrollRestoration } from "react-router-dom";
import { MainLayout } from "./mainLayout";
import { LanguageDetector } from "@entities/user";
import { Toaster } from "@shared/ui";

export const RootLayout = () => {
  return (
    <MainLayout>
      <Outlet />
      <Toaster />
      <LanguageDetector />
      <ScrollRestoration />
    </MainLayout>
  );
};
