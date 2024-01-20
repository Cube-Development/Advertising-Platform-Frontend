import { useState , useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./../../../../shared/context/AuthContext";
import { roles, advertiserNavbar, bloggerNavbar , nonAuthNavbar} from "./config";
import styles from "./styles.module.scss";

export const Nav = () => {
  const router = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    router(href);
  };

  const [currentRole, setCurrentRole] = useState(roles.advertiser);

  const {isAuth, toggleAuth} = useAuth();

  // const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("isAuth") ?? "false"));


  const toggleRole = () => {
    const newRole = currentRole === roles.blogger ? roles.advertiser : roles.blogger;
    setCurrentRole(newRole);
    localStorage.setItem('role', newRole);
    console.log(newRole);
  };

  // const toggleAuth = () => {
  //   setAuth(!isAuth);
  //   localStorage.setItem('isAuth', JSON.stringify(!isAuth));
  // };

  return (
    <nav className={styles.wrapper}>
      {isAuth
        ?

        <>
          <h1 className={`${currentRole === roles.blogger ? styles.active: styles.no__active}`}>
            Blogger
          </h1>

          <div 
            className={`${styles.role__switcher} ${currentRole === roles.advertiser ? styles.role__advertiser : styles.role__blogger}`}
            onClick={() => { toggleRole(); }}
              >
              SWITCH
          </div>

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
            onClick={toggleAuth}
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
          <div onClick={toggleAuth}>LOGIN</div>
        </>

      }

    </nav>
  );
};
