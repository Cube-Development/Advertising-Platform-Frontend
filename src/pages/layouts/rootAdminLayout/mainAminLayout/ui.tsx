import { FooterAdmin, HeaderAdmin } from "@pages/layouts/components";
import type { PropsWithChildren } from "react";

export const MainAdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <section className="admin_panel_layout">
        <HeaderAdmin />
        <main className="main">{children}</main>
        <FooterAdmin />
      </section>
    </>
  );
};
