import { Sidebar } from "@widgets/sidebar";
import type { PropsWithChildren } from "react";

export const SideBarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <div>{children}</div>
    </>
  );
};
