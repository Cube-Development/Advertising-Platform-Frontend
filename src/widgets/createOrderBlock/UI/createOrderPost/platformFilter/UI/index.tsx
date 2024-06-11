import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import { platformTypes } from "@shared/config/postFilter";
import { IPlatformLink } from "@shared/types/platform";

interface PlatformFilterProps {
  platforms: number[];
}

export const PlatformFilter: FC<PlatformFilterProps> = ({ platforms }) => {
  const { t } = useTranslation();
  const { platformFilter: filter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const toggleProfile = (type: IPlatformLink) => {
    dispatch(filterSlice.actions.setPlatformFilter(type));
  };

  return (
    <div className={styles.types}>
      <p>{t("create_order.create.choose_platform")}</p>
      <ul>
        {platformTypes.map((type, index) => (
          <li
            className={
              platforms.includes(type.id) && filter === type
                ? styles.active
                : platforms.includes(type.id) && filter !== type
                  ? styles.non__active
                  : styles.disabled
            }
            onClick={() => toggleProfile(type)}
            key={index}
          >
            <p>{t(type.name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
