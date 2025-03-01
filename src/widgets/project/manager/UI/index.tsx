import {
  IManagerNewProjectCard,
  IManagerProjectCard,
  getProjectsCardReq,
  managerProjectStatusFilter,
  useGetManagerProjectsQuery,
} from "@entities/project";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ManagerNewProjectsList } from "./managerNewProject";
import { ManagerProjectsList } from "./managerProject";
import styles from "./styles.module.scss";
import { useGetViewManagerProjectQuery } from "@entities/views";
import { useFindLanguage } from "@entities/user";

export const ManagerOrders: FC = () => {
  const language = useFindLanguage();
  const { setValue, watch } = useForm<{
    status: managerProjectStatusFilter | string;
  }>({
    defaultValues: {
      status: managerProjectStatusFilter.active,
    },
  });
  const formState = watch();

  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getParams: getProjectsCardReq = {
    language: language?.id || Languages[0].id,
    page: currentPage,
    status: formState.status,
    elements_on_page: INTERSECTION_ELEMENTS.managerOrders,
  };

  const { data, isFetching } = useGetManagerProjectsQuery(getParams);
  const { refetch: views } = useGetViewManagerProjectQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [formState.status]);

  useEffect(() => {
    if (formState.status === managerProjectStatusFilter.completed) {
      views();
    }
  }, [formState.status, currentPage]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <BarFilter
          page={page}
          listLength={!!data?.projects?.length}
          changeStatus={(status) => setValue("status", status)}
          statusFilter={formState.status}
        />
        {formState.status === managerProjectStatusFilter.new ? (
          <ManagerNewProjectsList
            projects={
              ((data?.status === formState.status &&
                data?.projects) as IManagerNewProjectCard[]) || []
            }
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isLast={data?.isLast || false}
          />
        ) : (
          <ManagerProjectsList
            statusFilter={formState.status as managerProjectStatusFilter}
            projects={
              ((data?.status === formState.status &&
                data?.projects) as IManagerProjectCard[]) || []
            }
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetching}
            isLast={data?.isLast || false}
          />
        )}
      </div>
    </div>
  );
};
