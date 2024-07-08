import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import i18n from "@shared/config/i18n";
import { Languages } from "@shared/config/languages";
import { pageFilter } from "@shared/config/pageFilter";
import {
  advManagerProjectStatusFilter,
  advertiserProjectTypes,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { filterSlice } from "@shared/store/reducers";
import {
  getProjectsCardReq,
  useGetAdvManagerProjectsQuery,
  useGetAdvProjectsQuery,
} from "@shared/store/services/advOrdersService";
import { IAdvProjectCard } from "@shared/types/advProject";
import { BarFilter } from "@widgets/barFilter";
import { FC, useEffect, useState } from "react";
import { AdvProjectsList } from "./advProjects";
import { DevProjectsList } from "./devProjects";
import { QueryParams } from "@shared/functions";

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
          dispatch(filterSlice.actions.setTypeFilter(type.type));
          dispatch(filterSlice.actions.setStatusFilter(type.status));
        }
      });
    } else {
      dispatch(
        filterSlice.actions.setTypeFilter(advertiserProjectTypes[0].type),
      );
      dispatch(
        filterSlice.actions.setStatusFilter(advertiserProjectTypes[0].status),
      );
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
