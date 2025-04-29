import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  advertiserNavbar,
  bloggerNavbar,
  managerNavbar,
  notAuthAdvertiserNavbar,
  notAuthBloggerNavbar,
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

  const currentNavbar =
    isAuth && currentRole === ENUM_ROLES.ADVERTISER
      ? advertiserNavbar
      : isAuth && currentRole === ENUM_ROLES.BLOGGER
        ? bloggerNavbar
        : isAuth && currentRole === ENUM_ROLES.MANAGER
          ? managerNavbar
          : !isAuth && currentRole === ENUM_ROLES.ADVERTISER
            ? notAuthAdvertiserNavbar
            : notAuthBloggerNavbar;

  return (
    <nav className={styles.wrapper}>
      {currentNavbar.map((item, index) => (
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
