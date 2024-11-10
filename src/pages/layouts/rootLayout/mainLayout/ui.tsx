import { Footer, Header } from "@pages/layouts/components";
import type { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <section className="main_layout">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </section>
    </>
  );
};
