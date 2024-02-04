import { CalculatorIcon } from "@shared/assets/icons/calculator";
import { KeyIcon } from "@shared/assets/icons/key";
import { roles } from "@shared/config/roles";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { advertiserNavbar, bloggerNavbar, nonAuthNavbar } from "./config";
import styles from "./styles.module.scss";

interface NavProps {
  isAuth: boolean;
  toggleLogout: () => void;
  currentRole: string;
}

export const Nav: FC<NavProps> = ({
  isAuth,
  toggleLogout,
  currentRole,
}) => {
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
  };

  const { t } = useTranslation();

  return (
    <nav className={styles.wrapper}>
        <>
          {isAuth && currentRole === roles.advertiser
            ? advertiserNavbar.map((item, index) => (
                
                <li
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={
                    location.pathname === item.href ? styles.active : ""
                  }
                >
                  {item.img && <KeyIcon />}
                  {t(item.text)}
                </li>
              ))
            : isAuth && currentRole === roles.blogger 
            ?
             bloggerNavbar.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={
                    location.pathname === item.href ? styles.active : ""
                  }
                >
                    {item.img && <CalculatorIcon />}
                    {t(item.text)}
                </li>
              ))
          : 
          nonAuthNavbar.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={location.pathname === item.href ? styles.active : ""}
            >
              {item.img && <KeyIcon />}
              {t(item.text)}
            </li>
          ))}

        </>
    </nav>
  );
};
