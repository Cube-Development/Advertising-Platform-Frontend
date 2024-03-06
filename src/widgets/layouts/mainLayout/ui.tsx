import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import { SideBar } from "@widgets/sideBar";
import type { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <SideBar /> */}
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};
