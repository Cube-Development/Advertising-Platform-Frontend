import {
  BLOGGER_CHANNEL_TABS_LIST,
  ENUM_CHANNEL_STATUS,
} from "@entities/channel";
import { BLOGGER_OFFER_TABS_LIST, ENUM_OFFER_STATUS } from "@entities/offer";
import {
  ADV_MANAGER_PROJECT_TABS_LIST,
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ADV_MY_PROJECT_TABS_LIST,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
  ENUM_MANAGER_PROJECT_TYPES,
  MANAGER_MY_PROJECT_TABS_LIST,
  // MANAGER_TURNKEY_PROJECT_TABS_LIST,
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
import { AddManagerNewProject, NewProject } from "@features/project";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PAGE_FILTER } from "@shared/routing";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";

interface BarFilterProps {
  page: ENUM_PAGE_FILTER;
  listLength?: boolean;
  setValue?: UseFormSetValue<any>;
  typeFilter?: ENUM_PROJECT_TYPES | string;
  statusFilter:
    | ENUM_ADV_MANAGER_PROJECT_STATUS
    | ENUM_ADV_MY_PROJECT_STATUS
    | ENUM_CHANNEL_STATUS
    | ENUM_OFFER_STATUS
    | string;
  changeStatus: (
    status:
      | ENUM_ADV_MANAGER_PROJECT_STATUS
      | ENUM_ADV_MY_PROJECT_STATUS
      | ENUM_CHANNEL_STATUS
      | ENUM_OFFER_STATUS
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
    typeFilter === ENUM_PROJECT_TYPES.MY_PROJECT &&
    role === ENUM_ROLES.ADVERTISER
      ? ADV_MY_PROJECT_TABS_LIST
      : page === ENUM_PAGE_FILTER.ORDER &&
          typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
          role === ENUM_ROLES.ADVERTISER
        ? ADV_MANAGER_PROJECT_TABS_LIST
        : page === ENUM_PAGE_FILTER.ORDER && role === ENUM_ROLES.MANAGER
          ? // ? typeFilter === ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT
            //   ? MANAGER_MY_PROJECT_TABS_LIST
            //   : MANAGER_TURNKEY_PROJECT_TABS_LIST
            MANAGER_MY_PROJECT_TABS_LIST
          : page === ENUM_PAGE_FILTER.OFFER
            ? BLOGGER_OFFER_TABS_LIST
            : BLOGGER_CHANNEL_TABS_LIST;

  return (
    <div className={styles.wrapper}>
      <BarTop
        listLength={true}
        NewProjectBtn={NewProject}
        TurnkeyProjectBtn={TurnkeyProject}
        AddChannelBtn={AddChannel}
        page={page}
        AddManagerNewProjectBtn={
          page === ENUM_PAGE_FILTER.ORDER &&
          role === ENUM_ROLES.MANAGER &&
          typeFilter === ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT
            ? AddManagerNewProject
            : undefined
        }
      />
      {page === ENUM_PAGE_FILTER.ORDER ? (
        <>
          <BarTypesFilter
            changeStatus={changeStatus}
            changeType={changeType!}
            typeFilter={typeFilter!}
            badge={badgeType}
            role={role}
          />
          {typeFilter === ENUM_PROJECT_TYPES.SAVED_PROJECT || (
            <BarStatusFilter
              changeStatus={changeStatus}
              statusFilter={statusFilter}
              projectStatus={projectStatus}
              badge={badgeStatus}
            />
          )}
        </>
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
