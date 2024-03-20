import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { profileTypes, walletTopUpTypes } from "@shared/config/profileFilter";
import { catalogTypes } from "@shared/config/catalogFilter";
import { pageFilter } from "@shared/config/pageFilter";

interface BarProfileFilterProps {
  page: pageFilter;
}

export const BarProfileFilter: FC<BarProfileFilterProps> = ({ page }) => {
  const { t } = useTranslation();

  const { profileFilter, catalogFilter } = useAppSelector(
    (state) => state.filterReducer,
  );
  const [types, filter] =
    page === pageFilter.profile || page === pageFilter.walletWithdraw
      ? [profileTypes, profileFilter]
      : page === pageFilter.catalog
        ? [catalogTypes, catalogFilter]
        : page === pageFilter.walletTopUp
          ? [walletTopUpTypes, profileFilter]
          : [[], "", ""];

  const dispatch = useAppDispatch();

  const toggleBar = (type: string) => {
    if (
      page === pageFilter.profile ||
      page === pageFilter.walletWithdraw ||
      page === pageFilter.walletTopUp
    ) {
      dispatch(filterSlice.actions.setProfileFilter(type));
    } else if (page === pageFilter.catalog) {
      dispatch(filterSlice.actions.setCatalogFilter(type));
    }
  };

  return (
    <div className={styles.types}>
      <ul className={styles.profile}>
        {types.map((type, index) => (
          <li
            key={index}
            className={filter === type.type ? styles.active : ""}
            onClick={() => toggleBar(type.type)}
          >
            {t(type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
