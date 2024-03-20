import { IFormat, IFormatListProps } from "@shared/types/platform";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { platformFormats } from "@shared/config/formatTypes";

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
    const selectedValue: IFormat = JSON.parse(
      (event.target as HTMLLIElement).getAttribute("data-value")!,
    );

    console.log(selectedValue);
    changeFormat(selectedValue);
    closeMenu();
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

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <div>
        <button type="button" onClick={handleButtonClick}>
          {platformFormats[selectedFormat.format]}
        </button>

        {isMenuOpen && (
          <div className={styles.menu}>
            <ul>
              {formats.map((format) => (
                <li
                  key={format.format}
                  onClick={handleOptionChange}
                  data-value={JSON.stringify(format)}
                >
                  {platformFormats[format.format]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
