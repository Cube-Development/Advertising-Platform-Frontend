import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { MenuItem } from "@widgets/header/UI/dropdownMenu/UI/menuItem";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
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
  const [isMenuOpen, setMenuOpen] = useState<null | boolean>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      isMenuOpen !== null
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    if (isMenuOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    return () => {
      document.body.classList.remove("sidebar-open");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const combinedMenu =
    currentRole === roles.advertiser
      ? [...advertiserMenu, ...commonMenu]
      : [...bloggerMenu, ...commonMenu];

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button onClick={toggleMenu} className={styles.burger__icon_btn}>
        <div className={styles.burger__icon} />
      </button>
      {isMenuOpen !== null && (
        <div
          className={`${styles.menu} ${isMenuOpen ? styles.menu__enter : styles.menu__exit}`}
        >
          <div className={styles.menu__top}>
            <img src="/images/assets/logo.svg" alt="" />

            <button onClick={toggleMenu}>
              <div className={styles.close__icon} />
            </button>
          </div>
          <div className={styles.menu__switcher}>
            <div className={styles.menu__switcher__row}>
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
            <Accordion type="single" collapsible>
              {combinedMenu.map((item) => (
                <MenuItem key={item.item.title} item={item} onChange={toggleMenu}/>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};
