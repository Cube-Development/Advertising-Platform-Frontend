import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { advertiserProjectTypes } from "@entities/project";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { setStatusFilter, setTypeFilter } from "@shared/store";

export const BarTypesFilter: FC = () => {
  const { t } = useTranslation();
  const { typeFilter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const toggleType = (type: string, status: string) => {
    dispatch(setTypeFilter(type));
    dispatch(setStatusFilter(status));
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
