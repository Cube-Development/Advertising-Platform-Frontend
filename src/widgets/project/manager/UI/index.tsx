import { BarFilter } from "@widgets/other";
import { FC, useEffect, useState } from "react";
import { ManagerNewProjectsList } from "./managerNewProject";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import {
  IManagerNewProjectCard,
  getManagerProjectsCardReq,
  useGetManagerProjectsQuery,
} from "@entities/project";
import { pageFilter } from "@shared/routing";
import { useAppSelector } from "@shared/hooks";

export const ManagerOrders: FC = () => {
  const { statusFilter } = useAppSelector((state) => state.filter);
  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getManagerProjectsCardReq = {
    language: 1,
    page: currentPage,
    // date_sort: "increase",
    status: statusFilter,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
  };

  const { data, isFetching } = useGetManagerProjectsQuery(getParams);
  const [tariffs, setTariffs] = useState<IManagerNewProjectCard[]>(
    data?.tariffs ? (data?.tariffs as IManagerNewProjectCard[]) : [],
  );

  useEffect(() => {
    console.log(data);
    if (data && currentPage !== 1) {
      setTariffs([...tariffs, ...(data.tariffs as IManagerNewProjectCard[])]);
    } else {
      data && setTariffs(data.tariffs as IManagerNewProjectCard[]);
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
      {/* {statusFilter === managerProjectStatusFilter.new ? ( */}
      <ManagerNewProjectsList projects={tariffs! as IManagerNewProjectCard[]} />
      {/* ) : ( */}
      {/* <ManagerProject projects={tariffs! as IManagerProjectCard[]} /> */}
      {/* )} */}
    </>
  );
};
