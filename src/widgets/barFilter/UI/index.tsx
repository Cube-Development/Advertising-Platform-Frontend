import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import { roles } from "@entities/user";
import { AddChannel } from "@features/channel";
import {
  BarStatusFilter,
  BarTop,
  BarTypesFilter,
  TurnkeyProject,
} from "@features/other";
import { NewProject } from "@features/project";
import { useAppSelector } from "@shared/hooks";
import { pageFilter } from "@shared/routing";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";

interface BarFilterProps {
  page: pageFilter;
  listLength: boolean;
  setValue?: UseFormSetValue<any>;
  typeFilter?: projectTypesFilter | string;
  statusFilter:
    | advManagerProjectStatusFilter
    | myProjectStatusFilter
    | channelStatusFilter
    | offerStatusFilter
    | string;
  changeStatus: (
    status:
      | advManagerProjectStatusFilter
      | myProjectStatusFilter
      | channelStatusFilter
      | offerStatusFilter
      | string,
  ) => void;
  changeType?: (status: string) => void;
}

export const BarFilter: FC<BarFilterProps> = ({
  page,
  setValue,
  listLength,
  typeFilter,
  statusFilter,
  changeStatus,
  changeType,
}) => {
  const { role } = useAppSelector((state) => state.user);

  return (
    <div className={styles.wrapper}>
      <BarTop
        listLength={true}
        NewProjectBtn={NewProject}
        TurnkeyProjectBtn={TurnkeyProject}
        AddChannelBtn={AddChannel}
        page={page}
      />
      {page === pageFilter.order ? (
        role === roles.advertiser ? (
          <>
            <BarTypesFilter
              changeStatus={changeStatus}
              changeType={changeType!}
              typeFilter={typeFilter!}
            />
            {typeFilter === projectTypesFilter.savedProject || (
              <BarStatusFilter
                page={page}
                typeFilter={typeFilter}
                changeStatus={changeStatus}
                statusFilter={statusFilter}
              />
            )}
          </>
        ) : (
          role === roles.manager && (
            <>
              <BarStatusFilter
                page={page}
                typeFilter={typeFilter}
                changeStatus={changeStatus}
                statusFilter={statusFilter}
              />
            </>
          )
        )
      ) : (
        <BarStatusFilter
          page={page}
          typeFilter={typeFilter}
          changeStatus={changeStatus}
          statusFilter={statusFilter}
        />
      )}
    </div>
  );
};
