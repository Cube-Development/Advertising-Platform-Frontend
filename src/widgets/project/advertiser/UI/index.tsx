import { BarFilter } from "@widgets/other";
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
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { setStatusFilter, setTypeFilter } from "@shared/store";

export const AdvOrders: FC = () => {
  const language = Languages.find((lang) => {
    return i18n.language === lang.name;
  });

  const { order_type } = QueryParams();
  const dispatch = useAppDispatch();

  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);
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
          dispatch(setTypeFilter(type.type));
          dispatch(setStatusFilter(type.status));
        }
      });
    } else {
      dispatch(setTypeFilter(advertiserProjectTypes[0].type));
      dispatch(setStatusFilter(advertiserProjectTypes[0].status));
    }
  }, [order_type]);

  const getParams: getProjectsCardReq = {
    page: currentPage,
    date_sort: "increase",
    status: statusFilter,
    elements_on_page: INTERSECTION_ELEMENTS.orders,
  };
  console.log("statusFilter", statusFilter);
  const { data: projectsSelf, isFetching: isFetchingSelf } =
    useGetAdvProjectsQuery(getParams, {
      skip: typeFilter !== projectTypesFilter.myProject,
    });
  const { data: projectsManager, isFetching: isFetchingManager } =
    useGetAdvManagerProjectsQuery(
      { ...getParams, language: language?.id },
      {
        skip: typeFilter !== projectTypesFilter.managerProject,
      },
    );
  // data: projectsMan fetch2
  // data: projectsManDev fetch3

  const [projects, setProjects] = useState<IAdvProjectCard[]>(
    projectsSelf?.projects || projectsManager?.projects || [],
  );
  console.log("projectsManager", projectsManager, projects);

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
  }, [statusFilter]);

  return (
    <>
      <BarFilter page={page} listLength={!!projects?.length} />

      {typeFilter === projectTypesFilter.managerProject &&
      statusFilter === advManagerProjectStatusFilter.develop ? (
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
        />
      ) : (
        <AdvProjectsList
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
