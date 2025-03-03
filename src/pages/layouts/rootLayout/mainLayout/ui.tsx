import type { PropsWithChildren } from "react";
import { lazy, Suspense, useEffect } from "react";
import { Footer, Header } from "@pages/layouts/components";
import { roles } from "@entities/user";
import {
  useGetViewAdvertiserProjectQuery,
  useGetViewBloggerChannelQuery,
  useGetViewBloggerOrderQuery,
  useGetViewManagerProjectQuery,
  useGetViewTransactionsQuery,
} from "@entities/views";
import { useGetBalanceQuery, walletSlice } from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";

// const Header = lazy(() =>
//   import("@pages/layouts/components").then((module) => ({
//     default: module.Header,
//   })),
// );

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { data: balance, isLoading } = useGetBalanceQuery(undefined, {
    skip: !isAuth,
  });

  const {} = useGetViewAdvertiserProjectQuery(undefined, {
    skip: !isAuth || role !== roles.advertiser,
  });

  const {} = useGetViewBloggerOrderQuery(undefined, {
    skip: !isAuth || role !== roles.blogger,
  });

  const {} = useGetViewBloggerChannelQuery(undefined, {
    skip: !isAuth || role !== roles.blogger,
  });

  const {} = useGetViewTransactionsQuery(undefined, {
    skip: !isAuth || role === roles.manager,
  });

  const {} = useGetViewManagerProjectQuery(undefined, {
    skip: !isAuth || role !== roles.manager,
  });

  useEffect(() => {
    if (balance) {
      dispatch(walletSlice.actions.setBalance(balance?.balance));
    }
  }, [balance, isLoading]);

  return (
    <>
      <section className="main_layout">
        {/* <Suspense fallback={<div>loading...</div>}>
          <Header />
        </Suspense> */}
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </section>
    </>
  );
};
