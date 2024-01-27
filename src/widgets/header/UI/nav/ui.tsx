import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { advertiserNavbar, bloggerNavbar, nonAuthNavbar } from "./config";
import styles from "./styles.module.scss";
import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";

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
                  {item.img && <img src={`images/common/${item.img}`} alt="" />}
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
                    {item.img && <img src={`images/common/${item.img}`} alt="" />}
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
              {item.img && <img src={`images/common/${item.img}`} alt="" />}
              {t(item.text)}
            </li>
          ))}

        </>
    </nav>
  );
};

{/* <img src="images/common/key.svg" alt="" /> */}