import { roles } from '@shared/config/roles';
import { paths } from '@shared/routing';
import { MenuItem } from '@shared/ui/menuItem';
import { useState, FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";

interface DropdownMenuProps {
  currentRole: string;
  toggleRole: (role: roles) => void;
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
        <div className={styles.burger__icon}/>
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.menu__top}>
            <img src="/images/assets/logo.svg" alt="" />

            <button onClick={handleButtonClick}>
              <div  className={styles.close__icon}/>
            </button>
          </div>

          <div className={styles.menu__switcher}>
            <div className={styles.switcher__row}>
              <Link to={paths.mainBlogger}>
                <p 
                  className={`${currentRole === roles.blogger ? styles.active : ''}`}
                  onClick={() => { toggleRole(roles.blogger)}}>
                  {t("roles.blogger")}
                </p>
              </Link>
              <Link to={paths.main}>
                <p 
                  className={`${currentRole === roles.advertiser ? styles.active : ''}`}
                  onClick={() => { toggleRole(roles.advertiser)}}>
                  { t("roles.advertiser")}
                </p>
              </Link>
            </div>
          </div>
          <div>
            {
                currentRole === roles.advertiser
                ?
                <>
                <MenuItem title={{ title: t("burger_menu.services")}} 
                                  subItems={[
                                    { title: t("burger_menu.catalog"), path: paths.main},
                                    { title: t("burger_menu.turnkey"), path: paths.main}
                                    ]} />
                <MenuItem title={{ title: t("burger_menu.campaign"), path: paths.main}} />
                <MenuItem title={{ title: t("burger_menu.saved"), path: paths.main}} />
                <MenuItem title={{ title: t("burger_menu.manager"), path: paths.main}} />
                <MenuItem title={{ title: t("burger_menu.template"), path: paths.main}} />
                </>
                :
                <>
                <MenuItem title={{ title: t("burger_menu.services")}} 
                                  subItems={[
                                    { title: t("burger_menu.addPlatform"), path: paths.main},
                                    { title: t("burger_menu.calculateIncome"), path: paths.main}
                                    ]} />
                <MenuItem title={{ title: t("burger_menu.channels"), path: paths.main}} />
                <MenuItem title={{ title: t("burger_menu.offers"), path: paths.main}} />
                </>
            }

            <MenuItem title={{ title: t("burger_menu.wallet")}} 
                      subItems={[
                        { title: t("burger_menu.add_funds"), path: paths.main},
                        { title: t("burger_menu.withdraw"), path: paths.main},
                        { title: t("burger_menu.history"), path: paths.main},
                        { title: t("burger_menu.invoice"), path: paths.main}
                      ]} />

            <MenuItem title={{ title: t("burger_menu.base"), path: paths.main}} />

          </div>

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
