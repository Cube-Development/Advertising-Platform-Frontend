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
import { bloggerOfferStatus } from "@entities/offer";
import { bloggerChannelStatus } from "@entities/channel";
import { pageFilter } from "@shared/routing";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { setStatusFilter } from "@shared/store";

interface BarStatusFilterProps {
  page: pageFilter;
}

export const BarStatusFilter: FC<BarStatusFilterProps> = ({ page }) => {
  const { t } = useTranslation();
  const { statusFilter, typeFilter } = useAppSelector((state) => state.filter);
  const { role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const toggleStatus = (type: string) => {
    dispatch(setStatusFilter(type));
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
