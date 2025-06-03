import { channelData } from "@entities/channel";
import { dateSortingTypes } from "@entities/platform";
import {
  getProjectsCardReq,
  managerProjectStatusFilter,
  useGetManagerProjectsQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { useGetViewManagerProjectQuery } from "@entities/views";
import { SearchFilter } from "@features/catalog";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { USER_LANGUAGES_LIST } from "@shared/languages";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import { ManagerNewProjectsList } from "./managerNewProject";
import { ManagerProjectsList } from "./managerProject";
import styles from "./styles.module.scss";

export const ManagerOrders: FC = () => {
  const language = useFindLanguage();
  const navigate = useNavigate();
  const page = ENUM_PAGE_FILTER.ORDER;
  const { project_status, project_id } = QueryParams();

  const startStatus =
    project_status &&
    !!Object.values(managerProjectStatusFilter).includes(
      project_status as managerProjectStatusFilter,
    )
      ? project_status
      : managerProjectStatusFilter.active;

  const startProjectId = isValidUUID(project_id || "") ? project_id : undefined;

  const { setValue, watch } = useForm<getProjectsCardReq>({
    defaultValues: {
      page: 1,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      status: startStatus,
      elements_on_page: INTERSECTION_ELEMENTS.MANAGER_ORDERS,
      date_sort: dateSortingTypes.decrease,
      ...(startProjectId ? { search_string: startProjectId } : {}),
    },
  });

  const formState = watch();

  const { search_string, ...params } = formState;

  const getParams: getProjectsCardReq = {
    ...params,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { project_id: search_string }
        : { search_string }
      : {}),
  };

  const { data, isFetching, refetch, originalArgs } =
    useGetManagerProjectsQuery(getParams, {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: (data?.status === formState?.status && data) || undefined,
      }),
    });

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

  useEffect(() => {
    setValue("search_string", "");
    const newPath = buildPathWithQuery(ENUM_PATHS.ORDERS, {
      [queryParamKeys.projectStatus]: formState.status,
      ...(startProjectId ? { [queryParamKeys.projectId]: startProjectId } : {}),
    });

    navigate(newPath, { replace: true });
  }, [formState.status]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.status, formState.search_string]);

  useEffect(() => {
    if (data && data?.projects?.length === 0 && !data?.isLast) {
      refetch();
    }
  }, [data?.projects?.length]);

  const isLoadingMore = isFetching && !originalArgs?.__isWebsocket;

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <BarFilter
          page={page}
          listLength={!!data?.projects?.length}
          changeStatus={(status) => handleChangeStatus(status)}
          statusFilter={formState.status}
        />
        <SearchFilter
          type={channelData.search}
          onChange={setValue}
          value={formState.search_string}
        />
        {formState.status === managerProjectStatusFilter.new ? (
          <ManagerNewProjectsList
            projects={data?.projects}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={!!data?.isLast}
            currentPage={formState.page}
          />
        ) : (
          <ManagerProjectsList
            statusFilter={formState.status as managerProjectStatusFilter}
            projects={data?.projects}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={data?.isLast || false}
            currentPage={formState.page}
          />
        )}
      </div>
    </div>
  );
};
