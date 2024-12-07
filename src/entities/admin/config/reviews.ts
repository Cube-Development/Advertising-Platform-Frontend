export enum adminReviewTypesFilter {
  wait = 0,
  accept = 1,
}

export const adminReviewTypes = [
  {
    name: "admin_panel.reviews.types.wait",
    type: adminReviewTypesFilter.wait,
  },
  {
    name: "admin_panel.reviews.types.accept",
    type: adminReviewTypesFilter.accept,
  },
];

export enum adminReviewForm {
  page = "page",
  status = "status",
}
