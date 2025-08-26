export enum ENUM_PROJECT_TYPES {
  MY_PROJECT = "my_project",
  MANAGER_PROJECT = "manager_project",
  SAVED_PROJECT = "saved_project",
}

export enum ENUM_ADV_MY_PROJECT_STATUS {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export enum ENUM_ADV_MANAGER_PROJECT_STATUS {
  ACTIVE = "active",
  DEVELOP = "new",
  REQUEST_APPROVE = "request_approve",
  COMPLETED = "completed",
}

export enum ENUM_MANAGER_PROJECT_STATUS {
  ACTIVE = "active",
  REQUEST_APPROVE = "request_approve",
  NEW = "new",
  COMPLETED = "completed",
}

export const ADV_MY_PROJECT_TABS_LIST = [
  {
    name: "orders_advertiser.status_filter.active",
    type: ENUM_ADV_MY_PROJECT_STATUS.ACTIVE,
  },
  {
    name: "orders_advertiser.status_filter.complete",
    type: ENUM_ADV_MY_PROJECT_STATUS.COMPLETED,
  },
];

export const ADV_MANAGER_PROJECT_TABS_LIST = [
  {
    name: "orders_advertiser.status_filter.active",
    type: ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE,
  },
  {
    name: "orders_advertiser.status_filter.develop",
    type: ENUM_ADV_MANAGER_PROJECT_STATUS.DEVELOP,
  },
  {
    name: "orders_advertiser.status_filter.agreed",
    type: ENUM_ADV_MANAGER_PROJECT_STATUS.REQUEST_APPROVE,
  },
  {
    name: "orders_advertiser.status_filter.complete",
    type: ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED,
  },
];

export const MANAGER_PROJECT_TABS_LIST = [
  {
    name: "orders_manager.status_filter.active",
    type: ENUM_MANAGER_PROJECT_STATUS.ACTIVE,
  },
  {
    name: "orders_manager.status_filter.new",
    type: ENUM_MANAGER_PROJECT_STATUS.NEW,
  },
  {
    name: "orders_manager.status_filter.agreed",
    type: ENUM_MANAGER_PROJECT_STATUS.REQUEST_APPROVE,
  },
  {
    name: "orders_manager.status_filter.complete",
    type: ENUM_MANAGER_PROJECT_STATUS.COMPLETED,
  },
];

export const ADVERTISER_PROJECT_TABS_LIST = [
  {
    name: "orders_advertiser.type_filter.my_project",
    type: ENUM_PROJECT_TYPES.MY_PROJECT,
    status: ENUM_ADV_MY_PROJECT_STATUS.ACTIVE,
  },
  {
    name: "orders_advertiser.type_filter.manager_project",
    type: ENUM_PROJECT_TYPES.MANAGER_PROJECT,
    status: ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE,
  },
  {
    name: "orders_advertiser.type_filter.saved_project",
    type: ENUM_PROJECT_TYPES.SAVED_PROJECT,
    status: "",
  },
];
