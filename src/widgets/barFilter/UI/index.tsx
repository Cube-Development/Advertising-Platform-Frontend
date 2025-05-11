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
import { ENUM_ROLES } from "@entities/user";
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
import { ENUM_PAGE_FILTER } from "@shared/routing";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";

interface BarFilterProps {
  page: ENUM_PAGE_FILTER;
  listLength?: boolean;
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
      skip: !isAuth || role !== ENUM_ROLES.ADVERTISER,
    },
  );

  const { data: viewsBloggerOffers } = useGetViewBloggerOrderQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
  });

  const { data: viewsBloggerChannels } = useGetViewBloggerChannelQuery(
    undefined,
    {
      skip: !isAuth || role !== ENUM_ROLES.BLOGGER,
    },
  );

  const { data: viewsManProjects } = useGetViewManagerProjectQuery(undefined, {
    skip: !isAuth || role !== ENUM_ROLES.MANAGER,
  });

  const badgeStatus =
    page === ENUM_PAGE_FILTER.OFFER
      ? viewsBloggerOffers?.values[0]?.value?.map((item) => {
          return { status: item?.status, count: item?.count };
        })
      : page === ENUM_PAGE_FILTER.PLATFORM
        ? viewsBloggerChannels?.values[0]?.value?.map((item) => {
            return { status: item?.status, count: item?.count };
          })
        : page === ENUM_PAGE_FILTER.ORDER && role === ENUM_ROLES.ADVERTISER
          ? viewsAdvProjects?.values
              .find((project) => project?.type === typeFilter)
              ?.value?.map((item) => {
                return { status: item?.status, count: item?.count };
              })
          : page === ENUM_PAGE_FILTER.ORDER && role === ENUM_ROLES.MANAGER
            ? viewsManProjects?.values[0]?.value?.map((item) => {
                return { status: item?.status, count: item?.count };
              })
            : undefined;

  const badgeType =
    page === ENUM_PAGE_FILTER.ORDER
      ? viewsAdvProjects?.values?.map((item) => {
          return { type: item?.type, count: item?.count };
        })
      : undefined;

  const projectStatus =
    page === ENUM_PAGE_FILTER.ORDER &&
    typeFilter === projectTypesFilter.myProject &&
    role === ENUM_ROLES.ADVERTISER
      ? advMyProjectStatus
      : page === ENUM_PAGE_FILTER.ORDER &&
          typeFilter === projectTypesFilter.managerProject &&
          role === ENUM_ROLES.ADVERTISER
        ? advManagerProjectStatus
        : page === ENUM_PAGE_FILTER.ORDER && role === ENUM_ROLES.MANAGER
          ? managerProjectStatus
          : page === ENUM_PAGE_FILTER.OFFER
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
      {page === ENUM_PAGE_FILTER.ORDER ? (
        role === ENUM_ROLES.ADVERTISER ? (
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
          role === ENUM_ROLES.MANAGER && (
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
