import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { subprofileTypes } from "@shared/config/profileFilter";

interface BarSubrofileFilterProps {
  resetValues: () => void;
}

export const BarSubrofileFilter: FC<BarSubrofileFilterProps> = ({
  resetValues,
}) => {
  const { t } = useTranslation();
  const { subprofileFilter } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();
  const toggleProfile = (type: string) => {
    resetValues();
    dispatch(filterSlice.actions.setSubprofileFilter(type));
  };

  return (
    <div className={styles.types}>
      <ul>
        {subprofileTypes.map((subtype, index) => (
          <li
            className={styles.subtypes}
            onClick={() => toggleProfile(subtype.type)}
            key={index}
          >
            <div className={styles.outer}>
              <div
                className={`${styles.inner} ${subprofileFilter === subtype.type ? styles.active : ""}`}
              ></div>
            </div>
            <p>{t(subtype.name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
