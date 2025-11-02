import { channelData } from "@entities/channel";
import { dateSortingTypes } from "@entities/platform";
import {
  getProjectsCardReq,
  ENUM_MANAGER_PROJECT_STATUS,
  useGetManagerProjectsQuery,
  ENUM_MANAGER_PROJECT_TYPES,
  MANAGER_PROJECT_TYPES_TABS_LIST,
  MANAGER_MY_PROJECT_TABS_LIST,
  useGetAgencyProjectsQuery,
  IGetAgencyProjectsReq,
  // MANAGER_TURNKEY_PROJECT_TABS_LIST,
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
import { MyManagerProjectsList } from "./managerMyProject";

interface IForm extends getProjectsCardReq {
  type: ENUM_MANAGER_PROJECT_TYPES | string;
}

export const ManagerOrders: FC = () => {
  const language = useFindLanguage();
  const navigate = useNavigate();
  const page = ENUM_PAGE_FILTER.ORDER;
  const { project_status, project_id, project_type } = QueryParams();

  const startType =
    project_type &&
    !!Object.values(ENUM_MANAGER_PROJECT_TYPES).includes(
      project_type as ENUM_MANAGER_PROJECT_TYPES,
    )
      ? project_type
      : ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT;

  const startStatus =
    project_status &&
    !!Object.values(ENUM_MANAGER_PROJECT_STATUS).includes(
      project_status as ENUM_MANAGER_PROJECT_STATUS,
    )
      ? project_status
      : ENUM_MANAGER_PROJECT_STATUS.ACTIVE;

  const startProjectId = isValidUUID(project_id || "") ? project_id : undefined;

  const { setValue, watch } = useForm<IForm>({
    defaultValues: {
      page: 1,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      status: startStatus,
      elements_on_page: INTERSECTION_ELEMENTS.MANAGER_PROJECTS,
      date_sort: dateSortingTypes.decrease,
      ...(startProjectId ? { search_string: startProjectId } : {}),
      type: startType,
    },
  });

  const formState = watch();

  const { search_string, ...params } = formState;

  // const getParams: getProjectsCardReq = {
  //   ...params,
  //   ...(search_string && search_string.length >= 3
  //     ? isValidUUID(search_string)
  //       ? { project_id: search_string }
  //       : { search_string }
  //     : {}),
  // };

  // const { data, isFetching, refetch, originalArgs } =
  //   useGetManagerProjectsQuery(getParams, {
  //     selectFromResult: ({ data, ...rest }) => ({
  //       ...rest,
  //       data: (data?.status === formState?.status && data) || undefined,
  //     }),
  //   });

  const getParams: IGetAgencyProjectsReq = {
    page: formState.page,
    status: formState.status as Exclude<
      ENUM_MANAGER_PROJECT_STATUS,
      ENUM_MANAGER_PROJECT_STATUS.NEW
    >,
    elements_on_page: INTERSECTION_ELEMENTS.MANAGER_PROJECTS,
  };

  const { data, isFetching, refetch, originalArgs } = useGetAgencyProjectsQuery(
    getParams,
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        data: (data?.status === formState?.status && data) || undefined,
      }),
    },
  );
  const { refetch: views } = useGetViewManagerProjectQuery();

  useEffect(() => {
    if (formState.status === ENUM_MANAGER_PROJECT_STATUS.COMPLETED) {
      views();
    }
  }, [formState.status, formState.page]);

  const handleChangeStatus = (status: ENUM_MANAGER_PROJECT_STATUS | string) => {
    setValue("status", status);
    setValue("page", 1);
  };

  const handleChangeType = (type: ENUM_MANAGER_PROJECT_TYPES | string) => {
    setValue("type", type);
    setValue(
      "status",
      MANAGER_PROJECT_TYPES_TABS_LIST.find((item) => item.type === type)
        ?.status || MANAGER_PROJECT_TYPES_TABS_LIST[0].status,
    );
    setValue("page", 1);
  };

  const handleOnChangePage = () => {
    setValue("page", formState.page + 1);
  };

  // check queries for project types to show current orders
  useEffect(() => {
    if (project_type) {
      MANAGER_PROJECT_TYPES_TABS_LIST.map((type) => {
        if (project_type === type.type) {
          setValue("type", type.type);
          setValue("status", type.status);
        }
      });
      if (project_status) {
        MANAGER_MY_PROJECT_TABS_LIST.map((status) => {
          if (project_status === status.type) {
            handleChangeStatus(status.type);
          }
        });
        // MANAGER_TURNKEY_PROJECT_TABS_LIST.map((status) => {
        //   if (project_status === status.type) {
        //     handleChangeStatus(status.type);
        //   }
        // });
      }
    } else {
      setValue("type", MANAGER_PROJECT_TYPES_TABS_LIST[0].type);
      setValue("status", MANAGER_PROJECT_TYPES_TABS_LIST[0].status);
    }
  }, [project_type, project_status]);

  useEffect(() => {
    setValue("search_string", "");
    const newPath = buildPathWithQuery(ENUM_PATHS.ORDERS, {
      [queryParamKeys.projectType]: formState.type,
      [queryParamKeys.projectStatus]: formState.status,
      ...(startProjectId ? { [queryParamKeys.projectId]: startProjectId } : {}),
    });

    navigate(newPath, { replace: true });
  }, [formState.type, formState.status]);

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
          changeType={(type) => handleChangeType(type)}
          statusFilter={formState.status}
          typeFilter={formState.type}
        />
        {formState.type === ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT && (
          <MyManagerProjectsList
            statusFilter={formState.status as ENUM_MANAGER_PROJECT_STATUS}
            projects={data?.projects || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={data?.isLast || false}
            currentPage={formState.page}
          />
        )}
        {/* <SearchFilter
          type={channelData.search}
          onChange={setValue}
          value={formState.search_string}
        /> */}
        {/* {formState.type === ENUM_MANAGER_PROJECT_TYPES.TURNKEY_PROJECT &&
        formState.status === ENUM_MANAGER_PROJECT_STATUS.NEW ? (
          <ManagerNewProjectsList
            projects={data?.projects}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={!!data?.isLast}
            currentPage={formState.page}
          />
        ) : formState.type === ENUM_MANAGER_PROJECT_TYPES.MY_PROJECT ? (
          <MyManagerProjectsList
            statusFilter={formState.status as ENUM_MANAGER_PROJECT_STATUS}
            projects={data?.projects}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={data?.isLast || false}
            currentPage={formState.page}
          />
        ) : (
          <ManagerProjectsList
            statusFilter={formState.status as ENUM_MANAGER_PROJECT_STATUS}
            projects={data?.projects}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={data?.isLast || false}
            currentPage={formState.page}
          />
        )} */}
      </div>
    </div>
  );
};
