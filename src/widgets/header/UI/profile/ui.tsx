import { FC, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ProfileProps {
  toggleLogout: () => void;
}

export const Profile: FC<ProfileProps> = ({ toggleLogout }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  const handleButtonClick = () => {
    toggleMenu();
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
        <img src="./images/common/profile.svg" alt="" />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <li>{t("profile.messages")}</li>
            <li>{t("profile.data")}</li>
            <li>{t("profile.settings")}</li>
            <li onClick={toggleLogout}>{t("logout")}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
