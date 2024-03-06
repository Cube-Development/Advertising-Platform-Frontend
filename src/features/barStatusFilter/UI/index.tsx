import { pageFilter } from "@shared/config/pageFilter";
import {
  advManagerProjectStatus,
  advMyProjectStatus,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { bloggerPlatformStatus } from "@shared/config/platformFilter";
import { bloggerOfferStatus } from "@shared/config/offerFilter";
import styles from "./styles.module.scss";

interface BarStatusFilterProps {
  page: pageFilter;
}

export const BarStatusFilter: FC<BarStatusFilterProps> = ({ page }) => {
  const { t } = useTranslation();
  const { statusFilter, typeFilter } = useAppSelector(
    (state) => state.filterReducer,
  );
  const dispatch = useAppDispatch();
  const toggleStatus = (type: string) => {
    dispatch(filterSlice.actions.setStatusFilter(type));
  };

  const projectStatus =
    page === pageFilter.order && typeFilter === projectTypesFilter.myProject
      ? advMyProjectStatus
      : page === pageFilter.order &&
          typeFilter === projectTypesFilter.managerProject
        ? advManagerProjectStatus
        : page === pageFilter.offer
          ? bloggerOfferStatus
          : bloggerPlatformStatus;

  return (
    <div className={styles.subtypes}>
      <ul>
        {projectStatus.map((type, index) => (
          <li
            key={index}
            className={statusFilter === type.type ? styles.active : ""}
            onClick={() => toggleStatus(type.type)}
          >
            {t(type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
