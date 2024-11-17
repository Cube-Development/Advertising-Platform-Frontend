import {
  AdminChatIcon,
  AdminNotificationsIcon,
  AdminSearchIcon,
  ArrowLongHorizontalIcon,
} from "@shared/assets";
import { AdminProfile } from "@shared/config";
import { useAppSelector } from "@shared/hooks";
import { FC } from "react";
import styles from "./styles.module.scss";
import { DropdownMenu } from "./dropdownMenu";

export const HeaderAdmin: FC = () => {
  const profile = AdminProfile;
  const { role } = useAppSelector((state) => state.user);
  return (
    <header className={styles.wrapper}>
      <div className={styles.left}>
        <DropdownMenu />
      </div>
      <div className={styles.right}>
        <div className={styles.icons}>
          <AdminSearchIcon />
          <AdminNotificationsIcon />
          <AdminChatIcon />
        </div>
        <div className={styles.info}>
          <div className={styles.image}>
            <img src={profile.avatar} alt="admin-image" />
          </div>
          <div className={styles.admin}>
            <p>{profile.name}</p>
            <span>{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
