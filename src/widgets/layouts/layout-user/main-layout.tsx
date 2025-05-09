import { ENUM_ROLES } from "@entities/user";
import {
  useGetViewAdvertiserProjectQuery,
  useGetViewBloggerChannelQuery,
  useGetViewBloggerOrderQuery,
  useGetViewManagerProjectQuery,
  useGetViewTransactionsQuery,
} from "@entities/views";
import { useGetBalanceQuery, walletSlice } from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { Footer, Header } from "../components";

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
    skip: !isAuth || role !== ENUM_ROLES.ADVERTISER,
  });

  const {} = useGetViewBloggerOrderQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
  });

  const {} = useGetViewBloggerChannelQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
  });

  const {} = useGetViewTransactionsQuery(undefined, {
    skip: !isAuth || role === ENUM_ROLES.MANAGER,
  });

  const {} = useGetViewManagerProjectQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.MANAGER,
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
