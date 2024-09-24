export enum projectTypesFilter {
  myProject = "myProject",
  managerProject = "managerProject",
  savedProject = "savedProject",
}

export enum myProjectStatusFilter {
  active = "active",
  completed = "completed",
}

export enum advManagerProjectStatusFilter {
  active = "active",
  develop = "new",
  request_approve = "request_approve",
  completed = "completed",
}

export enum managerProjectStatusFilter {
  active = "active",
  request_approve = "request_approve",
  new = "new",
  completed = "completed",
}

export const advMyProjectStatus = [
  {
    name: "orders_advertiser.status_filter.active",
    type: myProjectStatusFilter.active,
  },
  {
    name: "orders_advertiser.status_filter.complite",
    type: myProjectStatusFilter.completed,
  },
];

export const advManagerProjectStatus = [
  {
    name: "orders_advertiser.status_filter.active",
    type: advManagerProjectStatusFilter.active,
  },
  {
    name: "orders_advertiser.status_filter.develop",
    type: advManagerProjectStatusFilter.develop,
  },
  {
    name: "orders_advertiser.status_filter.agreed",
    type: advManagerProjectStatusFilter.request_approve,
  },
  {
    name: "orders_advertiser.status_filter.complite",
    type: advManagerProjectStatusFilter.completed,
  },
];

export const managerProjectStatus = [
  {
    name: "orders_manager.status_filter.active",
    type: managerProjectStatusFilter.active,
  },
  {
    name: "orders_manager.status_filter.new",
    type: managerProjectStatusFilter.new,
  },
  {
    name: "orders_manager.status_filter.agreed",
    type: managerProjectStatusFilter.request_approve,
  },
  {
    name: "orders_manager.status_filter.complite",
    type: managerProjectStatusFilter.completed,
  },
];

export const advertiserProjectTypes = [
  {
    name: "orders_advertiser.type_filter.my_project",
    type: projectTypesFilter.myProject,
    status: myProjectStatusFilter.active,
  },
  {
    name: "orders_advertiser.type_filter.manager_project",
    type: projectTypesFilter.managerProject,
    status: advManagerProjectStatusFilter.active,
  },
  {
    name: "orders_advertiser.type_filter.saved_project",
    type: projectTypesFilter.savedProject,
    status: "",
  },
];
