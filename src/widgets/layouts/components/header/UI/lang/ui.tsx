import { useChangeLanguageMutation, useFindLanguage } from "@entities/user";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface LangProps {
  isAuth: boolean;
}

export const Lang: FC<LangProps> = ({ isAuth }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = useFindLanguage();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(currentLang);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLanguage(currentLang);
  }, [currentLang]);

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

  const [changeLanguage] = useChangeLanguageMutation();

  const handleLanguageSelect = (lang: ILanguage) => {
    i18n.changeLanguage(lang.name.toLocaleLowerCase());
    setMenuOpen(false);
    setLanguage(lang);
    isAuth && changeLanguage({ language: lang.id });
    navigate(0);
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
            {USER_LANGUAGES_LIST.map((lang) => (
              <li
                className={styles.menu__item}
                key={lang?.id}
                onClick={() => handleLanguageSelect(lang)}
              >
                <img src={`/images/${lang.icon}.svg`} alt="" />{" "}
                <span>{lang?.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
