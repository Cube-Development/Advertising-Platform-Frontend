import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { advertiserNavbar, bloggerNavbar, nonAuthNavbar } from "./config";
import styles from "./styles.module.scss";
import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { useTranslation } from "react-i18next";

interface NavProps {
  isAuth: boolean;
  toggleLogin: (tokens: any) => void;
  toggleLogout: () => void;
  currentRole: string;
  toggleRole: () => void;
}

export const Nav: FC<NavProps> = ({
  isAuth,
  toggleLogout,
  currentRole,
  toggleRole,
}) => {
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
  };

  const { t } = useTranslation();

  return (
    <nav className={styles.wrapper}>
      {isAuth ? (
        <>
          <h1
            className={`${
              currentRole === roles.blogger ? styles.active : styles.no__active
            }`}
          >
            Blogger
          </h1>

          <Link
            to={currentRole === roles.blogger ? paths.main : paths.mainBlogger}
          >
            <div
              className={`${styles.role__switcher} ${
                currentRole === roles.advertiser
                  ? styles.role__advertiser
                  : styles.role__blogger
              }`}
              onClick={() => {
                toggleRole();
              }}
            >
              SWITCH
            </div>
          </Link>

          <h1
            className={`${
              currentRole === roles.advertiser
                ? styles.active
                : styles.no__active
            }`}
          >
            Advertiser
          </h1>

          {currentRole === roles.advertiser
            ? advertiserNavbar.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={
                    location.pathname === item.href ? styles.active : ""
                  }
                >
                  {t(item.text)}
                </li>
              ))
            : bloggerNavbar.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={
                    location.pathname === item.href ? styles.active : ""
                  }
                >
                    {t(item.text)}
                </li>
              ))}

          <div onClick={toggleLogout}>LOGOUT</div>
        </>
      ) : (
        <>
          <img src="images/common/key.svg" alt="" />

          {nonAuthNavbar.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={location.pathname === item.href ? styles.active : ""}
            >
              {t(item.text)}
            </li>
          ))}
        </>
      )}
    </nav>
  );
};
