import {
  logout,
  roles,
  toggleRole as toggleRoleAction,
  useUpdateRoleMutation,
} from "@entities/user";
import { useGetBalanceQuery, walletSlice } from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Chat, Notifications } from "@widgets/communication";
import { FC, useEffect, useState } from "react";
import { DropdownMenu } from "./dropdownMenu";
import { Lang } from "./lang";
import { LoginBtn } from "./loginBtn";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import styles from "./styles.module.scss";
import { Wallet } from "./wallet";
import { authApi, baseApi } from "@shared/api";

export const Header: FC = () => {
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const toggleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    dispatch(authApi.util.resetApiState());
  };

  const { data, isLoading } = useGetBalanceQuery(undefined, {
    skip: !isAuth,
  });

  useEffect(() => {
    if (data) {
      dispatch(walletSlice.actions.setBalance(data?.balance));
    }
  }, [data, isLoading]);

  const [updateRole] = useUpdateRoleMutation();

  const toggleRole = (currentRole: roles) => {
    if (currentRole !== role) {
      dispatch(toggleRoleAction(currentRole));
      updateRole({ role: currentRole });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.wrapper}>
      <div className={styles.navigation}>
        {(isAuth || screen <= BREAKPOINT.HEADER_NAVBAR_VISIBLE) && (
          <DropdownMenu
            isAuth={isAuth}
            currentRole={role}
            toggleRole={toggleRole}
          />
        )}
        <Logo currentRole={role} />
        <Nav isAuth={isAuth} currentRole={role} toggleRole={toggleRole} />
      </div>

      <div className={styles.profile}>
        <Lang />
        {isAuth && screen > BREAKPOINT.MD && <Wallet />}
        {isAuth ? (
          <>
            <div className={styles.separator}></div>
            <Notifications />
            <Chat isMain={true} />
            <Profile toggleLogout={toggleLogout} />
          </>
        ) : (
          <LoginBtn />
        )}
      </div>
    </header>
  );
};
