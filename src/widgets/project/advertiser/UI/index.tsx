import { channelData } from "@entities/channel";
import { dateSortingTypes } from "@entities/platform";
import {
  ADVERTISER_PROJECT_TABS_LIST,
  ADV_MANAGER_PROJECT_TABS_LIST,
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  getProjectsCardReq,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
  useGetAdvManagerProjectsQuery,
  useGetAdvProjectsQuery,
  useGetAdvSavedProjectsQuery,
  getSavedProjectsCardReq,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { useGetViewAdvertiserProjectQuery } from "@entities/views";
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
import { AdvProjectsList } from "./advProjects";
import { DevProjectsList } from "./devProjects";
import styles from "./styles.module.scss";
import { SavedProjectsList } from "./savedProjects";

interface IForm extends getProjectsCardReq {
  type: ENUM_PROJECT_TYPES | string;
}

export const AdvOrders: FC = () => {
  const page = ENUM_PAGE_FILTER.ORDER;
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { project_type, project_status, project_id } = QueryParams();

  const startType =
    project_type &&
    !!Object.values(ENUM_PROJECT_TYPES).includes(
      project_type as ENUM_PROJECT_TYPES,
    )
      ? project_type
      : ENUM_PROJECT_TYPES.MY_PROJECT;

  const startStatus =
    project_status &&
    (startType === ENUM_PROJECT_TYPES.MY_PROJECT &&
    !!Object.values(ENUM_ADV_MY_PROJECT_STATUS).includes(
      project_status as ENUM_ADV_MY_PROJECT_STATUS,
    )
      ? project_status
      : startType === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
        !!Object.values(ENUM_ADV_MANAGER_PROJECT_STATUS).includes(
          project_status as ENUM_ADV_MANAGER_PROJECT_STATUS,
        ))
      ? project_status
      : ADVERTISER_PROJECT_TABS_LIST.find((item) => item.type === startType)
          ?.status!;

  const startProjectId = isValidUUID(project_id || "") ? project_id : undefined;

  const { setValue, watch } = useForm<IForm>({
    defaultValues: {
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.ADV_PROJECTS,
      type: startType,
      status: startStatus,
      date_sort: dateSortingTypes.decrease,
      language: language?.id || USER_LANGUAGES_LIST[0].id,
      ...(startProjectId ? { search_string: startProjectId } : {}),
    },
  });

  const formState = watch();

  const handleChangeStatus = (
    status:
      | ENUM_ADV_MANAGER_PROJECT_STATUS
      | ENUM_ADV_MY_PROJECT_STATUS
      | string,
  ) => {
    setValue("status", status);
    setValue("page", 1);
  };

  const handleChangeType = (type: ENUM_PROJECT_TYPES | string) => {
    setValue("type", type);
    setValue(
      "status",
      ADVERTISER_PROJECT_TABS_LIST.find((item) => item.type === type)?.status ||
        ADVERTISER_PROJECT_TABS_LIST[0].status,
    );
    setValue("page", 1);
  };

  // check queries for project types to show current orders
  useEffect(() => {
    if (project_type) {
      ADVERTISER_PROJECT_TABS_LIST.map((type) => {
        if (project_type === type.type) {
          setValue("type", type.type);
          if (project_type !== ENUM_PROJECT_TYPES.SAVED_PROJECT) {
            setValue("status", type.status);
          }
        }
      });
      if (project_status) {
        ADV_MANAGER_PROJECT_TABS_LIST.map((status) => {
          if (project_status === status.type) {
            handleChangeStatus(status.type);
          }
        });
      }
    } else {
      setValue("type", ADVERTISER_PROJECT_TABS_LIST[0].type);
      setValue("status", ADVERTISER_PROJECT_TABS_LIST[0].status);
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

  const { search_string, ...params } = formState;

  const getParams: getProjectsCardReq = {
    ...params,
    ...(search_string && search_string.length >= 3
      ? isValidUUID(search_string)
        ? { project_id: search_string }
        : { search_string }
      : {}),
  };

  const getSavedParams: getSavedProjectsCardReq = {
    page: formState.page,
    elements_on_page: INTERSECTION_ELEMENTS.ADV_PROJECTS,
  };

  const {
    data: projectsSelf,
    isFetching: isFetchingSelf,
    refetch: refetchSelf,
    originalArgs: originalArgsSelf,
  } = useGetAdvProjectsQuery(getParams, {
    skip: formState.type !== ENUM_PROJECT_TYPES.MY_PROJECT,
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: (data?.status === formState?.status && data) || undefined,
    }),
  });

  const {
    data: projectsSaved,
    isFetching: isFetchingSave,
    refetch: refetchSaved,
    originalArgs: originalArgsSaved,
  } = useGetAdvSavedProjectsQuery(getSavedParams, {
    skip: formState.type !== ENUM_PROJECT_TYPES.SAVED_PROJECT,
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: data || undefined,
    }),
  });

  const {
    data: projectsManager,
    isFetching: isFetchingManager,
    refetch: refetchManager,
    originalArgs: originalArgsManager,
  } = useGetAdvManagerProjectsQuery(getParams, {
    skip: formState.type !== ENUM_PROJECT_TYPES.MANAGER_PROJECT,
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: (data?.status === formState?.status && data) || undefined,
    }),
  });

  const { refetch: views } = useGetViewAdvertiserProjectQuery();

  let checkData;
  // const isLoadingMore = (isFetchingSelf || isFetchingManager) && isClicked;

  switch (formState.type) {
    case ENUM_PROJECT_TYPES.MANAGER_PROJECT:
      checkData = projectsManager;
      // isLoadingMore = isFetchingManager;
      break;
    case ENUM_PROJECT_TYPES.SAVED_PROJECT:
      checkData = projectsSaved;
      // isLoadingMore = isFetchingSave;
      break;
    case ENUM_PROJECT_TYPES.MY_PROJECT:
      checkData = projectsSelf;
      // isLoadingMore = isFetchingSelf;
      break;
    default:
      checkData = undefined;
    // isLoadingMore = false;
  }

  const handleOnChangePage = () => {
    const newPage = Math.floor(
      (checkData?.projects?.length || 0) / INTERSECTION_ELEMENTS.ADV_PROJECTS,
    );
    setValue("page", newPage + 1);

    if (checkData?.projects?.length === 0) {
      if (formState.type === ENUM_PROJECT_TYPES.MY_PROJECT) {
        refetchSelf();
      } else if (formState.type === ENUM_PROJECT_TYPES.MANAGER_PROJECT) {
        refetchManager();
      } else if (formState.type === ENUM_PROJECT_TYPES.SAVED_PROJECT) {
        refetchSaved();
      }
    }
  };

  const isLoadingMore =
    (formState.type === ENUM_PROJECT_TYPES.MY_PROJECT &&
      isFetchingSelf &&
      !originalArgsSelf?.__isWebsocket) ||
    (formState.type === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
      isFetchingManager &&
      !originalArgsManager?.__isWebsocket) ||
    (formState.type === ENUM_PROJECT_TYPES.SAVED_PROJECT &&
      isFetchingSave &&
      !originalArgsSaved?.__isWebsocket);

  useEffect(() => {
    if (formState.status !== ENUM_ADV_MANAGER_PROJECT_STATUS.REQUEST_APPROVE) {
      views();
    }
  }, [formState.type, formState.page]);

  useEffect(() => {
    setTimeout(() => {
      setValue("page", 1);
    }, 500);
  }, [formState.type, formState.status, formState.search_string]);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <BarFilter
          page={page}
          typeFilter={formState.type}
          changeStatus={(status) => handleChangeStatus(status)}
          changeType={(type) => handleChangeType(type)}
          statusFilter={formState.status}
        />
        <SearchFilter
          type={channelData.search}
          onChange={setValue}
          value={formState.search_string}
        />
        {formState.type === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
        formState.status === ENUM_ADV_MANAGER_PROJECT_STATUS.DEVELOP ? (
          <DevProjectsList
            projects={projectsManager?.projects || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={projectsManager?.isLast || false}
            typeFilter={formState.type}
          />
        ) : formState.type === ENUM_PROJECT_TYPES.SAVED_PROJECT ? (
          <SavedProjectsList
            projects={projectsSaved?.projects || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={projectsSaved?.isLast || false}
            currentPage={formState?.page}
          />
        ) : formState.type === ENUM_PROJECT_TYPES.MANAGER_PROJECT ? (
          <AdvProjectsList
            statusFilter={
              formState.status as
                | ENUM_ADV_MANAGER_PROJECT_STATUS
                | ENUM_ADV_MY_PROJECT_STATUS
            }
            typeFilter={formState.type as ENUM_PROJECT_TYPES}
            projects={projectsManager?.projects || []}
            handleOnChangePage={handleOnChangePage}
            isLoading={isLoadingMore}
            isLast={projectsManager?.isLast || false}
            currentPage={formState?.page}
          />
        ) : (
          formState.type === ENUM_PROJECT_TYPES.MY_PROJECT && (
            <AdvProjectsList
              statusFilter={
                formState.status as
                  | ENUM_ADV_MANAGER_PROJECT_STATUS
                  | ENUM_ADV_MY_PROJECT_STATUS
              }
              typeFilter={formState.type as ENUM_PROJECT_TYPES}
              projects={projectsSelf?.projects || []}
              handleOnChangePage={handleOnChangePage}
              isLoading={isLoadingMore}
              isLast={projectsSelf?.isLast || false}
              currentPage={formState?.page}
            />
          )
        )}
      </div>
    </div>
  );
};
