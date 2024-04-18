import { IFormat, IFormatListProps } from "@shared/types/platform";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { ArrowSmallVerticalIcon } from "@shared/assets";

export const FormatList: FC<IFormatListProps> = ({
  changeFormat,
  card,
  selectedFormat,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          <ArrowSmallVerticalIcon
            className={isMenuOpen ? "active__icon" : "default__icon__black"}
          />
        </div>
        <p>{selectedFormat?.format_name.big}</p>
      </button>

      {isMenuOpen && (
        <div className={`${styles.menu} show`}>
          <ul>
            {card.format.map((format) => (
              <li
                key={format.format}
                onClick={handleOptionChange}
                data-value={JSON.stringify(format)}
                className={
                  selectedFormat?.format === format.format ? styles.active : ""
                }
              >
                {format.format_name.big}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
