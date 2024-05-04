import { pageFilter } from "@shared/config/pageFilter";
import {
  advManagerProjectStatusFilter,
  managerProjectStatus,
  managerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import {
  getProjectsCardReq,
  useGetAdvProjectsQuery,
} from "@shared/store/services/advOrdersService";
import { BarFilter } from "@widgets/barFilter";
import { FC } from "react";
import { AdvProject } from "./advProject";
import {
  advManagerProjectActiveCARDS,
  advManagerProjectAgreedCARDS,
  advManagerProjectCompleteCARDS,
  advManagerProjectOnDevelopCARDS,
  advMyProjectActiveCARDS,
  advMyProjectCompleteCARDS,
} from "@shared/config/mockDATA";
import { AdvDevProject } from "./advDevProject";
import { IAdvProjects } from "@shared/types/advProject";

export const AdvOrdersBlock: FC = () => {
  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);
  const page = pageFilter.order;

  const getParams: getProjectsCardReq = {
    page: 1,
    date_sort: "increase",
    status: statusFilter,
  };

  const { data: projects } = useGetAdvProjectsQuery(getParams);
  // data: projectsMan fetch2
  // data: projectsManDev fetch3

  // const projects =
  //   typeFilter === projectTypesFilter.myProject &&
  //   statusFilter === myProjectStatusFilter.active
  //     ? advMyProjectActiveCARDS
  //     : typeFilter === projectTypesFilter.myProject &&
  //         statusFilter === myProjectStatusFilter.completed
  //       ? advMyProjectCompleteCARDS
  //       : typeFilter === projectTypesFilter.managerProject &&
  //           statusFilter === advManagerProjectStatusFilter.active
  //         ? advManagerProjectActiveCARDS
  //         : typeFilter === projectTypesFilter.managerProject &&
  //             statusFilter === advManagerProjectStatusFilter.agreed
  //           ? advManagerProjectAgreedCARDS
  //           : typeFilter === projectTypesFilter.managerProject &&
  //               statusFilter === advManagerProjectStatusFilter.completed
  //             ? advManagerProjectCompleteCARDS
  //             : typeFilter === projectTypesFilter.managerProject &&
  //                 statusFilter === advManagerProjectStatusFilter.develop
  //               ? advManagerProjectOnDevelopCARDS
  //               : advManagerProjectCompleteCARDS;

  return (
    <>
      <BarFilter page={page} listLength={!!projects?.projects.length} />

      {/* {typeFilter === projectTypesFilter.myProject &&
      statusFilter === myProjectStatusFilter.active ? (
        <AdvProject projects={projects!} />
      ) : typeFilter === projectTypesFilter.myProject &&
        statusFilter === myProjectStatusFilter.complite ? (
        <AdvProject projects={projects!} />
      ) : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.active ? (
        <AdvProject projects={projects!} />
      )
       : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.develop ? (
        <AdvDevProject cards={ManagerProjectAdvCardsDev} />
      ) 
      : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.agreed ? (
        <AdvProject projects={projects!} />
      ) : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.complite ? (
        // <DevProjectAdv cards={ManagerProjectAdvCardsDev} />
        <></>
      ) : typeFilter === projectTypesFilter.savedProject ? (
        <AdvDevProject cards={ManagerProjectAdvCardsDev} />
      ) : (
        <></>
      )} */}

      {typeFilter === projectTypesFilter.managerProject &&
      statusFilter === advManagerProjectStatusFilter.develop ? (
        <AdvDevProject projects={projects!} />
      ) : (
        <AdvProject projects={projects! as IAdvProjects} />
      )}
    </>
  );
};
