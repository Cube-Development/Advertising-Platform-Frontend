import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { filterSlice } from "@shared/store/reducers";
import { networkTypes, platfromToIcon } from "@shared/config/networkFilter";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { IFilerData } from "@shared/types/common";
import { ArrowIcon } from "@shared/assets";

export const NetworkFilter: FC = () => {
  const [SelectedNetwork, setSelectedNetwork] = useState<IFilerData | null>(
    null,
  );
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleNetworkChange = (
    event: React.MouseEvent<HTMLLIElement | EventTarget>,
  ) => {
    const selectedValue = JSON.parse(
      (event.target as HTMLLIElement).getAttribute("data-value")!,
    );
    // console.log(5555, (event.target as HTMLLIElement).getAttribute("data-value"));
    dispatch(filterSlice.actions.setNetworkFilter(selectedValue));
    setSelectedNetwork(selectedValue);
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
        <p>{t("filter.title")}:</p>
      </div>

      <div>
        <button type="button" onClick={handleButtonClick}>
          <div className={styles.filter}>
            <div>
              {SelectedNetwork ? (
                <>
                  {React.createElement(
                    platfromToIcon[SelectedNetwork.platform!],
                  )}
                  <p>{t(SelectedNetwork.name)}</p>
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
              {networkTypes.map(
                (network, index) => (
                  console.log(index, network),
                  (
                    <li
                      key={index}
                      onClick={handleNetworkChange}
                      data-value={JSON.stringify(network)}
                    >
                      {/* <div> */}
                      <network.img />
                      {t(network.name)}
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
