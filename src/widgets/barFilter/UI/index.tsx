import { bloggerChannelStatus, channelStatusFilter } from "@entities/channel";
import { bloggerOfferStatus, offerStatusFilter } from "@entities/offer";
import {
  advManagerProjectStatus,
  advManagerProjectStatusFilter,
  advMyProjectStatus,
  managerProjectStatus,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import { roles } from "@entities/user";
import {
  useGetViewAdvertiserProjectQuery,
  useGetViewBloggerChannelQuery,
  useGetViewBloggerOrderQuery,
  useGetViewManagerProjectQuery,
} from "@entities/views";
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
  const { isAuth, role } = useAppSelector((state) => state.user);

  const { data: viewsAdvProjects } = useGetViewAdvertiserProjectQuery(
    undefined,
    {
      skip: !isAuth || role !== roles.advertiser,
    },
  );

  const { data: viewsBloggerOffers } = useGetViewBloggerOrderQuery(undefined, {
    skip: !isAuth || role !== roles.blogger,
  });

  const { data: viewsBloggerChannels } = useGetViewBloggerChannelQuery(
    undefined,
    {
      skip: !isAuth || role !== roles.blogger,
    },
  );

  const { data: viewsManProjects } = useGetViewManagerProjectQuery(undefined, {
    skip: !isAuth || role !== roles.manager,
  });

  const badgeStatus =
    page === pageFilter.offer
      ? viewsBloggerOffers?.values[0]?.value?.map((item) => {
          return { status: item?.status, count: item?.count };
        })
      : page === pageFilter.platform
        ? viewsBloggerChannels?.values[0]?.value?.map((item) => {
            return { status: item?.status, count: item?.count };
          })
        : page === pageFilter.order && role === roles.advertiser
          ? viewsAdvProjects?.values
              .find((project) => project?.type === typeFilter)
              ?.value?.map((item) => {
                return { status: item?.status, count: item?.count };
              })
          : page === pageFilter.order && role === roles.manager
            ? viewsManProjects?.values[0]?.value?.map((item) => {
                return { status: item?.status, count: item?.count };
              })
            : undefined;

  const badgeType =
    page === pageFilter.order
      ? viewsAdvProjects?.values?.map((item) => {
          return { type: item?.type, count: item?.count };
        })
      : undefined;

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
              badge={badgeType}
            />
            {typeFilter === projectTypesFilter.savedProject || (
              <BarStatusFilter
                changeStatus={changeStatus}
                statusFilter={statusFilter}
                projectStatus={projectStatus}
                badge={badgeStatus}
              />
            )}
          </>
        ) : (
          role === roles.manager && (
            <>
              <BarStatusFilter
                changeStatus={changeStatus}
                statusFilter={statusFilter}
                projectStatus={projectStatus}
                badge={badgeStatus}
              />
            </>
          )
        )
      ) : (
        <BarStatusFilter
          changeStatus={changeStatus}
          statusFilter={statusFilter}
          projectStatus={projectStatus}
          badge={badgeStatus}
        />
      )}
    </div>
  );
};
