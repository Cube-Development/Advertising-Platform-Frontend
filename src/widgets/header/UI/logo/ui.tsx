import { FC } from "react";
import logo from "./logo.svg";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";

interface LogoProps {
  currentRole: string;
}

export const Logo: FC<LogoProps> = ({ currentRole }) => {
  return (
    <div>
      <Link to={currentRole === roles.blogger ? paths.mainBlogger : paths.main}>
        <img src={logo} className={styles.logo} alt="/" />
      </Link>
    </div>
  );
};
