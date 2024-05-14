import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { MenuItem } from "@widgets/header/UI/dropdownMenu/UI/menuItem";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { advertiserMenu, bloggerMenu, commonMenu, managerMenu } from "./config";
import styles from "./styles.module.scss";
import { IMenuItem } from "@shared/types/common";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";

interface DropdownMenuProps {
  currentRole: roles;
  toggleRole: (role: roles) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  currentRole,
  toggleRole,
}) => {
  const { t } = useTranslation();

  const { dropdownMenu } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  // const [isMenuOpen, setMenuOpen] = useState<null | boolean>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    // setMenuOpen(!isMenuOpen);
    const newMenu = { isOpen: !dropdownMenu.isOpen, title: "" };
    dispatch(filterSlice.actions.setDropDownMenu(newMenu));
    // dispatch(filterSlice.actions.setDropDownMenu(!isMenuOpen));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      dropdownMenu.isOpen !== null
    ) {
      const newMenu = { isOpen: false, title: "" };
      dispatch(filterSlice.actions.setDropDownMenu(newMenu));

      // setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    console.log("isMenuOpen", dropdownMenu);
    if (dropdownMenu.isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    return () => {
      document.body.classList.remove("sidebar-open");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownMenu.isOpen]);

  const combinedMenu: IMenuItem[] =
    currentRole === roles.advertiser
      ? [...advertiserMenu, ...commonMenu]
      : currentRole === roles.blogger
        ? [...bloggerMenu, ...commonMenu]
        : currentRole === roles.manager
          ? [...managerMenu]
          : [];

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button onClick={toggleMenu} className={styles.burger__icon_btn}>
        <div className={styles.burger__icon} />
      </button>
      {dropdownMenu.isOpen && (
        <div
          className={`${styles.menu} ${dropdownMenu.isOpen ? styles.menu__enter : styles.menu__exit}`}
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
            <Accordion
              type="single"
              collapsible
              defaultValue={`item-${dropdownMenu.title}`}
            >
              {combinedMenu.map((item) => (
                <MenuItem
                  key={item.item.title}
                  item={item}
                  onChange={toggleMenu}
                  openTitle={dropdownMenu.title}
                />
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};
