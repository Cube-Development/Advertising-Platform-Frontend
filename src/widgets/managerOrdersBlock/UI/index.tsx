import { pageFilter } from "@shared/config/pageFilter";
import { managerProjectStatusFilter } from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import {
  getProjectsCardReq,
  useGetAdvProjectsQuery,
} from "@shared/store/services/advOrdersService";
import { BarFilter } from "@widgets/barFilter";
import { FC } from "react";
import { ManagerNewProject } from "./managerNewProject";
import { ManagerProject } from "./managerProject";
import {
  managerActiveCARDS,
  managerAgreedCARDS,
  managerCompletedCARDS,
  managerNewCARDS,
} from "@shared/config/mockDATA";
import {
  IManagerNewProjects,
  IManagerProjects,
} from "@shared/types/managerProjects";

export const ManagerOrdersBlock: FC = () => {
  const { statusFilter } = useAppSelector((state) => state.filter);
  const page = pageFilter.order;

  // const getParams: getProjectsCardReq = {
  //   page: 1,
  //   date_sort: "increase",
  //   status: statusFilter,
  // };
  // const { data: projects } = useGetAdvProjectsQuery(getParams);

  // после раз Мока удалить часть кода между комментраиями
  const projects =
    statusFilter === managerProjectStatusFilter.active
      ? managerActiveCARDS
      : statusFilter === managerProjectStatusFilter.completed
        ? managerCompletedCARDS
        : statusFilter === managerProjectStatusFilter.agreed
          ? managerAgreedCARDS
          : managerNewCARDS;
  //  *****************

  return (
    <>
      <BarFilter page={page} listLength={!!projects?.projects.length} />
      {statusFilter === managerProjectStatusFilter.new ? (
        <ManagerNewProject projects={projects! as IManagerNewProjects} />
      ) : (
        <ManagerProject projects={projects! as IManagerProjects} />
      )}
    </>
  );
};
