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
import { FC, useEffect, useState } from "react";
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
import { IAdvProjectCard } from "@shared/types/advProject";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";

export const AdvOrdersBlock: FC = () => {
  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);
  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getProjectsCardReq = {
    page: currentPage,
    date_sort: "increase",
    status: statusFilter,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
  };

  const { data, isFetching } = useGetAdvProjectsQuery(getParams);
  // data: projectsMan fetch2
  // data: projectsManDev fetch3

  const [projects, setProjects] = useState<IAdvProjectCard[]>(
    data?.projects ? data?.projects : [],
  );

  useEffect(() => {
    if (data && currentPage !== 1) {
      setProjects([...projects, ...data.projects]);
    } else {
      data && setProjects(data.projects);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

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
      <BarFilter page={page} listLength={!!projects?.length} />

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
        <AdvDevProject
          projects={projects!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={data ? data?.projects?.length > 0 : false}
        />
      ) : (
        <AdvProject
          projects={projects!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={data ? data?.projects?.length > 0 : false}
        />
      )}
    </>
  );
};
