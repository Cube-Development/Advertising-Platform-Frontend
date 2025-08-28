import { SidebarInset, SidebarProvider } from "@shared/ui";
import type { PropsWithChildren } from "react";
import { FooterAdmin, HeaderAdmin, SidebarAdmin } from "../components";

export const SideBarAdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <SidebarInset className="bg-transparent main_background">
        <HeaderAdmin />
        <div className="mb-20 user_main">{children}</div>
        <FooterAdmin />
      </SidebarInset>
    </SidebarProvider>
  );
};
