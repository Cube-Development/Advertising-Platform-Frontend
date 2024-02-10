import { ProfileIcon } from "@shared/assets/icons/profile";
import { FC, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { authAPI } from "@shared/store/services/authService";
import Cookies from "js-cookie";

interface ProfileProps {
  toggleLogout: () => void;
}

export const Profile: FC<ProfileProps> = ({ toggleLogout }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logout] = authAPI.useLogoutMutation();

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
      console.log(error);
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
            <li>{t("profile.data")}</li>
            <li>{t("profile.settings")}</li>
            <li className={styles.logout} onClick={handleLogout}>
              {t("logout")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
