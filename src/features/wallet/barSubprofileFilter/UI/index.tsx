import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  profileTypesNum,
  subprofileFilter,
  subprofileTypes,
} from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { setSubprofileFilter } from "@shared/store";

interface ISubFilterOption {
  type: subprofileFilter;
  id: profileTypesNum;
}

interface BarSubrofileFilterProps {
  resetValues: () => void;
  resetActiveAccount?: (account: null) => void;
}

export const BarSubrofileFilter: FC<BarSubrofileFilterProps> = ({
  resetValues,
  resetActiveAccount,
}) => {
  const { t } = useTranslation();
  const { subprofileFilter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const toggleProfile = (option: ISubFilterOption) => {
    const newFilter = { type: option.type, id: option.id };
    resetValues();
    dispatch(setSubprofileFilter(newFilter));
    resetActiveAccount && resetActiveAccount(null);
  };

  return (
    <div className={styles.types}>
      <ul>
        {subprofileTypes.map((subtype, index) => (
          <li
            className={styles.subtypes}
            onClick={() => toggleProfile(subtype)}
            key={index}
          >
            <div className={styles.circle_wrapper}>
              <div className={styles.outer}>
                <div
                  className={`${styles.inner} ${subprofileFilter.type === subtype.type ? styles.active : ""}`}
                ></div>
              </div>
            </div>
            <p>{t(subtype.name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
