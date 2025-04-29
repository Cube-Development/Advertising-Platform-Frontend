import { ENUM_ROLES } from "@entities/user";
import { ENUM_PATHS } from "@shared/routing";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

interface LogoProps {
  currentRole: ENUM_ROLES;
}

export const Logo: FC<LogoProps> = ({ currentRole }) => {
  const handleLogoClick = () => {
    if (
      window.location.pathname === ENUM_PATHS.MAIN_BLOGGER ||
      window.location.pathname === ENUM_PATHS.MAIN
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div onClick={handleLogoClick}>
      <Link
        to={
          currentRole === ENUM_ROLES.BLOGGER
            ? ENUM_PATHS.MAIN_BLOGGER
            : ENUM_PATHS.MAIN
        }
      >
        <p className={styles.logo}>Blogix</p>
      </Link>
    </div>
  );
};
