import { IFormat, IFormatListProps } from "@shared/types/platform";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { platformFormats } from "@shared/config/formatTypes";
import { ArrowIcon } from "@shared/assets";

export const FormatList: FC<IFormatListProps> = ({
  selectedFormat,
  changeFormat,
  formats,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleOptionChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    event.stopPropagation();
    const selectedValue: IFormat = JSON.parse(
      (event.target as HTMLLIElement).getAttribute("data-value")!,
    );

    changeFormat(selectedValue);
    closeMenu();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button type="button" onClick={(e) => handleButtonClick(e)}>
        <div className={isMenuOpen ? "rotate" : "rotate__down"}>
          <ArrowIcon
            className={isMenuOpen ? "active__icon" : "default__icon"}
          />
        </div>
        <p>{platformFormats[selectedFormat.format]}</p>
      </button>

      {isMenuOpen && (
        <div className={`${styles.menu} show`}>
          <ul>
            {formats.map((format) => (
              <li
                key={format.format}
                onClick={handleOptionChange}
                data-value={JSON.stringify(format)}
                className={
                  selectedFormat.format === format.format ? styles.active : ""
                }
              >
                {platformFormats[format.format]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
