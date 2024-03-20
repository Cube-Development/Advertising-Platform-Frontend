import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { filterSlice } from "@shared/store/reducers";
import { sortingTypes, sortToIcon } from "@shared/config/sortingFilter";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { IFilerData } from "@shared/types/common";
import { ArrowIcon } from "@shared/assets";

export const SortingFilter: FC = () => {
  const [SelectedSorting, setSelectedSorting] = useState<IFilerData | null>(
    null,
  );
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleSortingChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    const selectedValue = JSON.parse(
      (event.target as HTMLLIElement).getAttribute("data-value")!,
    );
    console.log(
      5555,
      (event.target as HTMLLIElement).getAttribute("data-value"),
    );
    dispatch(filterSlice.actions.setSortingFilter(selectedValue));
    setSelectedSorting(selectedValue);
    closeMenu();
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
        <p>{t("sorting.title")}:</p>
      </div>

      <div>
        <button type="button" onClick={handleButtonClick}>
          <div className={styles.filter}>
            <div>
              {SelectedSorting ? (
                <>
                  {React.createElement(sortToIcon[SelectedSorting.sort!])}
                  <p>{t(SelectedSorting.name)}</p>
                </>
              ) : (
                <p>........</p>
              )}
            </div>
            <ArrowIcon />
          </div>
        </button>

        {isMenuOpen && (
          <div className={styles.menu}>
            <ul>
              {sortingTypes.map(
                (sorting, index) => (
                  console.log(index, sorting),
                  (
                    <li
                      key={index}
                      onClick={handleSortingChange}
                      data-value={JSON.stringify(sorting)}
                    >
                      {/* <div> */}
                      <sorting.img />
                      {t(sorting.name)}
                      {/* </div> */}
                    </li>
                  )
                ),
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
