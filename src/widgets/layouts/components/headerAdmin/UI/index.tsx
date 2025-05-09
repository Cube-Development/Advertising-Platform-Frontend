import { adminAPI } from "@entities/admin";
import { logout } from "@entities/user";
import { AdminProfile } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Chat, Notifications } from "@widgets/communication";
import { FC } from "react";
import { DropdownMenu } from "./dropdownMenu";
import { Profile } from "./profile";
import styles from "./styles.module.scss";

export const HeaderAdmin: FC = () => {
  const profile = AdminProfile;
  const { role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const toggleLogout = () => {
    dispatch(logout());
    dispatch(adminAPI.util.resetApiState());
  };
  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <DropdownMenu />
      </div>
      <div className={styles.right}>
        <div className={styles.icons}></div>
        <Notifications />
        <Chat isMain={true} />
        <Profile toggleLogout={toggleLogout} />
      </div>
    </header>
  );
};
