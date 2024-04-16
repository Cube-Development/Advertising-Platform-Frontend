import { Outlet } from "react-router-dom";
import { MainLayout } from "../mainLayout";
import { HandleAuth } from "@widgets/handleAuth";

export const RootLayout = () => {
  return (
    <MainLayout>
      <HandleAuth />
      <Outlet />
    </MainLayout>
  );
};
