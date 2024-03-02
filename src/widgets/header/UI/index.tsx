import { FC } from "react";
import { LoginBtn } from "./loginBtn";
import { Logo } from "./logo";
import { Nav } from "./nav";
import { Profile } from "./profile";
import styles from "./styles.module.scss";
import { Lang } from "./lang";
import { DropdownMenu } from "./dropdownMenu";
import { Wallet } from "./wallet";
import { Chat } from "./chat";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { userSlice } from "@shared/store/reducers";
import { roles } from "@shared/config/roles";

export const Header: FC = () => {
  const { isAuth, role } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const toggleLogout = () => {
    dispatch(userSlice.actions.logout());
  };
  const toggleRole = (role: roles) => {
    dispatch(userSlice.actions.toggleRole(role));
  };

  return (
    <header className={`${styles.wrapper}`}>
      <div className={`${styles.row__left}`}>
        {isAuth && <DropdownMenu currentRole={role} toggleRole={toggleRole} />}
        <Logo currentRole={role} />
        <Nav isAuth={isAuth} currentRole={role} />
      </div>

      <div className={`${styles.row}`}>
        {isAuth && <Wallet />}
        <Lang />
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
