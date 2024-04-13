import { pageFilter } from "@shared/config/pageFilter";
import {
  myProjectStatusFilter,
  projectTypesFilter,
} from "@shared/config/projectFilter";
import { useAppSelector } from "@shared/store";
import { AdvProject } from "@widgets/advProject";
import { BarFilter } from "@widgets/barFilter";
import { FC } from "react";
import {
  getProjectsCardReq,
  useGetAdvProjectsQuery,
} from "@shared/store/services/advProjectsService";

export const OrdersPage: FC = () => {
  const { typeFilter, statusFilter } = useAppSelector((state) => state.filter);
  const page = pageFilter.order;

  const getParams: getProjectsCardReq = {
    page: 1,
    date_sort: "increase",
    status: statusFilter,
  };

  const { data: projects } = useGetAdvProjectsQuery(getParams);

  return (
    <>
      <BarFilter page={page} listLength={true} />

      {/* {typeFilter === projectTypesFilter.myProject &&
      statusFilter === myProjectStatusFilter.active ? (
        <AdvProject projects={projects!} />
      ) : typeFilter === projectTypesFilter.myProject &&
        statusFilter === myProjectStatusFilter.complite ? (
        <AdvProject projects={projects!} />
      ) : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.active ? (
        <AdvProject projects={projects!} />
      )
       : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.develop ? (
        <AdvDevProject cards={ManagerProjectAdvCardsDev} />
      ) 
      : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.agreed ? (
        <AdvProject projects={projects!} />
      ) : typeFilter === projectTypesFilter.managerProject &&
        statusFilter === managerProjectStatusFilter.complite ? (
        // <DevProjectAdv cards={ManagerProjectAdvCardsDev} />
        <></>
      ) : typeFilter === projectTypesFilter.savedProject ? (
        <AdvDevProject cards={ManagerProjectAdvCardsDev} />
      ) : (
        <></>
      )} */}

      {typeFilter === projectTypesFilter.myProject &&
      statusFilter === myProjectStatusFilter.active ? (
        <AdvProject projects={projects!} />
      ) : (
        typeFilter === projectTypesFilter.myProject &&
        statusFilter === myProjectStatusFilter.completed && (
          <AdvProject projects={projects!} />
        )
      )}
    </>
  );
};
