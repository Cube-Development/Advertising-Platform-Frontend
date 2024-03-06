import { SideBar } from "@widgets/sideBar";
import type { PropsWithChildren } from "react";

export const SideBarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SideBar />
      <div>{children}</div>
    </>
  );
};
