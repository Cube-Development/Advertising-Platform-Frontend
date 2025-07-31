import { CubeDevelopmentIcon } from "@shared/assets";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_ADMIN_MENU, SIDEBAR_ADMIN_MENU_ORGANIZATION } from "./config";
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/hooks";
import { IMenuItem } from "../../header/model";

export const SidebarAdmin: FC = () => {
  const location = useLocation();
  const { isAuthEcp } = useAppSelector((state) => state.user);

  let MENU: IMenuItem[] = [];

  switch (isAuthEcp) {
    case true:
      MENU = [...SIDEBAR_ADMIN_MENU, ...SIDEBAR_ADMIN_MENU_ORGANIZATION];
      break;
    case false:
      MENU = SIDEBAR_ADMIN_MENU;
      break;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <CubeDevelopmentIcon />
      </div>
      <ul>
        {MENU.map((item, index) => (
          <Link to={item.item.path!} key={index}>
            <li
              className={`${location.pathname === item.item.path ? styles.active : ""}`}
            >
              {item.item.img && <item.item.img className="text-white " />}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
