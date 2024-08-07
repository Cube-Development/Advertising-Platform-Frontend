import { paths } from "@shared/routing";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  advertiserMenu,
  advertiserMenuNotAuth,
  bloggerMenu,
  bloggerMenuNotAuth,
  commonMenu,
  managerMenu,
} from "./config";
import styles from "./styles.module.scss";
import { MenuItem } from "./menuItem";
import { roles } from "@entities/user";
import { IMenuItem } from "@pages/layouts/components/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Accordion } from "@shared/ui";
import { setDropDownMenu } from "@pages/layouts/model";

interface DropdownMenuProps {
  isAuth: boolean;
  currentRole: roles;
  toggleRole: (role: roles) => void;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  isAuth,
  currentRole,
  toggleRole,
}) => {
  const { t } = useTranslation();

  const { dropdownMenu } = useAppSelector((state) => state.dropdownMenu);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = (path?: string) => {
    const newMenu = { isOpen: !dropdownMenu.isOpen, title: "" };
    dispatch(setDropDownMenu(newMenu));
    if (path === paths.main) {
      toggleRole(roles.advertiser);
    } else if (path === paths.mainBlogger) {
      toggleRole(roles.blogger);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      const newMenu = { isOpen: false, title: "" };
      dispatch(setDropDownMenu(newMenu));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
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

  const combinedMenu: IMenuItem[] = isAuth
    ? currentRole === roles.advertiser
      ? [...advertiserMenu, ...commonMenu]
      : currentRole === roles.blogger
        ? [...bloggerMenu, ...commonMenu]
        : currentRole === roles.manager
          ? [...managerMenu]
          : []
    : currentRole === roles.advertiser
      ? advertiserMenuNotAuth
      : bloggerMenuNotAuth;

  const divVariants = {
    close: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%" },
    transition: { transition: { duration: 0.25 } },
  };

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button onClick={() => toggleMenu()} className={styles.burger__icon_btn}>
        <div className={styles.burger__icon} />
      </button>

      <AnimatePresence>
        {dropdownMenu.isOpen && (
          <motion.div
            initial="close"
            animate="open"
            exit="close"
            transition={divVariants.transition}
            className={styles.menu}
            variants={divVariants}
          >
            <div className={styles.menu__content}>
              <div className={styles.menu__top}>
                <p className={styles.logo}>Logo</p>
                <button onClick={() => toggleMenu()}>
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

                <Accordion
                  type="single"
                  collapsible
                  defaultValue={`item-${dropdownMenu.title}`}
                  className={styles.menu__accordion}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
