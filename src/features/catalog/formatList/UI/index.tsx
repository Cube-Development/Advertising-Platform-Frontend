import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { ArrowSmallVerticalIcon } from "@shared/assets";
import { IFormat, IFormatListProps } from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

export const FormatList: FC<IFormatListProps> = ({
  changeFormat,
  card,
  selectedFormat,
  isSmall,
  isBig,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const screen = useWindowWidth();

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

  const handleButtonClick = (event: React.MouseEvent) => {
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
      <div className={styles.selects} onClick={(e) => handleButtonClick(e)}>
        <div className={isMenuOpen ? "rotate" : "rotate__down"}>
          <ArrowSmallVerticalIcon
            className={isMenuOpen ? "active__icon" : ""}
          />
        </div>
        <p>
          {(screen > BREAKPOINT.SM && !isSmall) || isBig
            ? selectedFormat?.format_name?.big
            : selectedFormat?.format_name?.small}
        </p>
      </div>

      {isMenuOpen && (
        <div className={`${styles.menu} show`}>
          <ul>
            {card.format.map((format) => (
              <li
                key={format?.format}
                onClick={handleOptionChange}
                data-value={JSON.stringify(format)}
                className={
                  selectedFormat?.format === format?.format ? styles.active : ""
                }
              >
                {screen > BREAKPOINT.SM && !isSmall
                  ? format?.format_name?.big
                  : format?.format_name?.small}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
