import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";
import type { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};
