import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { platformTypes } from "@shared/config/postFilter";

interface BarPostFilterProps {
  platforms: number[];
}

export const BarPostFilter: FC<BarPostFilterProps> = ({ platforms }) => {
  const { t } = useTranslation();
  const { platformFilter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const toggleProfile = (type: string) => {
    dispatch(filterSlice.actions.setPlatformFilter(type));
  };

  return (
    <div className={styles.types}>
      <ul>
        {platformTypes.map((type, index) => (
          <li
            className={
              platforms.includes(type.id) && platformFilter === type.type
                ? styles.active
                : platforms.includes(type.id) && platformFilter !== type.type
                  ? styles.non__active
                  : styles.disabled
            }
            onClick={() => toggleProfile(type.type)}
            key={index}
          >
            <p>{t(type.name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
