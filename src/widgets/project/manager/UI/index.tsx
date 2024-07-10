import { BarFilter } from "@widgets/other";
import { FC, useEffect, useState } from "react";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { useAppSelector } from "@shared/hooks";
import { ManagerProjectsList } from "./managerProject";
import {
  IManagerNewProjectCard,
  IManagerProjectCard,
  getProjectsCardReq,
  managerProjectStatusFilter,
  useGetManagerProjectsQuery,
} from "@entities/project";
import { ManagerNewProjectsList } from "./managerNewProject";

export const ManagerOrders: FC = () => {
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

  return (
    <>
      <BarFilter page={page} listLength={!!tariffs?.length} />
      {statusFilter === managerProjectStatusFilter.new ? (
        <ManagerNewProjectsList
          projects={tariffs! as IManagerNewProjectCard[]}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetching}
          isNotEmpty={
            data?.projects?.length === INTERSECTION_ELEMENTS.managerOrders ||
            false
          }
        />
      ) : (
        <ManagerProjectsList
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
