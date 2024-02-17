import { myProjectStatusFilter, managerProjectStatusFilter, platformStatusFilter, offerStatusFilter } from "@shared/config/filter";

export const advMyProjectStatus = [
    {name: "orders_advertiser.status_filter.active", type: myProjectStatusFilter.active},
    {name: "orders_advertiser.status_filter.complite", type: myProjectStatusFilter.complite},
  ];

export const advManagerProjectStatus = [
  {name: "orders_advertiser.status_filter.active", type: managerProjectStatusFilter.active},
  {name: "orders_advertiser.status_filter.develop", type: managerProjectStatusFilter.develop},
  {name: "orders_advertiser.status_filter.agreed", type: managerProjectStatusFilter.agreed},
  {name: "orders_advertiser.status_filter.complite", type: managerProjectStatusFilter.complite},
];


export const bloggerPlatformStatus = [
  {name: "platforms_blogger.status_filter.active", type: platformStatusFilter.active},
  {name: "platforms_blogger.status_filter.moderation", type: platformStatusFilter.moderation},
  {name: "platforms_blogger.status_filter.reject", type: platformStatusFilter.reject},
  {name: "platforms_blogger.status_filter.deactivate", type: platformStatusFilter.deactivate},
  {name: "platforms_blogger.status_filter.ban", type: platformStatusFilter.ban},
];


export const bloggerOfferStatus = [
  {name: "offers_blogger.status_filter.active", type: offerStatusFilter.active},
  {name: "offers_blogger.status_filter.waiting", type: offerStatusFilter.waiting},
  {name: "offers_blogger.status_filter.complite", type: offerStatusFilter.complite},
  {name: "offers_blogger.status_filter.reject", type: offerStatusFilter.reject},
  {name: "offers_blogger.status_filter.moderation", type: offerStatusFilter.moderation},
  {name: "offers_blogger.status_filter.uncomplite", type: offerStatusFilter.uncomplite},
];