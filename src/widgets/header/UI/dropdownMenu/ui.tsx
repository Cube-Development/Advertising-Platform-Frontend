import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { MenuItem } from "@shared/ui/menuItem";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { advertiserMenu, bloggerMenu, commonMenu } from "./config";
import styles from "./styles.module.scss";

interface DropdownMenuProps {
  currentRole: roles;
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

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const combinedMenu =
    currentRole === roles.advertiser
      ? [...advertiserMenu, ...commonMenu]
      : [...bloggerMenu, ...commonMenu];
  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button onClick={toggleMenu} className={styles.burger__icon_btn}>
        <div className={styles.burger__icon} />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.menu__top}>
            <img src="/images/assets/logo.svg" alt="" />

            <button onClick={toggleMenu}>
              <div className={styles.close__icon} />
            </button>
          </div>

          <div className={styles.menu__switcher}>
            <div className={styles.switcher__row}>
              <Link to={paths.main}>
                <p
                  className={`${
                    currentRole === roles.advertiser ? styles.active : ""
                  }`}
                  onClick={() => {
                    toggleRole(roles.advertiser);
                  }}
                >
                  {t("roles.advertiser")}
                </p>
              </Link>
              <Link to={paths.mainBlogger}>
                <p
                  className={`${
                    currentRole === roles.blogger ? styles.active : ""
                  }`}
                  onClick={() => {
                    toggleRole(roles.blogger);
                  }}
                >
                  {t("roles.blogger")}
                </p>
              </Link>
            </div>
          </div>
          <div>
            {combinedMenu.map((item, index) => (
              <MenuItem key={index} item={item.item} subItems={item.subItems} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
