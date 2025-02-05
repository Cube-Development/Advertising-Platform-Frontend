import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useChangeLanguageMutation, useFindLanguage } from "@entities/user";
import { Language, Languages } from "@shared/config";
import { useNavigate } from "react-router-dom";

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

  const handleLanguageSelect = (lang: Language) => {
    i18n.changeLanguage(lang.name.toLocaleLowerCase());
    setMenuOpen(false);
    setLanguage(lang);
    isAuth && changeLanguage({ language: lang.id });
    navigate(0);
    // if (isAuth) {
    //   dispatch(authApi.util.resetApiState());
    // } else {
    //   dispatch(baseApi.util.resetApiState());
    // }
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
