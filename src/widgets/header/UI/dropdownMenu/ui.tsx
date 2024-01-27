import { roles } from '@shared/config/roles';
import { paths } from '@shared/routing';
import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
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

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleMenu}>|||</button>

      {isMenuOpen && (
        <div className={styles.menu} onBlur={closeMenu} tabIndex={0}>
          <div className={styles.switcher__row}>
            <h1>
              {currentRole === roles.blogger ? t("roles.blogger") : t("roles.advertiser")}
            </h1>

            <div className={styles.switcher}
              onClick={() => {
                toggleRole();
              }}
            >
              SWITCH
          </div>


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
