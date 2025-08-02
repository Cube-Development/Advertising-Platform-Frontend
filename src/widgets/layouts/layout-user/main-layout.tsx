import {
  useGetAccountEDOQuery,
  useGetOrganizationQuery,
  useGetProfileEDOQuery,
} from "@entities/organization";
import { ENUM_ROLES, USER_ROLES } from "@entities/user";
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
  const { isAuth, role, isAuthEcp } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { data: balance, isLoading } = useGetBalanceQuery(undefined, {
    skip: !isAuth,
  });

  useGetViewAdvertiserProjectQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.ADVERTISER,
  });

  useGetViewBloggerOrderQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
  });

  useGetViewBloggerChannelQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
  });

  useGetViewTransactionsQuery(undefined, {
    skip: !isAuth || role === ENUM_ROLES.MANAGER,
  });

  useGetViewManagerProjectQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.MANAGER,
  });

  useGetAccountEDOQuery(undefined, {
    skip: !isAuth || !isAuthEcp || !USER_ROLES.includes(role),
  });

  useGetProfileEDOQuery(undefined, {
    skip: !isAuth || !isAuthEcp || !USER_ROLES.includes(role),
  });

  useGetOrganizationQuery(undefined, {
    skip: !isAuth || !USER_ROLES.includes(role),
  });

  useEffect(() => {
    if (balance) {
      let wallet = {
        balance: 0,
        deposit_wallet: 0,
        profit_wallet: 0,
        spending_wallet: 0,
      };

      const deposit = balance?.deposit?.balance || 0;
      const profit = balance?.profit?.balance || 0;
      const spending = balance?.spending?.balance || 0;
      const total = deposit + profit;

      wallet = {
        balance: total,
        deposit_wallet: deposit,
        profit_wallet: profit,
        spending_wallet: spending,
      };
      dispatch(walletSlice.actions.setBalance(wallet));
    }
  }, [balance, isLoading]);

  return (
    <>
      <section className="main_layout">
        {/* <Suspense fallback={<div>loading...</div>}>
          <Header />
        </Suspense> */}
        <Header />
        <main className="user_main">{children}</main>
        <Footer />
      </section>
    </>
  );
};
