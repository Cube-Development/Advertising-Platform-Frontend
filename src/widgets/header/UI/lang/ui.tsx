import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Languages, languages } from "@shared/config/languages";
import { useTranslation } from "react-i18next";

export const Lang: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("RU");
  const menuRef = useRef<HTMLDivElement>(null);

  const { i18n } = useTranslation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (lang: languages) => {
    setMenuOpen(false);
    setLanguage(lang);
    i18n.changeLanguage(lang);
    console.log(i18n.language);
  };

  return (
    <div
      className={`${styles.wrapper} ${isMenuOpen && styles.active}`}
      ref={menuRef}
    >
      <button className={styles.lang__button} onClick={handleButtonClick}>
        {language}
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            {Languages.map((lang) => (
              <li
                className={styles.menu__item}
                key={lang.id}
                onClick={() => handleLanguageSelect(lang.name)}
              >
                <span>{lang.name}</span> <lang.icon />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
