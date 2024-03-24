import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  profileTypes,
  profileTypesName,
  profileTypesNum,
  walletTopUpTypes,
} from "@shared/config/profileFilter";
import { catalogFilter, catalogTypes } from "@shared/config/catalogFilter";
import { pageFilter } from "@shared/config/pageFilter";

interface BarProfileFilterProps {
  page: pageFilter;
  resetValues: () => void;
}

interface IFilterOption {
  type: profileTypesName | catalogFilter;
  id?: profileTypesNum;
}

export const BarProfileFilter: FC<BarProfileFilterProps> = ({
  page,
  resetValues,
}) => {
  const { t } = useTranslation();

  const { profileFilter, catalogFilter } = useAppSelector(
    (state) => state.filterReducer,
  );
  const [options, filter] =
    page === pageFilter.profile || page === pageFilter.walletWithdraw
      ? [profileTypes, profileFilter.type]
      : page === pageFilter.catalog
        ? [catalogTypes, catalogFilter]
        : page === pageFilter.walletTopUp
          ? [walletTopUpTypes, profileFilter.type]
          : [[], "", ""];

  const dispatch = useAppDispatch();

  const toggleBar = (option: IFilterOption) => {
    if (
      page === pageFilter.profile ||
      page === pageFilter.walletWithdraw ||
      page === pageFilter.walletTopUp
    ) {
      const newFilter = { type: option.type, id: option.id };
      dispatch(filterSlice.actions.setProfileFilter(newFilter));
    } else if (page === pageFilter.catalog) {
      dispatch(filterSlice.actions.setCatalogFilter(option.type));
    }
    resetValues();
  };

  return (
    <div className={styles.types}>
      <ul className={styles.profile}>
        {options.map((option, index) => (
          <li
            key={index}
            className={filter === option.type ? styles.active : ""}
            onClick={() => toggleBar(option)}
          >
            {t(option.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
