import { projectTypesFilter, myProjectStatusFilter, managerProjectStatusFilter } from "@shared/config/filter";

export const advertiserProjectTypes = [
    {name: "orders_advertiser.type_filter.my_project", type: projectTypesFilter.myProject, status: myProjectStatusFilter.active},
    {name: "orders_advertiser.type_filter.manager_project", type: projectTypesFilter.managerProject, status: managerProjectStatusFilter.active},
    {name: "orders_advertiser.type_filter.saved_project", type: projectTypesFilter.savedProject, status: ''},
  ];

