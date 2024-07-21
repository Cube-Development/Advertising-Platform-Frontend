import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { ManagerProjectsList } from "./managerProject";
import {
  IManagerNewProjectCard,
  IManagerProjectCard,
  getProjectsCardReq,
  managerProjectStatusFilter,
  useGetManagerProjectsQuery,
} from "@entities/project";
import { ManagerNewProjectsList } from "./managerNewProject";
import { useForm } from "react-hook-form";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

export const ManagerOrders: FC = () => {
  // const { statusFilter } = useAppSelector((state) => state.filter);
  const { setValue, watch } = useForm<{
    status: channelStatusFilter | offerStatusFilter | string;
    type: string;
  }>({
    defaultValues: {
      status: channelStatusFilter.active,
    },
  });
  const formState = watch();

  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getProjectsCardReq = {
    language: 1,
    page: currentPage,
    status: formState.status,
    elements_on_page: INTERSECTION_ELEMENTS.managerOrders,
  };

  const { data, isFetching } = useGetManagerProjectsQuery(getParams);
  const [tariffs, setTariffs] = useState<
    IManagerNewProjectCard[] | IManagerProjectCard[]
  >(data ? data.projects : []);

  useEffect(() => {
    if (data && currentPage !== 1) {
      if (formState.status === managerProjectStatusFilter.new) {
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
  }, [formState.status]);

  return (
    <>
      <BarFilter
        page={page}
        listLength={!!tariffs?.length}
        changeStatus={(status) => setValue("status", status)}
        statusFilter={formState.status}
      />
      {formState.status === managerProjectStatusFilter.new ? (
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
          statusFilter={formState.status}
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
