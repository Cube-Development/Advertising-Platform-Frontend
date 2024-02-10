import { CloseIcon } from "@shared/assets/icons/close";
import { PlusIcon } from "@shared/assets/icons/plus";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const Wallet: FC = () => {
  const { t } = useTranslation();
  const wallet = 1000000;
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${styles.wallet} ${isMenuOpen && styles.active__wallet}`}
      ref={menuRef}
    >
      <button className={styles.roww} onClick={toggleMenu}>
        <p>
          {wallet.toLocaleString()} {t("symbol")}
        </p>
        {isMenuOpen ? <CloseIcon /> : <PlusIcon />}
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <li>{t("wallet.add_funds")}</li>
            <li>{t("wallet.withdraw")}</li>
            <li>{t("wallet.history")}</li>
            <li>{t("wallet.invoice")}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
