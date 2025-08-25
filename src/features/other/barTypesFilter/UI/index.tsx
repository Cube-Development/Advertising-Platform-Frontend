import { ENUM_CHANNEL_STATUS } from "@entities/channel";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import { ADVERTISER_PROJECT_TABS_LIST } from "@entities/project";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BarTypesFilterProps {
  typeFilter: string;
  changeStatus: (
    status: ENUM_CHANNEL_STATUS | ENUM_OFFER_STATUS | string,
  ) => void;
  changeType: (type: string) => void;
  badge?: { type: string; count: number }[];
}

export const BarTypesFilter: FC<BarTypesFilterProps> = ({
  typeFilter,
  changeStatus,
  changeType,
  badge,
}) => {
  const { t } = useTranslation();
  const toggleType = (type: string, status: string) => {
    changeStatus(status);
    changeType(type);
  };

  const projectTypes = ADVERTISER_PROJECT_TABS_LIST;

  return (
    <div
      className={styles.project__types}
      style={
        { "--typesLength": `${projectTypes.length}` } as React.CSSProperties
      }
    >
      <ul>
        {projectTypes.map((type, index) => (
          <li
            key={index}
            className={`${typeFilter === type.type ? styles.active : ""}`}
            onClick={() => toggleType(type.type, type.status)}
          >
            {t(type.name)}
            {!!badge &&
              !!badge?.find((el) => el?.type === type?.type)?.count && (
                <div className={styles.badge}>
                  <span>
                    {badge?.find((el) => el?.type === type?.type)?.count}
                  </span>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
