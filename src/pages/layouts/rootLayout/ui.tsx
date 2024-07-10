import { Outlet } from "react-router-dom";
import { Toaster } from "@shared/ui/shadcn-ui/ui/toaster";
import { MainLayout } from "./mainLayout";
import { HandleAuth } from "@widgets/other";

export const RootLayout = () => {
  return (
    <MainLayout>
      <HandleAuth />
      <Outlet />
      <Toaster />
    </MainLayout>
  );
};
