import { myProjectStatus, managerProjectStatus, platformStatus } from "@shared/config/filter";

export const advMyProjectStatus = [
    {name: "orders_advertiser.project_status.active", type: myProjectStatus.active},
    {name: "orders_advertiser.project_status.complite", type: myProjectStatus.complite},
  ];

export const advManagerProjectStatus = [
  {name: "orders_advertiser.project_status.active", type: managerProjectStatus.active},
  {name: "orders_advertiser.project_status.develop", type: managerProjectStatus.develop},
  {name: "orders_advertiser.project_status.agreed", type: managerProjectStatus.agreed},
  {name: "orders_advertiser.project_status.complite", type: managerProjectStatus.complite},
];


  export const bloggerPlatformStatus = [
    {name: "platforms_blogger.platform_status.active", type: platformStatus.active},
    {name: "platforms_blogger.platform_status.moderation", type: platformStatus.moderation},
    {name: "platforms_blogger.platform_status.cancel", type: platformStatus.cancel},
    {name: "platforms_blogger.platform_status.deactivate", type: platformStatus.deactivate},
    {name: "platforms_blogger.platform_status.ban", type: platformStatus.ban},
  ];