import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export const Lang: FC = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("RU");
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

  const handleLanguageSelect = (language: string) => {
    setMenuOpen(false);
    setLanguage(language);
  };

  return (
      <div className={`${styles.wrapper} ${isMenuOpen && styles.active}`} ref={menuRef}>
        <button onClick={handleButtonClick}>{language}</button>

        {isMenuOpen && (
          <div  className={styles.menu}>
            <ul>
              <li onClick={() => handleLanguageSelect('RU')}>
                RU <img src="images/languages/ru.svg" alt="Russian Flag" />
              </li>
              <li onClick={() => handleLanguageSelect('EN')}>
                EN <img src="images/languages/en.svg" alt="English Flag" />
              </li>
              <li onClick={() => handleLanguageSelect('UZ')}>
                UZ <img src="images/languages/uz.svg" alt="Uzbek Flag" />
              </li>
            </ul>
          </div>
      )}

      </div>
    )
      
};
