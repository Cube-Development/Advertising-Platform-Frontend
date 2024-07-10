import { FC, useEffect, useState } from "react";
import { LoginBtn } from "./loginBtn";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import styles from "./styles.module.scss";
import { Lang } from "./lang";
import { DropdownMenu } from "./dropdownMenu";
import { Wallet } from "./wallet";
import { Chat } from "@widgets/communication";
import { logout, roles, toggleRole as toggleRoleAction } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";

export const Header: FC = () => {
  const [screen, setScreen] = useState<number>(window.innerWidth);
  const { isAuth, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const toggleLogout = () => {
    dispatch(logout());
  };
  const toggleRole = (role: roles) => {
    dispatch(toggleRoleAction(role));
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
        {(isAuth || screen <= 1100) && (
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
        {isAuth && screen > 768 && <Wallet />}
        {isAuth ? (
          <>
            <div className={styles.separator}></div>
            <Chat />
            <Profile toggleLogout={toggleLogout} />
          </>
        ) : (
          <LoginBtn />
        )}
      </div>
    </header>
  );
};
