import { type PropsWithChildren } from "react";

export const MainAdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <section className="admin_panel_layout"> */}
      {/* <Suspense fallback={<div>loading...</div>}>
        <HeaderAdmin />
      </Suspense> */}
      <div>{children}</div>
      {/* <FooterAdmin /> */}
      {/* </section> */}
    </>
  );
};
