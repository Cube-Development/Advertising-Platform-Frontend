import { ENUM_MANAGER_PROJECT_STATUS } from "@entities/project";

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
  status: ENUM_MANAGER_PROJECT_STATUS;
  count: number;
}
