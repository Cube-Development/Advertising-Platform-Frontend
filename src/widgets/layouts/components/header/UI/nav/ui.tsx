import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NAVBAR_ADVERTISER_MENU,
  NAVBAR_ADVERTISER_NOT_AUTH_MENU,
  NAVBAR_BLOGGER_MENU,
  NAVBAR_BLOGGER_NOT_AUTH_MENU,
  NAVBAR_MANAGER_MENU,
} from "./config";
import styles from "./styles.module.scss";

interface NavProps {
  isAuth: boolean;
  currentRole: ENUM_ROLES;
  toggleRole: (role: ENUM_ROLES) => void;
}

export const Nav: FC<NavProps> = ({ isAuth, currentRole, toggleRole }) => {
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
    if (href.includes("#calculateIncome")) {
      const calculateIncomeElement = document.getElementById("calculateIncome");
      if (calculateIncomeElement) {
        calculateIncomeElement.scrollIntoView({
          behavior: "smooth",
          // block: "end",
        });
      }
    }

    if (href === ENUM_PATHS.MAIN) {
      toggleRole(ENUM_ROLES.ADVERTISER);
    } else if (href === ENUM_PATHS.MAIN_BLOGGER) {
      toggleRole(ENUM_ROLES.BLOGGER);
    }
  };

  const { t } = useTranslation();

  const NAVBAR_MENU =
    isAuth && currentRole === ENUM_ROLES.ADVERTISER
      ? NAVBAR_ADVERTISER_MENU
      : isAuth && currentRole === ENUM_ROLES.BLOGGER
        ? NAVBAR_BLOGGER_MENU
        : isAuth && currentRole === ENUM_ROLES.MANAGER
          ? NAVBAR_MANAGER_MENU
          : !isAuth && currentRole === ENUM_ROLES.ADVERTISER
            ? NAVBAR_ADVERTISER_NOT_AUTH_MENU
            : NAVBAR_BLOGGER_NOT_AUTH_MENU;

  return (
    <nav className={styles.wrapper}>
      {NAVBAR_MENU.map((item, index) => (
        <li
          key={index}
          onClick={() => handleNavigation(item.href)}
          className={location.pathname === item.href ? styles.active : ""}
        >
          {item?.img && (
            <item.img key={index} className="active__gradient__icon" />
          )}
          {t(item.text)}
        </li>
      ))}
    </nav>
  );
};
