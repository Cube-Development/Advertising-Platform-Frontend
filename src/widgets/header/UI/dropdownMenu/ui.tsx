import { roles } from '@shared/config/roles';
import { paths } from '@shared/routing';
import { useState, FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";

interface DropdownMenuProps {
  currentRole: string;
  toggleRole: () => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  currentRole,
  toggleRole,
}) => {
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
    <div className={styles.dropdown}  ref={menuRef}>
      <button onClick={handleButtonClick} className={styles.burger__icon_btn}>
        <div  className={styles.burger__icon}/>
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.switcher__row}>
            <h1>
              {currentRole === roles.blogger ? t("roles.blogger") : t("roles.advertiser")}
            </h1>

            <Link
              to={currentRole === roles.blogger ? paths.main : paths.mainBlogger}
            >
              <div
                className={styles.switcher}
                onClick={() => {
                  toggleRole();
                }}
              >
                SWITCH
              </div>
            </Link>
          </div>

          <ul>
            <li>Пункт меню 1</li>
            <li>Пункт меню 2</li>
            <li>Пункт меню 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
