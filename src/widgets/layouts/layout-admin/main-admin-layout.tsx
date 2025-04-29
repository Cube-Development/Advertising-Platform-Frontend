import { lazy, Suspense, type PropsWithChildren } from "react";
import { FooterAdmin } from "../components";

const HeaderAdmin = lazy(() =>
  import("../components").then((module) => ({
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
