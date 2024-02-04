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
import { Wallet } from "./wallet";
import { Chat } from "./chat";

export const Header: FC = () => {
  const { isAuth, toggleLogout } = useAuth();
  const { currentRole, toggleRole } = useRole();

  return (
    // <header className={`${styles.wrapper}`}>
    //     {isAuth && <DropdownMenu currentRole={currentRole} toggleRole={toggleRole}/>}
    //     <Logo currentRole={currentRole} />
    //     <Nav
    //       isAuth={isAuth}
    //       toggleLogout={toggleLogout}
    //       currentRole={currentRole}
    //     />
    //     {isAuth && <Wallet />}
    //     <Lang />
    //     {isAuth 
    //     ? 
    //     <>
    //       <Chat />
    //       <Profile toggleLogout={toggleLogout} /> 
    //     </>
    //     : 
    //     <LoginBtn />}
    // </header>
    <header className={`${styles.wrapper}`}>
      
        <div className={`${styles.row}`}>
          {isAuth && <DropdownMenu currentRole={currentRole} toggleRole={toggleRole}/>} 
          <Logo currentRole={currentRole} />
          <Nav
            isAuth={isAuth}
            toggleLogout={toggleLogout}
            currentRole={currentRole}
          />
        </div>

        <div className={`${styles.row}`}>
          {isAuth && <Wallet />}
          <Lang />
          {isAuth 
          ? 
          <>
            <Chat />
            <Profile toggleLogout={toggleLogout} /> 
          </>
          : 
          <LoginBtn />}
        </div>

    </header>
  );
};
