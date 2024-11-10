import type { PropsWithChildren } from "react";
import { SidebarAdmin } from "../components";

export const SideBarAdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SidebarAdmin />
      <div>{children}</div>
    </>
  );
};
