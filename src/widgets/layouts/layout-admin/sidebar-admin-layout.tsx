import { SidebarInset, SidebarProvider } from "@shared/ui";
import type { PropsWithChildren } from "react";
import { HeaderAdmin, SidebarAdmin } from "../components";

export const SideBarAdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <SidebarAdmin />
      <SidebarInset>
        <HeaderAdmin />
        <div className="user_main">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
