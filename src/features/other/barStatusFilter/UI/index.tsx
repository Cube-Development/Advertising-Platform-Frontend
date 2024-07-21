import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  advManagerProjectStatus,
  advMyProjectStatus,
  managerProjectStatus,
  projectTypesFilter,
} from "@entities/project";
import { roles } from "@entities/user";
import { bloggerOfferStatus, offerStatusFilter } from "@entities/offer";
import { bloggerChannelStatus, channelStatusFilter } from "@entities/channel";
import { pageFilter } from "@shared/routing";
import { useAppSelector } from "@shared/hooks";

interface BarStatusFilterProps {
  page: pageFilter;
  changeStatus: (
    status: channelStatusFilter | offerStatusFilter | string,
  ) => void;
  typeFilter?: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const BarStatusFilter: FC<BarStatusFilterProps> = ({
  page,
  changeStatus,
  typeFilter,
  statusFilter,
}) => {
  const { t } = useTranslation();
  const { role } = useAppSelector((state) => state.user);
  const toggleStatus = (status: string) => {
    changeStatus(status);
  };

  const projectStatus =
    page === pageFilter.order &&
    typeFilter === projectTypesFilter.myProject &&
    role === roles.advertiser
      ? advMyProjectStatus
      : page === pageFilter.order &&
          typeFilter === projectTypesFilter.managerProject &&
          role === roles.advertiser
        ? advManagerProjectStatus
        : page === pageFilter.order && role === roles.manager
          ? managerProjectStatus
          : page === pageFilter.offer
            ? bloggerOfferStatus
            : bloggerChannelStatus;

  return (
    <div className={styles.subtypes}>
      <ul>
        {projectStatus.map((type, index) => (
          <li
            key={index}
            className={statusFilter === type.type ? styles.active : ""}
            onClick={() => toggleStatus(type.type)}
          >
            {t(type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
