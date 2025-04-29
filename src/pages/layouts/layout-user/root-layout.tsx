import { Outlet, ScrollRestoration } from "react-router-dom";
import { LanguageDetector } from "@entities/user";
import { Toaster } from "@shared/ui";
import { MainLayout } from "./main-layout";

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
