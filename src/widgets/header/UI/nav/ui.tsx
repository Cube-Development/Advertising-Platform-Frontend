import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { roles } from "./../../../../shared/config/roles";
import { paths } from "./../../../../shared/routing";
import { advertiserNavbar, bloggerNavbar, nonAuthNavbar } from "./config";
import styles from "./styles.module.scss";

interface NavProps {
  isAuth: boolean;
  toggleLogin: () => void;
  toggleLogout: () => void;
  currentRole: string;
  toggleRole: () => void;
}

export const Nav: FC<NavProps> = ({ isAuth, toggleLogin, toggleLogout, currentRole, toggleRole}) => {
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
  };

  return (
    <nav className={styles.wrapper}>
      {isAuth
        ?

        <>
          <h1 className={`${currentRole === roles.blogger ? styles.active: styles.no__active}`}>
            Blogger
          </h1>

          <Link to={currentRole === roles.blogger  ? paths.main : paths.mainBlogger}>
            <div 
              className={`${styles.role__switcher} ${currentRole === roles.advertiser ? styles.role__advertiser : styles.role__blogger}`}
              onClick={() => { toggleRole(); }}
                >
                SWITCH
            </div>
          </Link>

          <h1 className={`${currentRole === roles.advertiser ? styles.active: styles.no__active}`} >
            Advertiser
          </h1>

          {
            currentRole === roles.advertiser

            ? 
            advertiserNavbar.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={location.pathname === item.href ? styles.active : ""}
                >
                  {item.text}
                </div>
              ))

            : 
            bloggerNavbar.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className={location.pathname === item.href ? styles.active : ""}
                >
                  {item.text}
                </div>
              ))}

          {/* to delete bellow */}
          <div 
            onClick={toggleLogout}
              >
              LOGOUT
          </div>
        </>

        :
        <>
          {nonAuthNavbar.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={location.pathname === item.href ? styles.active : ""}
            >
              {item.text}
            </div>
          ))}
          {/* to delete bellow */}
          {/* <div onClick={toggleLogin}>LOGIN</div> */}
        </>

      }

    </nav>
  );
};
