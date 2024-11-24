import { managerProjectStatusFilter } from "@entities/project";

export interface IViewManagerProject {
  count: number;
  values: IProjectType[];
}

interface IProjectType {
  type: string;
  count: number;
  value: IOrderStatus[];
}

interface IOrderStatus {
  status: managerProjectStatusFilter;
  count: number;
}
