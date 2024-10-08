import { dateSortingTypes } from "@entities/platform";
import {
  advertiserProjectTypes,
  advManagerProjectStatusFilter,
  getProjectsCardReq,
  IAdvManagerProjectsDevCard,
  myProjectStatusFilter,
  projectTypesFilter,
  useGetAdvManagerProjectsQuery,
  useGetAdvProjectsQuery,
} from "@entities/project";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import i18n from "@shared/config/i18n";
import { QueryParams } from "@shared/functions";
import { pageFilter } from "@shared/routing";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdvProjectsList } from "./advProjects";
import { DevProjectsList } from "./devProjects";
import styles from "./styles.module.scss";
import { TemplateProjectsList } from "./templateProjects";

export const AdvOrders: FC = () => {
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { order_type } = QueryParams();

  const { setValue, watch } = useForm<{
    status: advManagerProjectStatusFilter | myProjectStatusFilter | string;
    type: projectTypesFilter | string;
  }>({
    defaultValues: {
      status: myProjectStatusFilter.active,
      type: projectTypesFilter.myProject,
    },
  });
  const formState = watch();

  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [formState.status]);

  // check queries for project types to show current orders
  useEffect(() => {
    if (order_type) {
      advertiserProjectTypes.map((type) => {
        if (order_type === type.type) {
          setValue("type", type.type);
          setValue("status", type.status);
        }
      });
    } else {
      setValue("type", advertiserProjectTypes[0].type);
      setValue("status", advertiserProjectTypes[0].status);
    }
  }, [order_type]);

  const getParams: getProjectsCardReq = {
    page: currentPage,
    date_sort: dateSortingTypes.decrease,
    status: formState.status,
    elements_on_page: INTERSECTION_ELEMENTS.advOrders,
  };

  const { data: projectsSelf, isFetching: isFetchingSelf } =
    useGetAdvProjectsQuery(getParams, {
      skip: formState.type !== projectTypesFilter.myProject,
    });
  const { data: projectsManager, isFetching: isFetchingManager } =
    useGetAdvManagerProjectsQuery(
      { ...getParams, language: language?.id || Languages[0].id },
      {
        skip: formState.type !== projectTypesFilter.managerProject,
      },
    );
  // const save_cards = MY_PROJECT_SAVE_CARDS;
  // const dev_cards = MY_PROJECT_MANAGER_DEV_CARDS;
  return (
    <div className="container sidebar">
      <div className={styles.wrapper}>
        <BarFilter
          page={page}
          listLength={
            // true
            !!(
              projectsSelf?.projects?.length ||
              projectsManager?.projects?.length
            )
          }
          typeFilter={formState.type}
          changeStatus={(status) => setValue("status", status)}
          changeType={(type) => setValue("type", type)}
          statusFilter={formState.status}
        />
        {formState.type === projectTypesFilter.managerProject &&
        formState.status === advManagerProjectStatusFilter.develop ? (
          <DevProjectsList
            projects={
              (projectsManager?.status === formState.status &&
                (projectsManager?.projects as IAdvManagerProjectsDevCard[])) ||
              []
            }
            handleOnChangePage={handleOnChangePage}
            isLoading={isFetchingSelf || isFetchingManager}
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
              // advMyProjectActiveCARDS.projects || []
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
