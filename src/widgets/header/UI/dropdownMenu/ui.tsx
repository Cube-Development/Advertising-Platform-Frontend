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
  const [isMenuOpen, setMenuOpen] = useState<null | boolean>(null);
  const [chapter, setCharper] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const changeCharper = (title: string, haveSubitems?: boolean) => {
    let newCharper;
    if (title === chapter) {
      newCharper = "";
    } else {
      newCharper = title;
    }
    setCharper(newCharper);

    if (!haveSubitems) {
      console.log(haveSubitems);
      setMenuOpen(false);
      setCharper("");
    }
  };

  console.log(isMenuOpen);

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
          className={`${styles.menu} ${isMenuOpen ? styles.menu_enter : styles.menu_exit}`}
        >
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
              <MenuItem
                key={item.item.title}
                item={item}
                changeCharper={changeCharper}
                chapter={chapter}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
