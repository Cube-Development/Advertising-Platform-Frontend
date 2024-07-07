import { Outlet } from "react-router-dom";
import { MainLayout } from "../mainLayout";
import { HandleAuth } from "@widgets/handleAuth";
import { Toaster } from "@shared/ui/shadcn-ui/ui/toaster";

export const RootLayout = () => {
  return (
    <MainLayout>
      <HandleAuth />
      <Outlet />
      <Toaster />
    </MainLayout>
  );
};
