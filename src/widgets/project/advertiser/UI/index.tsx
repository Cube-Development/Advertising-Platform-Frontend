import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import {
  advManagerProjectStatusFilter,
  advertiserProjectTypes,
  getProjectsCardReq,
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
    console.log(currentPage);
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
    date_sort: "increase",
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
  // console.log("projectsSelf", projectsSelf);
  return (
    <div className="container sidebar">
      <BarFilter
        page={page}
        listLength={
          !!(
            projectsSelf?.projects?.length || projectsManager?.projects?.length
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
          // projects={projectsSelf?.projects || projectsManager?.projects || []}
          projects={
            (projectsSelf?.status === formState.status &&
              projectsSelf?.projects) ||
            (projectsManager?.status === formState.status &&
              projectsManager?.projects) ||
            []
          }
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetchingSelf || isFetchingManager}
          isLast={projectsSelf?.isLast || projectsManager?.isLast || false}
          typeFilter={formState.type}
        />
      ) : (
        <AdvProjectsList
          statusFilter={formState.status}
          typeFilter={formState.type}
          // projects={projectsSelf?.projects || projectsManager?.projects || []}
          projects={
            (projectsSelf?.status === formState.status &&
              projectsSelf?.projects) ||
            (projectsManager?.status === formState.status &&
              projectsManager?.projects) ||
            []
          }
          handleOnChangePage={handleOnChangePage}
          isLoading={isFetchingSelf || isFetchingManager}
          isLast={projectsSelf?.isLast || projectsManager?.isLast || false}
        />
      )}
    </div>
  );
};
