import { FC } from "react";
import { LoginBtn } from "./loginBtn";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import styles from "./styles.module.scss";
import { Lang } from "./lang";
import { useAuth } from "@shared/hooks/useAuth";
import { useRole } from "@shared/hooks/useRole";
import { DropdownMenu } from "./dropdownMenu";

export const Header: FC = () => {
  const { isAuth, toggleLogin, toggleLogout } = useAuth();
  const { currentRole, toggleRole } = useRole();

  return (
    <header className={styles.wrapper}>
      <DropdownMenu currentRole={currentRole} toggleRole={toggleRole}/>
      <Logo currentRole={currentRole} />
      <Nav
        isAuth={isAuth}
        toggleLogin={toggleLogin}
        toggleLogout={toggleLogout}
        currentRole={currentRole}
        toggleRole={toggleRole}
      />
      <Lang />
      {isAuth ? <Profile /> : <LoginBtn />}
    </header>
  );
};
