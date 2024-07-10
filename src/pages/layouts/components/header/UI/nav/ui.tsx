import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  advertiserNavbar,
  bloggerNavbar,
  notAuthAdvertiserNavbar,
  notAuthBloggerNavbar,
} from "./config";
import styles from "./styles.module.scss";
import { paths } from "@shared/routing";
import { roles } from "@entities/user";

interface NavProps {
  isAuth: boolean;
  currentRole: roles;
  toggleRole: (role: roles) => void;
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
          block: "center",
        });
      }
    }

    if (href === paths.main) {
      toggleRole(roles.advertiser);
    } else if (href === paths.mainBlogger) {
      toggleRole(roles.blogger);
    }
  };

  const { t } = useTranslation();

  const currentNavbar =
    isAuth && currentRole === roles.advertiser
      ? advertiserNavbar
      : isAuth && currentRole === roles.blogger
        ? bloggerNavbar
        : !isAuth && currentRole === roles.advertiser
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
          {item.img && <item.img />}
          {t(item.text)}
        </li>
      ))}
    </nav>
  );
};
