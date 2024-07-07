import { Outlet } from "react-router-dom";
import { HandleAuth } from "@widgets/handleAuth";
import { Toaster } from "@shared/ui/shadcn-ui/ui/toaster";
import { MainLayout } from "./mainLayout";

export const RootLayout = () => {
  return (
    <MainLayout>
      <HandleAuth />
      <Outlet />
      <Toaster />
    </MainLayout>
  );
};
