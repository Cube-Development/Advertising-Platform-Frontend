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
  isSmallCatalogCard,
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

  if (isSmallCatalogCard) {
    return (
      <div
        className={`${styles.wrapper} ${styles.small_catalog}`}
        ref={menuRef}
      >
        <div
          className={`${styles.selects} !rounded-[5px] !gap-1 mobile:!px-[10px] mobile:!py-[5px] !p-[5px]`}
          onClick={(e) => handleButtonClick(e)}
        >
          <p className="moobile-xl:!text-xs mobile:!text-[10px] !text-[9px] mobile-xl:max-w-[100px] mobile:max-w-[80px] max-w-[50px] truncate mobile-xl:!font-medium !font-semibold">
            {selectedFormat?.format_name?.small}
          </p>
          <div className={isMenuOpen ? "rotate" : "rotate__down"}>
            <ArrowSmallVerticalIcon
              className={isMenuOpen ? "active__icon" : ""}
            />
          </div>
        </div>

        {isMenuOpen && (
          <div className={`${styles.menu} show !mt-0 w-fit`}>
            <ul>
              {card.format.map((format) => (
                <li
                  key={format?.format}
                  onClick={handleOptionChange}
                  data-value={JSON.stringify(format)}
                  className={`${
                    selectedFormat?.format === format?.format
                      ? styles.active
                      : ""
                  } moobile-xl:!text-xs mobile:!text-[10px] !text-[9px] !p-1.5 !rounded-[5px]`}
                >
                  {format?.format_name?.small}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

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
