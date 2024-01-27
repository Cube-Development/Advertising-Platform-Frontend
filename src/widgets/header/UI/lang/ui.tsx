import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export const Lang: FC = () => {

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

  const handleButtonClick = () => {
    toggleMenu();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
      <div className={styles.lang} ref={menuRef}>
        <button onClick={handleButtonClick}>RU</button>

        {isMenuOpen && (
          <div  className={styles.menu}>
            <ul>
              <li>RU</li>
              <li>UZB</li>
              <li>EN</li>
            </ul>
          </div>
      )}

      </div>
    )
      
      
};
