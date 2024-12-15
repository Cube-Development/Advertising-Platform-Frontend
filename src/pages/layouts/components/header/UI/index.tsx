import {
  logout,
  roles,
  toggleRole as toggleRoleAction,
  useUpdateRoleMutation,
} from "@entities/user";
import { authApi, baseApi } from "@shared/api";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useAppSelector, useWindowWidth } from "@shared/hooks";
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

export const Header: FC = () => {
  const screen = useWindowWidth();
  const [isScrollingUp, setIsScrollingUp] = useState(true); // Отслеживание направления скролла
  const [lastScrollY, setLastScrollY] = useState(0); // Последняя позиция скролла
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const toggleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    dispatch(authApi.util.resetApiState());
  };

  const [updateRole] = useUpdateRoleMutation();

  const toggleRole = (currentRole: roles) => {
    if (currentRole !== role) {
      dispatch(toggleRoleAction(currentRole));
      if (isAuth) {
        updateRole({ role: currentRole });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const { dropdownMenu } = useAppSelector((state) => state.dropdownMenu);

  return (
    <header
      className={`${styles.wrapper} ${!isAuth && styles.not_auth} ${isScrollingUp || lastScrollY === 0 ? styles.visible : styles.hidden}`}
    >
      {(isAuth || screen <= BREAKPOINT.HEADER_NAVBAR_VISIBLE) && (
        <div
          className={`${styles.dropdown} ${dropdownMenu.isOpen && screen > BREAKPOINT.MD && styles.circle_hidden}`}
        >
          <DropdownMenu
            isAuth={isAuth}
            currentRole={role}
            toggleRole={toggleRole}
          />
        </div>
      )}
      <section
        className={`${styles.header} ${dropdownMenu.isOpen && screen > BREAKPOINT.MD && styles.is_open}`}
      >
        <div className={styles.navigation}>
          <div className={styles.dropdown_mobile}>
            {(isAuth || screen <= BREAKPOINT.HEADER_NAVBAR_VISIBLE) && (
              <DropdownMenu
                isAuth={isAuth}
                currentRole={role}
                toggleRole={toggleRole}
              />
            )}
          </div>
          <Logo currentRole={role} />
          <Nav isAuth={isAuth} currentRole={role} toggleRole={toggleRole} />
        </div>

        <div className={styles.profile}>
          <Lang isAuth={isAuth} />
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
      </section>
    </header>
  );
};
