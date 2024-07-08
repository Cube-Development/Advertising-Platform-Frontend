import type { PropsWithChildren } from "react";
import { Footer, Header } from "../../components";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="main_layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </section>
  );
};
