import { dateSortingTypes } from "@entities/platform";
import {
  IManagerNewProjectCard,
  IManagerProjectCard,
  getProjectsCardReq,
  managerProjectStatusFilter,
  useGetManagerProjectsQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { useGetViewManagerProjectQuery } from "@entities/views";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ManagerNewProjectsList } from "./managerNewProject";
import { ManagerProjectsList } from "./managerProject";
import styles from "./styles.module.scss";

export const ManagerOrders: FC = () => {
  const language = useFindLanguage();
  const page = pageFilter.order;

  const { setValue, watch } = useForm<getProjectsCardReq>({
    defaultValues: {
      page: 1,
      language: language?.id || Languages[0].id,
      status: managerProjectStatusFilter.active,
      elements_on_page: INTERSECTION_ELEMENTS.managerOrders,
      date_sort: dateSortingTypes.decrease,
    },
  });

  const formState = watch();
  const { data, isFetching } = useGetManagerProjectsQuery(formState);
  const { refetch: views } = useGetViewManagerProjectQuery();

  useEffect(() => {
    if (formState.status === managerProjectStatusFilter.completed) {
      views();
    }
  }, [formState.status, formState.page]);

  const handleChangeStatus = (status: managerProjectStatusFilter | string) => {
    setValue("status", status);
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", formState.page + 1);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <BarFilter
          page={page}
          listLength={!!data?.projects?.length}
          changeStatus={(status) => handleChangeStatus(status)}
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
