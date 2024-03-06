import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { advertiserProjectTypes } from "@shared/config/projectFilter";
import styles from "./styles.module.scss";

export const BarTypesFilter: FC = () => {
  const { t } = useTranslation();
  const { typeFilter } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();
  const toggleType = (type: string, status: string) => {
    dispatch(filterSlice.actions.setTypeFilter(type));
    dispatch(filterSlice.actions.setStatusFilter(status));
  };

  const projectTypes = advertiserProjectTypes;

  return (
    <div className={styles.project__types}>
      <ul>
        {projectTypes.map((type, index) => (
          <li
            key={index}
            className={typeFilter === type.type ? styles.active : ""}
            onClick={() => toggleType(type.type, type.status)}
          >
            {t(type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
