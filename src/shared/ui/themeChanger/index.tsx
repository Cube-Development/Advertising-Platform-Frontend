import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ArrowSmallVerticalIcon } from "@shared/assets";

interface ThemeChangerProps {
  page: string;
  onThemeChange: (coefficient: number) => void;
}

const allThemes = [
  { id: 1, name: "theme1", coefficient: 1 },
  { id: 2, name: "theme2", coefficient: 2 },
  { id: 3, name: "theme3", coefficient: 3 },
  { id: 4, name: "theme3", coefficient: 3 },
  { id: 5, name: "theme3", coefficient: 3 },
  { id: 6, name: "theme3", coefficient: 3 },
  { id: 7, name: "theme3", coefficient: 3 },
  { id: 8, name: "theme3", coefficient: 3 },
];

export const ThemeChanger: FC<ThemeChangerProps> = ({
  page,
  onThemeChange,
}) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<any | null>(
    allThemes[0],
  );
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
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

  const handleOptionChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    const selectedId = Number(
      (event.target as HTMLLIElement).getAttribute("data-value"),
    );
    const theme = allThemes!.find((theme) => theme?.id === selectedId)!;
    setSelectedOption(theme);
    onThemeChange(theme.coefficient);
    closeMenu();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <p>{t(`${page}.card.theme`)}</p>

      <div className={styles.menu} ref={menuRef}>
        <button
          type="button"
          onClick={handleButtonClick}
          className={isMenuOpen ? styles.active : ""}
        >
          <div>
            <span className="truncate">{selectedOption.name}</span>
            <div className={isMenuOpen ? "rotate" : "rotate__down"}>
              <ArrowSmallVerticalIcon
                className={isMenuOpen ? "active__icon" : "default__icon__grey"}
              />
            </div>
          </div>
        </button>

        {isMenuOpen && (
          <div className={`${styles.options} show`}>
            <ul>
              {allThemes.map((theme, index) => (
                <li
                  key={index}
                  value={theme.name}
                  onClick={handleOptionChange}
                  data-value={theme?.id}
                >
                  <span>{theme.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
