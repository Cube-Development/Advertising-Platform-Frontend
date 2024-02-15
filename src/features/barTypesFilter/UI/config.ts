import { projectTypes, myProjectStatus, managerProjectStatus } from "@shared/config/filter";

export const advertiserProjectTypes = [
    {name: "orders_advertiser.project_types.my_project", type: projectTypes.myProject, status: myProjectStatus.active},
    {name: "orders_advertiser.project_types.manager_project", type: projectTypes.managerProject, status: managerProjectStatus.active},
    {name: "orders_advertiser.project_types.saved_project", type: projectTypes.savedProject, status: ''},
  ];

