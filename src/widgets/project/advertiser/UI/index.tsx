import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { AdvProjectsList } from "./advProjects";
import { DevProjectsList } from "./devProjects";
import { QueryParams } from "@shared/functions";
import {
  IAdvProjectCard,
  advManagerProjectStatusFilter,
  advertiserProjectTypes,
  getProjectsCardReq,
  projectTypesFilter,
  useGetAdvManagerProjectsQuery,
  useGetAdvProjectsQuery,
} from "@entities/project";
import { INTERSECTION_ELEMENTS, Languages } from "@shared/config";
import i18n from "@shared/config/i18n";
import { pageFilter } from "@shared/routing";
import { useForm } from "react-hook-form";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

export const AdvOrders: FC = () => {
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { order_type } = QueryParams();

  const { setValue, watch } = useForm<{
    status: channelStatusFilter | offerStatusFilter | string;
    type: string;
  }>({
    defaultValues: {
      status: channelStatusFilter.active,
      type: projectTypesFilter.myProject,
    },
  });
  const formState = watch();

  const page = pageFilter.order;
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnChangePage = () => {
    setCurrentPage(currentPage + 1);
  };

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
    date_sort: "increase",
    status: formState.status,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
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
      }
    );
  // data: projectsMan fetch2
  // data: projectsManDev fetch3

  const [projects, setProjects] = useState<IAdvProjectCard[]>(
    projectsSelf?.projects || projectsManager?.projects || []
  );

  useEffect(() => {
    if (projectsSelf && currentPage !== 1) {
      setProjects([...projects, ...projectsSelf.projects]);
    } else {
      projectsSelf && setProjects(projectsSelf.projects);
    }
  }, [projectsSelf]);

  useEffect(() => {
    if (projectsManager && currentPage !== 1) {
      setProjects([...projects, ...projectsManager.projects]);
    } else {
      projectsManager && setProjects(projectsManager.projects);
    }
  }, [projectsManager]);

  useEffect(() => {
    setCurrentPage(1);
  }, [formState.status]);

  return (
    <>
      <BarFilter
        page={page}
        listLength={!!projects?.length}
        typeFilter={formState.type}
        changeStatus={(status) => setValue("status", status)}
        changeType={(type) => setValue("type", type)}
        statusFilter={formState.status}
      />
      {formState.type === projectTypesFilter.managerProject &&
      formState.status === advManagerProjectStatusFilter.develop ? (
        <DevProjectsList
          projects={projects!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetchingSelf || isFetchingManager}
          isNotEmpty={
            projectsSelf?.projects?.length === INTERSECTION_ELEMENTS.orders ||
            projectsManager?.projects?.length ===
              INTERSECTION_ELEMENTS.orders ||
            false
          }
          typeFilter={formState.type}
        />
      ) : (
        <AdvProjectsList
          statusFilter={formState.status}
          typeFilter={formState.type}
          projects={projects!}
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetchingSelf || isFetchingManager}
          isNotEmpty={
            projectsSelf?.projects?.length === INTERSECTION_ELEMENTS.orders ||
            projectsManager?.projects?.length ===
              INTERSECTION_ELEMENTS.orders ||
            false
          }
        />
      )}
    </>
  );
};
