import { projectTypes, myProjectStatus, managerProjectStatus } from "@shared/config/filter";

export const advertiserProjectTypes = [
    {name: "profile_advertiser.project_types.my_project", type: projectTypes.myProject, status: myProjectStatus.active},
    {name: "profile_advertiser.project_types.manager_project", type: projectTypes.managerProject, status: managerProjectStatus.active},
    {name: "profile_advertiser.project_types.saved_project", type: projectTypes.savedProject, status: ''},
  ];

export const bloggerProjectTypes = [
    {name: "profile_advertiser.project_types.my_project", type: projectTypes.myProject, status: myProjectStatus.active},
    {name: "profile_advertiser.project_types.manager_project", type: projectTypes.managerProject, status: managerProjectStatus.active},
    {name: "profile_advertiser.project_types.saved_project", type: projectTypes.savedProject, status: ''},
];