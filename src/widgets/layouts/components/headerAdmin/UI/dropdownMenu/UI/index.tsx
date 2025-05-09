import { ArrowLongHorizontalIcon, CubeDevelopmentIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { DROPDOWN_ADMIN_MENU } from "./config";
import styles from "./styles.module.scss";

export const DropdownMenu: FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button onClick={handleOnClick} className={styles.exit}>
        <ArrowLongHorizontalIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={PAGE_ANIMATION.dropdownTransition.transition}
            variants={PAGE_ANIMATION.dropdownTransition}
            className={styles.menu}
          >
            <div className={styles.logo}>
              <CubeDevelopmentIcon />
              <p>Cube</p>
            </div>
            <ul>
              {DROPDOWN_ADMIN_MENU.map((item, index) => (
                <Link to={item.item.path!} onClick={handleOnClick} key={index}>
                  <li
                    className={`${location.pathname === item.item.path ? styles.active : ""}`}
                  >
                    {item.item.img && <item.item.img />}
                    <p>{t(item.item.title || "")}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
