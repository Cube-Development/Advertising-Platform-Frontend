import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { profileTypes } from "@shared/config/profileFilter";

export const BarProfileFilter: FC = () => {
  const { t } = useTranslation();
  const { profileFilter } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();
  const toggleProfile = (type: string) => {
    dispatch(filterSlice.actions.setProfileFilter(type));
  };

  return (
    <div className={styles.types}>
      <ul>
        {profileTypes.map((type, index) => (
          <li
            key={index}
            className={profileFilter === type.type ? styles.active : ""}
            onClick={() => toggleProfile(type.type)}
          >
            {t(type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
