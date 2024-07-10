import { ProfileIcon } from "@shared/assets";
import { FC, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";
import { useLogoutMutation } from "@entities/user";

interface ProfileProps {
  toggleLogout: () => void;
}

export const Profile: FC<ProfileProps> = ({ toggleLogout }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logout] = useLogoutMutation();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };
  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      refreshToken && logout(refreshToken);
      toggleLogout();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.profile} ref={menuRef}>
      <button onClick={handleButtonClick}>
        <ProfileIcon />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <Link to={paths.profile}>
              <li onClick={handleButtonClick}>{t("profile.data")}</li>
            </Link>
            <Link to={paths.profile}>
              <li onClick={handleButtonClick}>{t("profile.settings")}</li>
            </Link>
            <li className={styles.logout} onClick={handleLogout}>
              {t("logout")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
