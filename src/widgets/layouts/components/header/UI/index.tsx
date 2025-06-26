import { USER_ROLES } from "@entities/user";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
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

  return (
    <header
      className={`${styles.wrapper} ${isScrollingUp || lastScrollY === 0 ? styles.visible : styles.hidden}`}
    >
      {screen > BREAKPOINT.MD && (
        <div className={styles.dropdown}>
          <DropdownMenu />
        </div>
      )}
      <section className={styles.header}>
        <div className={styles.navigation}>
          {screen <= BREAKPOINT.MD && <DropdownMenu />}
          <Logo currentRole={role} />
          <Nav />
        </div>

        <div className={styles.profile}>
          <Lang isAuth={isAuth} />
          {isAuth && USER_ROLES.includes(role) && screen > BREAKPOINT.MD && (
            <Wallet />
          )}
          {isAuth ? (
            <>
              <div className={styles.separator}></div>
              <Notifications />
              <Chat isMain={true} />
              <Profile />
            </>
          ) : (
            <LoginBtn />
          )}
        </div>
      </section>
    </header>
  );
};
