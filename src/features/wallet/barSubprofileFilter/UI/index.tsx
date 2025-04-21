import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  PROFILE_STATUS,
  SUBPROFILE_TYPE,
  SUBPROFILE_FILTER_TABS_LIST,
} from "@entities/wallet";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

interface ISubFilterOption {
  type: SUBPROFILE_TYPE;
  id: PROFILE_STATUS;
}

interface BarSubrofileFilterProps {
  resetValues: () => void;
  resetActiveAccount?: (account: null) => void;
  subprofileFilter: {
    type: SUBPROFILE_TYPE;
    id: PROFILE_STATUS;
  };
  changeSubprofile: (subprofile: {
    type: SUBPROFILE_TYPE;
    id: PROFILE_STATUS;
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
  const screen = useWindowWidth();

  return (
    <>
      {screen > +BREAKPOINT.MD ? (
        <div className={styles.types}>
          <ul>
            {SUBPROFILE_FILTER_TABS_LIST.map((subtype, index) => (
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
      ) : (
        <div className={styles.types_xs}>
          <ul
            className={styles.type}
            style={
              {
                "--lengthFilter": `${SUBPROFILE_FILTER_TABS_LIST.length}`,
                "--translateFilter": `${SUBPROFILE_FILTER_TABS_LIST.findIndex((option) => subprofileFilter.type === option.type) * 100}%`,
              } as React.CSSProperties
            }
          >
            {SUBPROFILE_FILTER_TABS_LIST.map((subtype, index) => (
              <li
                key={index}
                className={
                  subprofileFilter.type === subtype.type ? styles.active : ""
                }
                onClick={() => toggleProfile(subtype)}
              >
                {t(subtype.name)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
