import { Language, Languages } from "@shared/config/languages";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useChangeLanguegeMutation } from "@entities/user";

interface LangProps {
  isAuth: boolean;
}

export const Lang: FC<LangProps> = ({ isAuth }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(Languages[0]);
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

  const [changeLanguege] = useChangeLanguegeMutation();

  const handleLanguageSelect = (lang: Language) => {
    i18n.changeLanguage(lang.name);
    setMenuOpen(false);
    setLanguage(lang);
    isAuth && changeLanguege({ language: lang.id });
  };

  return (
    <div
      className={`${styles.wrapper} ${isMenuOpen && styles.active}`}
      ref={menuRef}
    >
      <button className={styles.lang__button} onClick={handleButtonClick}>
        <img src={`/images/${language.icon}.svg`} alt="" />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <ul>
            {Languages.map((lang) => (
              <li
                className={styles.menu__item}
                key={lang?.id}
                onClick={() => handleLanguageSelect(lang)}
              >
                <img src={`/images/${lang?.icon}.svg`} alt="" />{" "}
                <span>{lang?.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
