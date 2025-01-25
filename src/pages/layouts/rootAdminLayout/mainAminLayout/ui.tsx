import { lazy, Suspense, type PropsWithChildren } from "react";
import { FooterAdmin } from "@pages/layouts/components";

const HeaderAdmin = lazy(() =>
  import("@pages/layouts/components").then((module) => ({
    default: module.HeaderAdmin,
  })),
);

export const MainAdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <section className="admin_panel_layout">
        <Suspense fallback={<div>loading...</div>}>
          <HeaderAdmin />
        </Suspense>
        <main className="main">{children}</main>
        <FooterAdmin />
      </section>
    </>
  );
};
