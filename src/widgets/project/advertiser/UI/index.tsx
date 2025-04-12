import { channelData } from "@entities/channel";
import { dateSortingTypes } from "@entities/platform";
import {
  advertiserProjectTypes,
  advManagerProjectStatus,
  advManagerProjectStatusFilter,
  getProjectsCardReq,
  IAdvManagerProjectsDevCard,
  myProjectStatusFilter,
  projectTypesFilter,
  useGetAdvManagerProjectsQuery,
  useGetAdvProjectsQuery,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { useGetViewAdvertiserProjectQuery } from "@entities/views";
import { SearchFilter } from "@features/catalog";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import { pageFilter, paths } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys, QueryParams } from "@shared/utils";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AdvProjectsList } from "./advProjects";
import { DevProjectsList } from "./devProjects";
import styles from "./styles.module.scss";
import { TemplateProjectsList } from "./templateProjects";

interface IForm extends getProjectsCardReq {
  type: projectTypesFilter | string;
}

export const AdvOrders: FC = () => {
  const page = pageFilter.order;
  const language = useFindLanguage();
  const navigate = useNavigate();
  const { project_type, project_status } = QueryParams();

  const startType =
    project_type &&
    !!Object.values(projectTypesFilter).includes(
      project_type as projectTypesFilter,
    )
      ? project_type
      : projectTypesFilter.myProject;

  const startStatus =
    project_status &&
    (startType === projectTypesFilter.myProject &&
    !!Object.values(myProjectStatusFilter).includes(
      project_status as myProjectStatusFilter,
    )
      ? project_status
      : startType === projectTypesFilter.managerProject &&
        !!Object.values(advManagerProjectStatusFilter).includes(
          project_status as advManagerProjectStatusFilter,
        ))
      ? project_status
      : advertiserProjectTypes.find((item) => item.type === startType)?.status!;

  const { setValue, watch } = useForm<IForm>({
    defaultValues: {
      type: startType,
      status: startStatus,
      page: 1,
      date_sort: dateSortingTypes.decrease,
      elements_on_page: INTERSECTION_ELEMENTS.advOrders,
      language: language?.id || Languages[0].id,
    },
  });

  const formState = watch();

  const handleOnChangePage = () => {
    setValue("page", formState.page + 1);
  };

  const handleChangeStatus = (
    status: advManagerProjectStatusFilter | myProjectStatusFilter | string,
  ) => {
    setValue("status", status);
    setValue("page", 1);
  };

  const handleChangeType = (type: projectTypesFilter | string) => {
    setValue("type", type);
    setValue(
      "status",
      advertiserProjectTypes.find((item) => item.type === type)?.status ||
        advertiserProjectTypes[0].status,
    );
    setValue("page", 1);
  };

  // check queries for project types to show current orders
  useEffect(() => {
    if (project_type) {
      advertiserProjectTypes.map((type) => {
        if (project_type === type.type) {
          setValue("type", type.type);
          setValue("status", type.status);
        }
      });
      if (project_status) {
        advManagerProjectStatus.map((status) => {
          if (project_status === status.type) {
            handleChangeStatus(status.type);
          }
        });
      }
    } else {
      setValue("type", advertiserProjectTypes[0].type);
      setValue("status", advertiserProjectTypes[0].status);
    }
  }, [project_type, project_status]);

  useEffect(() => {
    const newPath = buildPathWithQuery(paths.orders, {
      [queryParamKeys.projectType]: formState.type,
      [queryParamKeys.projectStatus]: formState.status,
    });

    navigate(newPath, { replace: true });
  }, [formState.type, formState.status]);

  const { type, search_string, ...params } = formState;
  const getParams: getProjectsCardReq = {
    ...params,
    ...(search_string && search_string.length >= 3 ? { search_string } : {}),
  };

  const { data: projectsSelf, isFetching: isFetchingSelf } =
    useGetAdvProjectsQuery(getParams, {
      skip: formState.type !== projectTypesFilter.myProject,
    });
  const { data: projectsManager, isFetching: isFetchingManager } =
    useGetAdvManagerProjectsQuery(getParams, {
      skip: formState.type !== projectTypesFilter.managerProject,
    });

  const { refetch: views } = useGetViewAdvertiserProjectQuery();

  useEffect(() => {
    if (formState.status !== advManagerProjectStatusFilter.request_approve) {
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
          listLength={
            !!(
              projectsSelf?.projects?.length ||
              projectsManager?.projects?.length
            )
          }
          typeFilter={formState.type}
          changeStatus={(status) => handleChangeStatus(status)}
          changeType={(type) => handleChangeType(type)}
          statusFilter={formState.status}
        />
        <SearchFilter type={channelData.search} onChange={setValue} />
        {formState.type === projectTypesFilter.managerProject &&
        formState.status === advManagerProjectStatusFilter.develop ? (
          <DevProjectsList
            projects={
              (projectsManager?.status === formState.status &&
                (projectsManager?.projects as IAdvManagerProjectsDevCard[])) ||
              []
            }
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetchingManager}
            isLast={projectsManager?.isLast || false}
            typeFilter={formState.type}
          />
        ) : formState.type === projectTypesFilter.savedProject ? (
          <TemplateProjectsList
            projects={[]}
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetchingSelf}
            isLast={projectsSelf?.isLast || false}
            typeFilter={formState.type}
          />
        ) : formState.type === projectTypesFilter.managerProject ? (
          <AdvProjectsList
            statusFilter={
              formState.status as
                | advManagerProjectStatusFilter
                | myProjectStatusFilter
            }
            typeFilter={formState.type as projectTypesFilter}
            projects={
              (projectsManager?.status === formState.status &&
                projectsManager?.projects) ||
              []
            }
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetchingManager}
            isLast={projectsManager?.isLast || false}
          />
        ) : (
          formState.type === projectTypesFilter.myProject && (
            <AdvProjectsList
              statusFilter={
                formState.status as
                  | advManagerProjectStatusFilter
                  | myProjectStatusFilter
              }
              typeFilter={formState.type as projectTypesFilter}
              projects={
                (projectsSelf?.status === formState.status &&
                  projectsSelf?.projects) ||
                []
              }
              handleOnChangePage={handleOnChangePage}
              isLoading={isFetchingSelf}
              isLast={projectsSelf?.isLast || false}
            />
          )
        )}
      </div>
    </div>
  );
};
