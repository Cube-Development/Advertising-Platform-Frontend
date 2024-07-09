import { pageFilter } from "@shared/config/pageFilter";
import { managerProjectStatusFilter } from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import {
  getProjectsCardReq,
  useGetAdvProjectsQuery,
} from "@shared/store/services/advOrdersService";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { ManagerNewProject } from "./managerNewProject";
import { ManagerProject } from "./managerProject";
import {
  managerActiveCARDS,
  managerAgreedCARDS,
  managerCompletedCARDS,
  managerNewCARDS,
} from "@shared/config/mockDATA";
import {
  IManagerNewProjectCard,
  IManagerNewProjects,
  IManagerProjectCard,
  IManagerProjects,
} from "@shared/types/managerProject";
import { useGetManagerProjectsQuery } from "@shared/store/services/managerOrdersService";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";

export const ManagerOrdersBlock: FC = () => {
  const { statusFilter } = useAppSelector((state) => state.filter);
  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getProjectsCardReq = {
    language: 1,
    page: currentPage,
    status: statusFilter,
    elements_on_page: INTERSECTION_ELEMENTS.managerOrders,
  };

  const { data, isFetching } = useGetManagerProjectsQuery(getParams);
  const [tariffs, setTariffs] = useState<
    IManagerNewProjectCard[] | IManagerProjectCard[]
  >(data ? data.projects : []);

  useEffect(() => {
    console.log(data, currentPage, statusFilter);
    if (data && currentPage !== 1) {
      if (statusFilter === managerProjectStatusFilter.new) {
        setTariffs([
          ...(tariffs as IManagerNewProjectCard[]),
          ...(data.projects as IManagerNewProjectCard[]),
        ]);
      } else {
        setTariffs([
          ...(tariffs as IManagerProjectCard[]),
          ...(data.projects as IManagerProjectCard[]),
        ]);
      }
    } else {
      data && setTariffs(data.projects);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // // после раз Мока удалить часть кода между комментраиями
  // const projects =
  //   statusFilter === managerProjectStatusFilter.active
  //     ? managerActiveCARDS
  //     : statusFilter === managerProjectStatusFilter.completed
  //       ? managerCompletedCARDS
  //       : statusFilter === managerProjectStatusFilter.agreed
  //         ? managerAgreedCARDS
  //         : managerNewCARDS;
  // //  *****************
  return (
    <>
      <BarFilter page={page} listLength={!!tariffs?.length} />
      {statusFilter === managerProjectStatusFilter.new ? (
        <ManagerNewProject
          projects={tariffs! as IManagerNewProjectCard[]}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data?.projects?.length === INTERSECTION_ELEMENTS.managerOrders ||
            false
          }
        />
      ) : (
        <ManagerProject
          projects={tariffs! as IManagerProjectCard[]}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data?.projects?.length === INTERSECTION_ELEMENTS.managerOrders ||
            false
          }
        />
      )}
    </>
  );
};
