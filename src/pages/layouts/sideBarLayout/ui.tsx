import type { PropsWithChildren } from "react";
import { Sidebar } from "../components";

export const SideBarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <div>{children}</div>
    </>
  );
};
