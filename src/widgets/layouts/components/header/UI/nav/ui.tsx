import { ENUM_ROLES } from "@entities/user";
import { useAppSelector } from "@shared/hooks";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NAVBAR_ADVERTISER_MENU,
  NAVBAR_ADVERTISER_NOT_AUTH_MENU,
  NAVBAR_AGENCY_MENU,
  NAVBAR_BLOGGER_MENU,
  NAVBAR_BLOGGER_NOT_AUTH_MENU,
  NAVBAR_MANAGER_MENU,
  useChangeRole,
} from "../../model";
import styles from "./styles.module.scss";
import { cn } from "@shared/ui";

interface NavProps {}

export const Nav: FC<NavProps> = () => {
  const { isAuth, role } = useAppSelector((state) => state.user);
  const router = useNavigate();
  const location = useLocation();

  const { changeRole } = useChangeRole({
    isAuth,
    role,
  });

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
    changeRole(href);
  };

  const { t } = useTranslation();

  const NAVBAR_MENU =
    isAuth && role === ENUM_ROLES.ADVERTISER
      ? NAVBAR_ADVERTISER_MENU
      : isAuth && role === ENUM_ROLES.BLOGGER
        ? NAVBAR_BLOGGER_MENU
        : isAuth && role === ENUM_ROLES.MANAGER
          ? NAVBAR_MANAGER_MENU
          : isAuth && role === ENUM_ROLES.AGENCY
            ? NAVBAR_AGENCY_MENU
            : !isAuth && role === ENUM_ROLES.ADVERTISER
              ? NAVBAR_ADVERTISER_NOT_AUTH_MENU
              : NAVBAR_BLOGGER_NOT_AUTH_MENU;

  return (
    <nav className={styles.wrapper}>
      {NAVBAR_MENU.map((item, index) => (
        <li
          key={index}
          onClick={() => handleNavigation(item.href)}
          className={cn(
            location.pathname + location.search === item.href
              ? styles.active
              : "",
            "hover:bg-accent rounded-lg",
          )}
        >
          {item?.img && (
            <div className="flex items-center justify-center">
              <item.img key={index} className="active__gradient__icon" />
            </div>
          )}
          {t(item.text)}
        </li>
      ))}
    </nav>
  );
};
