import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
} from "@entities/project";

export interface IViewAdvertiserProject {
  count: number;
  values: IProjectType[];
}

interface IProjectType {
  type: ENUM_PROJECT_TYPES;
  count: number;
  value: IOrderStatus[];
}

interface IOrderStatus {
  status: ENUM_ADV_MY_PROJECT_STATUS | ENUM_ADV_MANAGER_PROJECT_STATUS;
  count: number;
}
