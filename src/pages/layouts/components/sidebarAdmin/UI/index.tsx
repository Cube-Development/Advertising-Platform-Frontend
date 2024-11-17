import { CubeDevelopmentIcon } from "@shared/assets";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminMenu } from "./config";
import styles from "./styles.module.scss";

export const SidebarAdmin: FC = () => {
  const location = useLocation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <CubeDevelopmentIcon />
      </div>
      <ul>
        {adminMenu.map((item, index) => (
          <Link to={item.item.path!} key={index}>
            <li
              className={`${location.pathname === item.item.path ? styles.active : ""}`}
            >
              {item.item.img && <item.item.img />}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
