export enum projectTypesFilter {
  myProject = "myProject",
  managerProject = "managerProject",
  savedProject = "savedProject",
}

export enum myProjectStatusFilter {
  active = "active",
  completed = "completed",
}

export enum managerProjectStatusFilter {
  active = "active",
  completed = "completed",
  develop = "develop",
  agreed = "agreed",
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
    type: managerProjectStatusFilter.active,
  },
  {
    name: "orders_advertiser.status_filter.develop",
    type: managerProjectStatusFilter.develop,
  },
  {
    name: "orders_advertiser.status_filter.agreed",
    type: managerProjectStatusFilter.agreed,
  },
  {
    name: "orders_advertiser.status_filter.complite",
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
    status: managerProjectStatusFilter.active,
  },
  {
    name: "orders_advertiser.type_filter.saved_project",
    type: projectTypesFilter.savedProject,
    status: "",
  },
];
