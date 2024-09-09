import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  profileTypesNum,
  subprofileFilterTypes,
  subprofileTypes,
} from "@entities/wallet";

interface ISubFilterOption {
  type: subprofileFilterTypes;
  id: profileTypesNum;
}

interface BarSubrofileFilterProps {
  resetValues: () => void;
  resetActiveAccount?: (account: null) => void;
  subprofileFilter: {
    type: subprofileFilterTypes;
    id: profileTypesNum;
  };
  changeSubprofile: (subprofile: {
    type: subprofileFilterTypes;
    id: profileTypesNum;
  }) => void;
}

export const BarSubrofileFilter: FC<BarSubrofileFilterProps> = ({
  resetValues,
  resetActiveAccount,
  subprofileFilter,
  changeSubprofile,
}) => {
  const { t } = useTranslation();
  const toggleProfile = (option: ISubFilterOption) => {
    const newSubprofile = { type: option.type, id: option.id };
    resetValues();
    changeSubprofile(newSubprofile);
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
            <div
              className={`${styles.circle_wrapper} ${subprofileFilter.type === subtype.type ? styles.active : ""}`}
            >
              <div className={styles.outer}>
                <div className={styles.inner} />
              </div>
            </div>
            <p
              className={`${subprofileFilter.type === subtype.type ? styles.active__type : ""}`}
            >
              {t(subtype.name)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
