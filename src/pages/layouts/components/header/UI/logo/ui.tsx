import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { roles } from "@entities/user";

interface LogoProps {
  currentRole: roles;
}

export const Logo: FC<LogoProps> = ({ currentRole }) => {
  const handleLogoClick = () => {
    if (
      window.location.pathname === paths.mainBlogger ||
      window.location.pathname === paths.main
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div onClick={handleLogoClick}>
      <Link to={currentRole === roles.blogger ? paths.mainBlogger : paths.main}>
        <p className={styles.logo}>Logo</p>
        {/* <img src="/images/assets/logo.svg" className={styles.logo} alt="/" /> */}
      </Link>
    </div>
  );
};
