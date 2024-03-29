import { CloseIcon, PlusIcon } from "@shared/assets";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const Wallet: FC = () => {
  const { t } = useTranslation();
  const wallet = 1000000000;
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
      <button className={styles.roww} onClick={(e) => toggleMenu(e)}>
        <p>
          {`${wallet.toLocaleString()} `}
          <span>{t("symbol")}</span>
        </p>
        {isMenuOpen ? <CloseIcon /> : <PlusIcon />}
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <li>{t("wallet_menu.top_up")}</li>
            <li>{t("wallet_menu.withdraw")}</li>
            <li>{t("wallet_menu.history")}</li>
            <li>{t("wallet_menu.invoice")}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
