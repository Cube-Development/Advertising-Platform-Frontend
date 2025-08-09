import { CloseIcon, PlusIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const Wallet: FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { balance } = useAppSelector((state) => state.wallet);

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
      className={`${styles.wallet} ${isMenuOpen ? `${styles.active__wallet} border__gradient` : ""}`}
      ref={menuRef}
    >
      <button className={styles.roww} onClick={(e) => toggleMenu(e)}>
        <p>
          {Math.floor(balance).toLocaleString()} <span>{t("symbol")}</span>
        </p>
        {isMenuOpen ? <CloseIcon /> : <PlusIcon />}
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            <Link to={ENUM_PATHS.WALLET_TOP_UP} onClick={closeMenu}>
              <li>{t("wallet_menu.top_up")}</li>
            </Link>
            <Link to={ENUM_PATHS.WALLET_WITHDRAW} onClick={closeMenu}>
              <li>{t("wallet_menu.withdraw")}</li>
            </Link>
            <Link to={ENUM_PATHS.WALLET_HISTORY} onClick={closeMenu}>
              <li>{t("wallet_menu.history")}</li>
            </Link>
            <Link to={ENUM_PATHS.DOCUMENTS} onClick={closeMenu}>
              <li>{t("wallet_menu.invoice")}</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
