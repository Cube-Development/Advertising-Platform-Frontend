import { FC } from "react";
import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";
import { adminMenu } from "./config";
import { CubeDevelopmentIcon } from "@shared/assets";

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
