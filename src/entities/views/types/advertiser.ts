import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";

export interface IViewAdvertiserProject {
  count: number;
  values: IProjectType[];
}

interface IProjectType {
  type: projectTypesFilter;
  count: number;
  value: IOrderStatus[];
}

interface IOrderStatus {
  status: myProjectStatusFilter | advManagerProjectStatusFilter;
  count: number;
}
