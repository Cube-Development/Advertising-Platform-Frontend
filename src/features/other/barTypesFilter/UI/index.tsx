import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { advertiserProjectTypes } from "@entities/project";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

interface BarTypesFilterProps {
  typeFilter: string;
  changeStatus: (
    status: channelStatusFilter | offerStatusFilter | string,
  ) => void;
  changeType: (type: string) => void;
}

export const BarTypesFilter: FC<BarTypesFilterProps> = ({
  typeFilter,
  changeStatus,
  changeType,
}) => {
  const { t } = useTranslation();
  const toggleType = (type: string, status: string) => {
    changeStatus(status);
    changeType(type);
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
